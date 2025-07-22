import Link from "next/link";
import { HeaderNavigation } from "./HeaderNavigation";
import { SearchInput } from "./SearchInput";
import { ThemeModeToggle } from "./ThemeModeToggle";
import { SidebarTrigger } from "./ui/sidebar";

export default function Header() {
    return (
        <div className="z-[100] sticky-top flex justify-between items-center bg-sidebar-secondary/20 backdrop-blur-3xl p-2 px-[2rem] md:px-0 min-w-screen h-20">
            <SidebarTrigger />

            <HeaderNavigation />
            <SearchInput />
            <Link href="/" className="md:hidden block text-xs w-50 text-center">
                Created With 💖, to show my skills and personal use.
            </Link>

            <ThemeModeToggle />
        </div>
    );
}
