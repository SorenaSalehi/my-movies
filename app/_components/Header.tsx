import { ThemeModeToggle } from "./ThemeModeToggle";
import { SidebarTrigger } from "./ui/sidebar";

export default function Header() {
    return (
        <div className="min-w-screen sticky-top flex justify-between p-2 items-center">
            <SidebarTrigger />

            <h1>My Movies</h1>

            <ThemeModeToggle />
        </div>
    );
}
