import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger, } from "@/components/ui/dropdown-menu"
import { LogOut } from "lucide-react"
import { signIn, signOut } from "next-auth/react"


const ProfileIcon = ({ session }) => {
    return (
        <> {session ?
            (
                <UserDropdown user={session?.user} />
            ) : (
                <Button onClick={() => signIn("google", { redirectTo: "/" })} size="sm">Sign In</Button>
            )
        }
        </>
    )
}

export default ProfileIcon


function UserDropdown({ user }) {

    const userName = user?.name || "User"
    const userEmail = user?.email || "user@example.com"

    return (
        <DropdownMenu>
            <DropdownMenuTrigger asChild>
                <Button variant="ghost" className="relative h-8 w-8 rounded-full">
                    <Avatar title={userEmail}>
                        <AvatarImage src={user?.image || "https://github.com/shadcn.png"} />
                        <AvatarFallback className="bg-gradient-to-t dark:from-rose-900 dark:to-blue-900 from-rose-100 to-blue-100">{user?.name?.slice(0, 2)}</AvatarFallback>
                    </Avatar>
                </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="min-w-56 bg-background/80 backdrop-blur-md border drop-shadow-lg" align="end" forceMount>
                <DropdownMenuLabel className="font-normal">
                    <div className="flex flex-col space-y-1">
                        <p className="text-sm font-medium leading-none">{userName}</p>
                        <p className="text-xs leading-none text-muted-foreground">
                            {userEmail}
                        </p>
                    </div>
                </DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuItem onClick={() => signOut()}>
                    <LogOut className="mr-2 h-4 w-4" />
                    <span>Sign out</span>
                </DropdownMenuItem>
            </DropdownMenuContent>
        </DropdownMenu>
    )
}