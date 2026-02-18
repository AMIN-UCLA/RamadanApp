import Link from "next/link";

export default function Footer() {
    return (
        <footer className="py-6 mt-8 text-gray-900 dark:text-gray-100">
            <div className="container mx-auto flex flex-col items-center">
                {/* Main logo section in column */}
                <div className="flex flex-col items-center mb-4">
                    <img
                        src="/amin-square-logo.png"
                        alt="AMIN Logo"
                        className="h-12 w-12 mb-2"
                    />
                    <p className="text-xs text-gray-600 dark:text-gray-400">
                        &copy; {new Date().getFullYear()} AMIN. All rights
                        reserved.
                    </p>
                </div>
                {/* Social media logos updated with small dimensions and correct src */}
                <div className="flex space-x-2 mb-4">
                    <Link
                        href="https://www.instagram.com/amin.ucla"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="min-w-[44px] min-h-[44px] flex items-center justify-center rounded-lg active:opacity-70 touch-manipulation"
                        aria-label="Instagram"
                    >
                        <img
                            src="/instagram-logo.svg"
                            alt=""
                            className="h-6 w-6 hover:opacity-80"
                        />
                    </Link>
                    <Link
                        href="https://www.linkedin.com/company/105635897/"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="min-w-[44px] min-h-[44px] flex items-center justify-center rounded-lg active:opacity-70 touch-manipulation"
                        aria-label="LinkedIn"
                    >
                        <img
                            src="/linkedin-logo.svg"
                            alt=""
                            className="h-6 w-6 hover:opacity-80"
                        />
                    </Link>
                </div>
            </div>
        </footer>
    );
}
