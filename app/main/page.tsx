import { currentUser } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";
import { getUser } from "@/app/server/actions/user.actions";
import UploadFileModal from "@/app/main/components/UploadFileModal";

export default async function MainPage() {
  const clerkUser = await currentUser();

  if (!clerkUser) {
    redirect("/sign-in");
  }

  const dbUser = await getUser(clerkUser.id);

  if (!dbUser) {
    redirect("/sign-in");
  }

  if (!dbUser.onboarded) {
    redirect("/onboarding");
  }

  return <UploadFileModal className="animate-fade-in" />;
}
