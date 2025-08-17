import type { Metadata } from "next";
import "./awsm.min.css";
import "./globals.css";
import Navbar from "@/components/navbar";

/*
const Norasi = localFont({
    src: [
        {
            path: "../fonts/Norasi.otf",
            weight: "400",
            style: "normal",
        },
        {
            path: "../fonts/Norasi-Italic.otf",
            weight: "400",
            style: "italic",
        },
        {
            path: "../fonts/Norasi-Bold.otf",
            weight: "700",
            style: "normal",
        },
        {
            path: "../fonts/Norasi-BoldItalic.otf",
            weight: "700",
            style: "italic",
        },
    ],
    variable: "--font-norasi",
});

const Kinnari = localFont({
    src: [
        {
            path: "../fonts/Kinnari.otf",
            weight: "400",
            style: "normal",
        },
        {
            path: "../fonts/Kinnari-Italic.otf",
            weight: "400",
            style: "italic",
        },
        {
            path: "../fonts/Kinnari-Bold.otf",
            weight: "700",
            style: "normal",
        },
        {
            path: "../fonts/Kinnari-BoldItalic.otf",
            weight: "700",
            style: "italic",
        },
    ],
    variable: "--font-kinnari",
});
*/

export const metadata: Metadata = {
    title: "Jock CTF",
    description: "Beginner CTF platform, by a retard for beginners.",
};

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <html lang="en">
            <body className={`font-georgia ${""}`}>
                <header>
                    <h1>jock CTF</h1>
                    <p>retards educating retards</p>
                    <Navbar />
                </header>
                {children}
                <footer>chalk khodei</footer>
            </body>
        </html>
    );
}
