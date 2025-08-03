import React from "react";
import { User, LayoutGrid, Search, Bookmark, Home } from "lucide-react";
import Link from "next/link";
import MobileSearch from "./MobileSearch";
import NavigationItemReusable from "./NavigationItemReusable";

type NavItem = {
    id: string;
    icon: React.ReactNode | React.ReactElement;
    href: string;
};

const MobileNavigation = () => {
    const navItems: NavItem[] = [
        {
            id: "categories",
            href: "/categories",
            icon: <LayoutGrid className="w-6 h-6" />,
        },

        {
            id: "watch-list",
            href: "/watch-list",
            icon: <Bookmark className="w-6 h-6" />,
        },
        {
            id: "home",
            href: "/",
            icon: <Home className="w-6 h-6" />,
        },
        {
            id: "search",
            href: "#",
            icon: <MobileSearch />,
        },
        {
            id: "dashboard",
            href: "/dashboard",
            icon: <User className="w-6 h-6" />,
        },
    ];

    return (
        <div className="lg:hidden z-[1000] sticky bottom-2   flex justify-center shadow-destructive/10 shadow-lg backdrop-blur-3xl bg-red-950/70  p-2 rounded-xl">
            {navItems.map((item) => (
                <Link
                    key={item.id}
                    href={item.href}
                    className="group inline-flex z-[1000]  justify-center items-center gap-2 rounded-lg focus:outline-none w-[50px]  h-[50px]  transition-all duration-200 ease-in focus:bg-destructive text-center"
                >
                    <span className="w-7 h-7">{item.icon}</span>
                </Link>
            ))}
        </div>
    );
};

export default MobileNavigation;
