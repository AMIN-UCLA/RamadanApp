"use client";

import { useTheme } from "next-themes";
import { useEffect, useState } from "react";
import { Moon, Sun } from "lucide-react";

/** Crescent icon that toggles theme – same look as the header logo, no extra UI */
export function CrescentThemeToggle() {
    const [mounted, setMounted] = useState(false);
    const { resolvedTheme, setTheme } = useTheme();

    useEffect(() => setMounted(true), []);

    if (!mounted) {
        return (
            <span className="h-6 w-6 shrink-0 text-blue-500 dark:text-blue-400 inline-block" aria-hidden>
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 12.79A9 9 0 1111.21 3 7 7 0 0021 12.79z" />
                </svg>
            </span>
        );
    }

    const isDark = resolvedTheme === "dark";

    return (
        <button
            type="button"
            aria-label={isDark ? "Switch to light mode" : "Switch to dark mode"}
            onClick={() => setTheme(isDark ? "light" : "dark")}
            className="shrink-0 min-w-[44px] min-h-[44px] flex items-center justify-center rounded-full text-blue-500 dark:text-blue-400 hover:opacity-80 active:opacity-70 transition-opacity touch-manipulation"
        >
            <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
            >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 12.79A9 9 0 1111.21 3 7 7 0 0021 12.79z" />
            </svg>
        </button>
    );
}

export function ThemeToggle() {
    const [mounted, setMounted] = useState(false);
    const { resolvedTheme, setTheme } = useTheme();

    useEffect(() => setMounted(true), []);

    if (!mounted) {
        return (
            <button
                type="button"
                aria-label="Toggle theme"
                className="p-2 w-10 h-10 rounded-full opacity-0"
            />
        );
    }

    const isDark = resolvedTheme === "dark";

    return (
        <button
            type="button"
            aria-label={isDark ? "Switch to light mode" : "Switch to dark mode"}
            onClick={() => setTheme(isDark ? "light" : "dark")}
            className="p-2 rounded-full text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-100 hover:bg-gray-200/60 dark:hover:bg-white/10 transition-all duration-200"
        >
            {isDark ? (
                <Sun className="h-5 w-5" />
            ) : (
                <Moon className="h-5 w-5" />
            )}
        </button>
    );
}
