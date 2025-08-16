import type { Metadata } from "next";
import { Analytics } from "@vercel/analytics/next";
import { SpeedInsights } from "@vercel/speed-insights/next";
import "./_styles/globals.css";
import { ThemeProvider } from "./_context/themeProvider";
import Header from "./_components/Header";
import MobileNavigation from "./_components/MobileNavigation";
import ReactQueryProvider from "./_context/ReactQueryProvider";
import { SearchProvider } from "./_context/SearchContext";
import ClientInit from "./_context/ClientInit";

// const geistSans = Geist({
//     variable: "--font-geist-sans",
//     subsets: ["latin"],
// });

// const geistMono = Geist_Mono({
//     variable: "--font-geist-mono",
//     subsets: ["latin"],
// });

export const metadata: Metadata = {
    title: "My Movies",
    description:
        "My Movies is a movie app that allows you to search for movies and tv shows. It's created by Reza salehi to show my skills and personal use.It's created by Sorena salehi to show my skills and personal use.",
};

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <html lang="en">
            <head>
                <link
                    rel="preconnect"
                    href="https://image.tmdb.org"
                    crossOrigin=""
                />
                <link rel="manifest" href="./manifest.json" />
                <meta name="theme-color" content="#0f0f17" />

                <meta
                    name="viewport"
                    content="width=device-width, initial-scale=1, viewport-fit=cover"
                />

                {/* iOS support */}
                <link rel="apple-touch-icon" href="./icon.png" />
                <meta name="apple-mobile-web-app-capable" content="yes" />
                <meta
                    name="apple-mobile-web-app-status-bar-style"
                    content="black-translucent"
                />
                <meta name="apple-mobile-web-app-title" content="My Movies" />
            </head>
            <body
                // className={`${geistSans.variable} ${geistMono.variable} antialiased`}
                className={` antialiased`}
            >
                <ThemeProvider
                    attribute="class"
                    defaultTheme="dark"
                    enableSystem
                    disableTransitionOnChange
                >
                    <ReactQueryProvider>
                        <SearchProvider>
                            <ClientInit>
                                {/* begin:: App Main */}
                                <main
                                    className="  relative flex flex-col items-center
      bg-sidebar-secondary/20 overflow-x-hidden
      min-h-[100dvh]
      pt-[calc(env(safe-area-inset-top,0px)+80px)]
      pb-[env(safe-area-inset-bottom,0px)]"
                                >
                                    {/* // begin:: Header  */}
                                    <Header />
                                    {/* // end:: Header  */}

                                    {/* // begin:: Children */}
                                    {children}
                                    {/* // end:: Children */}

                                    {/* begin:: Mobile Navigation */}
                                    <MobileNavigation />

                                    {/* end:: Mobile Navigation */}
                                </main>
                                {/* end:: App Main */}
                            </ClientInit>
                        </SearchProvider>
                    </ReactQueryProvider>
                </ThemeProvider>
                <Analytics />
                <SpeedInsights />
            </body>
        </html>
    );
}
