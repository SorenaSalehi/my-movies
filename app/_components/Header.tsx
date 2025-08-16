import Link from "next/link";
import { HeaderNavigation } from "./HeaderNavigation";
import { ThemeModeToggle } from "./ui/ThemeModeToggle";
import Image from "next/image";
import SearchInput from "./SearchInput";

export default function Header() {
    return (
        <header
            className="
                fixed inset-x-0 top-0 z-[1000]
    flex items-center justify-between
    bg-sidebar-secondary/20 backdrop-blur-3xl
    px-4 border-b border-red-500/10
    pt-[env(safe-area-inset-top,0px)]
    h-[calc(80px+env(safe-area-inset-top,0px))]"
        >
            <div
                aria-hidden
                className="
      absolute top-0 inset-x-0
      h-[env(safe-area-inset-top,0px)]
      bg-sidebar-secondary/90 backdrop-blur-3xl
      pointer-events-none
    "
            />
            {/* begin:: header nav for lg screens */}
            <HeaderNavigation />
            {/* end:: header nav for lg screens */}

            {/* begin::search input for lg screens */}
            <SearchInput />
            {/* end::search input for lg screens */}

            {/* begin::App logo */}
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
            {/* begin::App logo */}

            {/* begin::Theme toggle for sm screens */}
            <ThemeModeToggle />
            {/* end::Theme toggle for sm screens */}
        </header>
    );
}
