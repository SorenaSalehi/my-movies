import Link from "next/link";
import { HeaderNavigation } from "./HeaderNavigation";
import { ThemeModeToggle } from "./ThemeModeToggle";
import Image from "next/image";
import SearchInput from "./SearchInput";

export default function Header() {
    return (
        <header
            className="
                fixed inset-x-0 top-0 z-[1000]
                flex items-center justify-between
                bg-sidebar-secondary/20 backdrop-blur-3xl
                px-4
                pt-[env(safe-area-inset-top)] 
                h-[80px]
                border-b border-red-500/10
              "
        >
            <HeaderNavigation />
            <SearchInput />
            <Link
                href="/"
                className="lg:hidden flex justify-start items-center text-xs  text-center mr-auto"
            >
                <Image
                    src={"/icon.webp"}
                    alt="my movies logo created by canva.ai , it's a old camera and colors are red and dark-gray"
                    width={80}
                    height={80}
                    className="object-cover"
                />
            </Link>

            <ThemeModeToggle />
        </header>
    );
}
