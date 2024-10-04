import { auth } from "@/auth";
import Collection from "@/components/Collection";
import { getVideosByUser } from "@/lib/actions/video.action";

export default async function Home() {

  const session = await auth();
  let videos = null

  if (session) {
    const { data } = await getVideosByUser({ userId: session?.user?.id });
    videos = data
  }

  return (
    <main className="bg-muted dark:bg-background">
      <Collection session={session} videos={videos} />
    </main>
  );
}
