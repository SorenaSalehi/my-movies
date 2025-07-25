import type { Metadata } from "next";
import { Analytics } from "@vercel/analytics/next";
import { SpeedInsights } from "@vercel/speed-insights/next";
import "./_styles/globals.css";
import { ThemeProvider } from "./_context/themeProvider";
import { SidebarProvider } from "./_components/ui/sidebar";
import { AppSidebar } from "./_components/AppSidebar";
import Header from "./_components/Header";
import MobileNavigation from "./_components/MobileNavigation";

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
            </head>
            <body
                // className={`${geistSans.variable} ${geistMono.variable} antialiased`}
                className={` antialiased`}
            >
                <ThemeProvider
                    attribute="class"
                    defaultTheme="system"
                    enableSystem
                    disableTransitionOnChange
                >
                    {/* // begin:: Sidebar Provider  */}
                    <SidebarProvider>
                        {/* begin:: App sidebar */}
                        <AppSidebar />
                        {/* end:: App sidebar */}

                        {/* begin:: App Main */}
                        <main className="relative flex flex-col justify-start items-center  lg:p-0 bg-sidebar-secondary/20 min-h-screen w-full ">
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
                    </SidebarProvider>
                    {/* // end:: Sidebar Provider  */}
                </ThemeProvider>
                <Analytics />
                <SpeedInsights />
            </body>
        </html>
    );
}
