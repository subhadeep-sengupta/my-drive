import { HardDrive } from "lucide-react";
import { redirect } from "next/navigation";
import { auth } from "@clerk/nextjs/server";

export default async function SigninLayout({
    children,
}: Readonly<{ children: React.ReactNode }>) {
    const session = await auth();
    if (session.userId) {
        return redirect("/drive");
    }

    return (
        <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-black text-white">
            {/* Header */}
            <header className="container mx-auto px-4 py-6">
                <nav className="flex items-center justify-between">
                    <div className="flex items-center space-x-2">
                        <HardDrive className="h-8 w-8 text-white" />
                        <span className="text-2xl font-bold">My Drive</span>
                    </div>
                </nav>
            </header>
            {children}
            {/* Footer */}
            <footer className="container mx-auto border-t border-gray-800 px-4 py-8">
                <div className="flex flex-col items-center justify-between md:flex-row">
                    <div className="mb-4 flex items-center space-x-2 md:mb-0">
                        <HardDrive className="h-6 w-6 text-gray-400" />
                        <span className="text-gray-400">
                            © 2024 My Drive. All rights reserved.
                        </span>
                    </div>
                    <div className="flex space-x-6 text-gray-400">
                        <a href="#" className="transition-colors hover:text-white">
                            Privacy
                        </a>
                        <a href="#" className="transition-colors hover:text-white">
                            Terms
                        </a>
                        <a href="#" className="transition-colors hover:text-white">
                            Support
                        </a>
                    </div>
                </div>
            </footer>
        </div>
    );
}
