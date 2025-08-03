import Link from "next/link";
import { HeaderNavigation } from "./HeaderNavigation";
import { ThemeModeToggle } from "./ThemeModeToggle";
import Image from "next/image";
import SearchInput from "./SearchInput";

export default function Header() {
    return (
        <div className="z-[1000] fixed top-0 flex  lg:justify-start items-center bg-sidebar-secondary/20 backdrop-blur-3xl p-2 lg:px-[2rem] px-[1rem] lg:pr-4 w-full border-b-[.01rem] border-red-500/10  h-20">
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
        </div>
    );
}
