import Image from "next/image";
import Link from "next/link";
import { UserButton } from "@clerk/nextjs";
import { Upload, FolderOpen } from "lucide-react";

export default function Navbar() {
    return (
        <nav className="sticky top-0 z-50 w-full border-b border-slate-200 bg-white shadow-sm">
            <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                <div className="flex h-16 items-center justify-between">

                    {/* Left — Logo */}
                    <Link href="/main" className="flex items-center transition-transform duration-200 hover:scale-125">
                        <Image
                            src="/assets/logo.svg"
                            alt="FileSharely logo"
                            width={36}
                            height={36}
                            priority
                        />
                    </Link>

                    {/* Center — Navigation links */}
                    <div className="flex items-center gap-1">
                        <Link
                            href="/main"
                            className="flex items-center gap-1.5 rounded-xl px-4 py-2 text-2xl font-medium text-slate-600 transition-all duration-200 hover:scale-125 hover:text-blue-600 hover:bg-blue-50"
                        >
                            <Upload className="h-6 w-6" />
                            Add File
                        </Link>

                        <Link
                            href="/main/files"
                            className="flex items-center gap-1.5 rounded-xl px-4 py-2 text-2xl font-medium text-slate-600 transition-all duration-200 hover:scale-125 hover:text-blue-600 hover:bg-blue-50"
                        >
                            <FolderOpen className="h-6 w-6" />
                            My Files
                        </Link>
                    </div>

                    {/* Right — User button */}
                    <div className="transition-transform duration-200 hover:scale-125">
                        <UserButton afterSignOutUrl="/" />
                    </div>

                </div>
            </div>
        </nav>
    );
}
