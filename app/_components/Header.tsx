import { HeaderNavigation } from "./HeaderNavigation";
import { SearchInput } from "./SearchInput";
import { ThemeModeToggle } from "./ThemeModeToggle";
import { SidebarTrigger } from "./ui/sidebar";

export default function Header() {
    return (
        <div className="min-w-screen sticky-top flex justify-between p-2 items-center bg-gray-800/20 backdrop-blur-3xl h-20 z-[100]">
            <SidebarTrigger className="md:hidden" />

            <HeaderNavigation />
            <SearchInput />
            <div className="hidden sm:block w-25"></div>

            <ThemeModeToggle />
        </div>
    );
}
