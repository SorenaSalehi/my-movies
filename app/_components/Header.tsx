import Link from "next/link";
import { HeaderNavigation } from "./HeaderNavigation";
import Image from "next/image";
import SearchInput from "./SearchInput";
import BackButton from "./ui/BackBtn";

export default function Header() {
    return (
        <header
            className="
                 inset-x-0 top-0 z-[2000]
    flex items-center justify-between
     lg:bg-sidebar-secondary/20 lg:backdrop-blur-3xl bg-background
    px-4 border-b border-red-500/20 
    h-20 shadow-red-800/10 shadow-xl "
        >
            {/* begin:: header nav for lg screens */}
            <HeaderNavigation />
            {/* end:: header nav for lg screens */}

            {/* begin::search input for lg screens */}
            <SearchInput />
            {/* end::search input for lg screens */}

            <BackButton />

            {/* begin::App logo */}
            <Link href="/" className="lg:hidden  ml-auto ">
                <Image
                    src={"/icon.webp"}
                    alt="my movies logo created by canva.ai , it's a old camera and colors are red and dark-gray"
                    width={80}
                    height={80}
                    className="object-cover "
                />
            </Link>
            {/* begin::App logo */}

            {/* begin::Theme toggle for sm screens */}
            {/* <ThemeModeToggle /> */}
            {/* end::Theme toggle for sm screens */}
        </header>
    );
}
