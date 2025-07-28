import React from "react";
import { User, LayoutGrid, Search, Bookmark } from "lucide-react";

type NavItem = {
    id: string;
    title: string;
    icon: React.ReactNode;
    href: string;
};

const MobileNavigation = () => {
    const navItems: NavItem[] = [
        {
            id: "categories",
            title: "Cats",
            href: "#",
            icon: <LayoutGrid className="w-6 h-6" />,
        },
        {
            id: "search",
            title: "Search",
            href: "#",
            icon: <Search className="w-6 h-6" />,
        },
        {
            id: "bookmark",
            title: "saved",
            href: "#",
            icon: <Bookmark className="w-6 h-6" />,
        },
        {
            id: "profile",
            title: "Profile",
            href: "#",
            icon: <User className="w-6 h-6" />,
        },
    ];

    return (
        <div className="lg:hidden z-[1000]   sticky bottom-2   flex justify-center shadow-destructive/10 shadow-lg backdrop-blur-3xl bg-destructive/10  p-2 rounded-xl">
            {navItems.map((item) => (
                <a
                    key={item.id}
                    href={item.href}
                    className="group inline-flex z-[1000] relative justify-between items-center gap-2 rounded-lg focus:outline-none w-[70px] hover:w-[130px]  h-[50px]  transition-all duration-200 ease-in focus:bg-destructive"
                >
                    <span className="left-[18px] absolute flex-shrink-0 w-7 h-7">
                        {item.icon}
                    </span>
                </a>
            ))}
        </div>
    );
};

export default MobileNavigation;
