import { HeaderNavigation } from "./HeaderNavigation";
import { ThemeModeToggle } from "./ThemeModeToggle";
import { SidebarTrigger } from "./ui/sidebar";

export default function Header() {
    return (
        <div className="min-w-screen sticky-top flex justify-between p-2 items-center bg-gray-800/20 backdrop-blur-3xl">
            <SidebarTrigger className="md:hidden" />

            <HeaderNavigation />

            <ThemeModeToggle />
        </div>
    );
}
