import { currentUser } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";
import LandingPage from "@/app/components/LandingPage";
import { getUser } from "@/app/server/actions/user.actions";

export default async function Home() {
  const clerkUser = await currentUser();

  if (clerkUser) {
    const dbUser = await getUser(clerkUser.id);

    if (dbUser) {
      if (dbUser.onboarded) {
        redirect("/main");
      } else {
        redirect("/onboarding");
      }
    }
  }

  return <LandingPage />;
}
