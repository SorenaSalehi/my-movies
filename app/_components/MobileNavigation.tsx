import Link from "next/link";
import { User, LayoutGrid, Bookmark, Home } from "lucide-react";

import MobileSearch from "./MobileSearch";

type NavItem = {
    id: string;
    icon: React.ReactNode | React.ReactElement;
    href: string;
    title: string;
};

const navItems: NavItem[] = [
    {
        id: "categories",
        href: "/categories",
        icon: <LayoutGrid className="w-6 h-6" />,
        title: "Cats",
    },

    {
        id: "watchlist",
        href: "/watchlist/movie",
        icon: <Bookmark className="w-6 h-6" />,
        title: "Saves",
    },
    {
        id: "home",
        href: "/",
        icon: <Home className="w-6 h-6" />,
        title: "Home",
    },
    {
        id: "search",
        href: "/search",
        icon: <MobileSearch />,
        title: "Search",
    },
    {
        id: "dashboard",
        href: "/dashboard",
        icon: <User className="w-6 h-6" />,
        title: "Profile",
    },
];
const MobileNavigation = () => {
    return (
        <div
            className="lg:hidden z-[1000] fixed inset-x-0 bottom-0
    pb-[2vh]   flex justify-center shadow-destructive/10 shadow-lg backdrop-blur-3xl bg-sidebar-secondary  p-2 rounded-xl max-w-max mx-auto"
        >
            {navItems.map((item) => (
                <Link
                    key={item.id}
                    href={item.href}
                    className="group inline-flex z-[1000] flex-col  justify-center items-center bg-red-800/50 mx-1 p-4  rounded-lg focus:outline-none w-[50px] md:w-[80px]  h-[50px]  transition-all duration-200 ease-in focus:bg-destructive focus:outline-0 focus:border-transparent focus:ring-0 text-center"
                >
                    <span className="w-7 h-7">{item.icon}</span>
                    <p className="text-xs text-nowrap">{item.title}</p>
                </Link>
            ))}
        </div>
    );
};

export default MobileNavigation;
