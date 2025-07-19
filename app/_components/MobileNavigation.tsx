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
        <div className="md:hidden right-0 bottom-10 left-0 absolute flex justify-center shadow-gray-800 shadow-lg p-2 rounded-xl">
            {navItems.map((item) => (
                <a
                    key={item.id}
                    href={item.href}
                    className="group inline-flex z-[1000] relative justify-between items-center gap-2 rounded-lg focus:outline-none w-[70px] hover:w-[130px] focus:w-[130px] h-[50px] overflow-hidden origin-left transition-all duration-200 ease-in"
                >
                    <span className="left-[18px] absolute flex-shrink-0 w-7 h-7">
                        {item.icon}
                    </span>
                    <span className="w-full text-center text-indent-7 origin-right transition-transform translate-x-full group-focus:translate-x-0 group-hover:translate-x-0 duration-200 ease-in">
                        {item.title}
                    </span>
                    {/* <span className="z-[-1] absolute inset-0 rounded-lg w-full h-full origin-right transition-transform translate-x-full group-focus:translate-x-0 group-hover:translate-x-0 duration-200 ease-in"></span> */}
                </a>
            ))}
        </div>
    );
};

export default MobileNavigation;
