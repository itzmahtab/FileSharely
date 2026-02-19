import { SignIn } from "@clerk/nextjs";
import { currentUser } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";
import Image from "next/image";
import { UserPlus, Upload, Share2 } from "lucide-react";

const getUser = async (id: string): Promise<{ onboarded: boolean } | null> => {
    // Mock getUser action - consistent with app/page.tsx
    return null;
};

export default async function SignInPage() {
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

    return (
        <div className="min-h-screen bg-white flex items-center justify-center p-6 md:p-12">
            <div className="max-w-6xl w-full grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-8 items-center">

                {/* Left Side - Slogan and Steps (Smaller) */}
                <div className="lg:col-span-4 flex flex-col space-y-12">
                    <div className="space-y-4">
                        <h1 className="text-4xl md:text-5xl font-extrabold text-slate-900 tracking-tight">
                            File Sharing Made Simple
                        </h1>
                        <p className="text-lg text-slate-600 max-w-sm">
                            Upload and share your files with public links that work everywhere.
                        </p>
                    </div>

                    <div className="flex flex-wrap items-center gap-6">
                        <div className="flex items-center gap-2 group">
                            <div className="p-2 bg-blue-50 rounded-lg transition-colors group-hover:bg-blue-100">
                                <UserPlus className="w-5 h-5 text-blue-600" />
                            </div>
                            <span className="font-semibold text-slate-700 text-sm">Sign Up</span>
                        </div>

                        <div className="flex items-center gap-2 group">
                            <div className="p-2 bg-blue-50 rounded-lg transition-colors group-hover:bg-blue-100">
                                <Upload className="w-5 h-5 text-blue-600" />
                            </div>
                            <span className="font-semibold text-slate-700 text-sm">Upload</span>
                        </div>

                        <div className="flex items-center gap-2 group">
                            <div className="p-2 bg-blue-50 rounded-lg transition-colors group-hover:bg-blue-100">
                                <Share2 className="w-5 h-5 text-blue-600" />
                            </div>
                            <span className="font-semibold text-slate-700 text-sm">Share</span>
                        </div>
                    </div>
                </div>

                {/* Right Side - Logo and SignIn (Larger) */}
                <div className="lg:col-span-8 flex flex-col items-center space-y-12">
                    <div className="relative w-32 h-32 md:w-48 md:h-48">
                        <Image
                            src="/assets/logo.svg"
                            alt="FileSharely Logo"
                            fill
                            className="object-contain"
                            priority
                        />
                    </div>

                    <div className="w-full flex justify-center">
                        <SignIn />
                    </div>
                </div>

            </div>
        </div>
    );
}
