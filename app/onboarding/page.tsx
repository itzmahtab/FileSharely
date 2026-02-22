import { currentUser } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";
import { getUser } from "@/app/server/actions/user.actions";
import OnboardingForm from "@/app/onboarding/components/OnboardingForm";

export default async function OnboardingPage() {
    const clerkUser = await currentUser();

    if (!clerkUser) {
        redirect("/sign-up");
    }

    const dbUser = await getUser(clerkUser.id);

    if (!dbUser) {
        redirect("/sign-up");
    }

    if (dbUser.onboarded) {
        redirect("/main");
    }

    return <OnboardingForm user={dbUser} />;
}
