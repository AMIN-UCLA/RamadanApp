import type React from "react";
import "./globals.css";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import type { Metadata, Viewport } from "next";
import { Analytics } from "@vercel/analytics/react";
import { ThemeProvider } from "@/components/theme-provider";

export const viewport: Viewport = {
    width: "device-width",
    initialScale: 1,
    maximumScale: 5,
    viewportFit: "cover",
};

export const metadata: Metadata = {
    title: "Ramadan App",
    description: "Ramadan prayer times",
    icons: {
        icon: "/favicon/favicon.ico",
        shortcut: "/favicon/favicon-16x16.png",
        apple: "/favicon/apple-touch-icon.png",
    },
};

export default function RootLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <html lang="en" suppressHydrationWarning>
            <body className="bg-gray-100 text-gray-900 dark:bg-gray-900 dark:text-gray-100 min-h-[100dvh] pb-[env(safe-area-inset-bottom)]">
                <ThemeProvider
                    attribute="class"
                    defaultTheme="system"
                    enableSystem
                    disableTransitionOnChange
                >
                    {children}
                    <Analytics />
                </ThemeProvider>
            </body>
        </html>
    );
}
