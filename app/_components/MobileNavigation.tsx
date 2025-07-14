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
        <div className="flex justify-center p-2 rounded-xl shadow-lg shadow-gray-800 absolute bottom-0 left-0 right-0 sm:hidden">
            {navItems.map((item) => (
                <a
                    key={item.id}
                    href={item.href}
                    className="inline-flex justify-between gap-2 items-center w-[70px] h-[50px] rounded-lg relative z-[1000] overflow-hidden origin-left transition-all duration-200 ease-in hover:w-[130px] focus:w-[130px] focus:outline-none group"
                >
                    <span className="absolute left-[18px] w-7 h-7 flex-shrink-0 ">
                        {item.icon}
                    </span>
                    <span className="translate-x-full group-hover:translate-x-0 group-focus:translate-x-0 transition-transform duration-200 ease-in origin-right text-center w-full text-indent-7">
                        {item.title}
                    </span>
                    {/* <span className="absolute z-[-1] inset-0 rounded-lg w-full h-full translate-x-full group-hover:translate-x-0 group-focus:translate-x-0 transition-transform duration-200 ease-in origin-right "></span> */}
                </a>
            ))}
        </div>
    );
};

export default MobileNavigation;
