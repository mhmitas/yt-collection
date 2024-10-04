import NextAuth from "next-auth"
import Google from "next-auth/providers/google"
import { User } from "./lib/database/models/user.model";
import { connectDB } from "./lib/database/mongoose";

export const { handlers, signIn, signOut, auth } = NextAuth({
    providers: [
        Google
    ],
    callbacks: {
        async signIn({ user, account, profile }) {
            await connectDB()
            try {
                // handle google sign in process
                if (account.provider === "google") {
                    const existedUser = await User.findOne({ email: user.email });
                    console.log({ existedUser: !!existedUser });
                    // check if the user already exists, and is verified
                    if (existedUser && existedUser?.verified) {
                        // if user exists and not from google provider, don't allow sign in;
                        if (existedUser.provider !== "google") {
                            throw new Error("Email is already registered with a different provider")
                        }

                        const existedUserObj = await existedUser.toObject();

                        // update the user object with the database credentials
                        user._id = existedUserObj?._id;
                        user.image = existedUserObj?.avatar;
                        user.name = existedUserObj?.name;
                        user.verified = existedUserObj?.verified;

                        return user;
                    } else {
                        // If the user is not found in the database, create a new one
                        const newUser = await User.create({
                            email: user?.email,
                            name: user?.name,
                            avatar: profile?.picture,
                            provider: account?.provider,
                            verified: true,
                        })

                        // if the user created successfully, then update the user with with the new user
                        if (!newUser) {
                            throw new Error("Google sign in failed");
                        }
                        console.log("new user created");

                        const newUserObj = await newUser.toObject();

                        user._id = newUserObj._id;
                        user.avatar = newUserObj.avatar;
                        user.name = newUserObj.name;
                        user.provider = newUserObj.provider;
                        user.verified = newUserObj.verified;
                        // return the user after assigning necessary fields
                        return user;
                    }
                }
            } catch (error) {
                throw new Error(error?.message || "Failed to sign in");
            }
        },
        jwt({ user, token }) {
            if (user) {
                token.id = user?._id;
                token.name = user?.name;
                token.image = user?.image;
                token.verified = user?.verified;
            }
            return token
        },
        session({ token, session }) {
            if (session) {
                session.user.id = token?.id;
                session.user.verified = token?.verified;
            }
            return session
        }
    },
})