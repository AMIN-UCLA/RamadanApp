import Link from "next/link";
import { CrescentThemeToggle } from "@/components/ThemeToggle";

export default function Header() {
    return (
        <header className="bg-gradient-to-r from-gray-100 to-gray-200 dark:from-gray-800 dark:to-gray-900 py-4 px-4 sm:py-5 border-b border-gray-200 dark:border-gray-700 drop-shadow-md">
            <div className="container mx-auto flex items-center justify-center space-x-2">
                <CrescentThemeToggle />
                <Link
                    href="/"
                    className="text-xl md:text-2xl font-bold text-center text-gray-900 dark:text-gray-100"
                >
                    UCLA MSA Ramadan Schedule
                </Link>
            </div>
            <div className="container mx-auto flex justify-center mt-2">
                <p className="text-xs text-gray-500 dark:text-gray-400 text-center">
                    Powered by AMIN @ UCLA
                </p>
            </div>
        </header>
    );
}
