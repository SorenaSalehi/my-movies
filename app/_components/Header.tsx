import { ThemeModeToggle } from "./ThemeModeToggle";
import { SidebarTrigger } from "./ui/sidebar";

export default function Header() {
    return (
        <div className="min-w-screen sticky-top flex justify-content-between items-center">
            <SidebarTrigger />
            <ThemeModeToggle />
        </div>
    );
}
