import Link from "next/link";
import { ThemeToggle } from "@/components/ThemeToggle";

export default function Header() {
    return (
        <header className="bg-gradient-to-r from-gray-100 to-gray-200 dark:from-gray-800 dark:to-gray-900 py-5 px-4 border-b border-gray-200 dark:border-gray-700 drop-shadow-md">
            <div className="container mx-auto flex items-center justify-center space-x-2 relative">
                <div className="absolute right-4 top-1/2 -translate-y-1/2">
                    <ThemeToggle />
                </div>
                {/* Islamic-inspired crescent icon */}
                <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-6 w-6 text-blue-500 dark:text-blue-400"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                >
                    <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M21 12.79A9 9 0 1111.21 3 7 7 0 0021 12.79z"
                    />
                </svg>
                <Link
                    href="/"
                    className="text-xl md:text-2xl font-bold text-center text-gray-900 dark:text-gray-100"
                >
                    UCLA MSA Ramadan Schedule
                </Link>
            </div>
            <div className="container mx-auto flex justify-center">
                <p className="text-xs text-gray-500 dark:text-gray-400">Powered by AMIN @ UCLA</p>
            </div>
        </header>
    );
}
