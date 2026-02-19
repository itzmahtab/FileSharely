import { currentUser } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";
import LandingPage from "@/app/components/LandingPage";

const getUser = async (id: string): Promise<{ onboarded: boolean } | null> => {
  // Mock getUser action - update this later when real DB is ready
  return null;
};

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
