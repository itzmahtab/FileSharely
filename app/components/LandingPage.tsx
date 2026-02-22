"use client";

import Image from "next/image";
import Link from "next/link";
import { UserPlus, Upload, Share2 } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function LandingPage({ className }: { className?: string }) {
    return (
        <div className={`min-h-screen bg-white flex items-center justify-center p-6 md:p-12 ${className}`}>
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
                            <div className="p-2 bg-blue-50 rounded-lg group-hover:bg-blue-100 transition-colors">
                                <UserPlus className="w-5 h-5 text-blue-600" />
                            </div>
                            <span className="font-semibold text-slate-700 text-sm">Sign Up</span>
                        </div>

                        <div className="flex items-center gap-2 group">
                            <div className="p-2 bg-blue-50 rounded-lg group-hover:bg-blue-100 transition-colors">
                                <Upload className="w-5 h-5 text-blue-600" />
                            </div>
                            <span className="font-semibold text-slate-700 text-sm">Upload</span>
                        </div>

                        <div className="flex items-center gap-2 group">
                            <div className="p-2 bg-blue-50 rounded-lg group-hover:bg-blue-100 transition-colors">
                                <Share2 className="w-5 h-5 text-blue-600" />
                            </div>
                            <span className="font-semibold text-slate-700 text-sm">Share</span>
                        </div>
                    </div>
                </div>

                {/* Right Side - Logo and Buttons (Larger) */}
                <div className="lg:col-span-8 flex flex-col items-center space-y-12">
                    <div className="relative w-64 h-64 md:w-80 md:h-80 lg:w-96 lg:h-96">
                        <Image
                            src="/assets/logo.svg"
                            alt="FileSharely Logo"
                            fill
                            className="object-contain transition-transform hover:scale-105 duration-300"
                            priority
                        />
                    </div>

                    <div className="w-full max-w-md flex flex-col space-y-4">
                        <Button
                            asChild
                            size="lg"
                            className="w-full py-7 text-xl bg-blue-600 hover:bg-blue-700 shadow-xl shadow-blue-200 transition-all font-bold rounded-2xl"
                        >
                            <Link href="/sign-in">Sign In</Link>
                        </Button>

                        <Button
                            asChild
                            variant="outline"
                            size="lg"
                            className="w-full py-7 text-xl border-2 border-blue-600 text-blue-600 hover:bg-blue-50 transition-all font-bold rounded-2xl"
                        >
                            <Link href="/sign-up">Sign Up</Link>
                        </Button>
                    </div>
                </div>

            </div>
        </div>
    );
}
