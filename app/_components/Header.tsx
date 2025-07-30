import Link from "next/link";
import { HeaderNavigation } from "./HeaderNavigation";
import { SearchInput } from "./SearchInput";
import { ThemeModeToggle } from "./ThemeModeToggle";
import Image from "next/image";
import { fetchGenres } from "../_lib/tmdb";

export default async function Header() {
    const [movieGenres, tvGenres] = await Promise.all([
        fetchGenres("movie"),
        fetchGenres("tv"),
    ]);
    return (
        <div className="z-[100] sticky top-0 flex justify-between lg:justify-start items-center bg-sidebar-secondary/20 backdrop-blur-3xl p-2 px-[2rem] lg:pr-4 w-full border-b-[.01rem] border-red-500/10  h-20">
            <HeaderNavigation movieGenres={movieGenres} tvGenres={tvGenres} />
            <SearchInput />
            <Link
                href="/"
                className="lg:hidden flex justify-center items-center text-xs  text-center"
            >
                <Image
                    src={"/icon.webp"}
                    alt="my movies logo created by canva.ai , it's a old camera and colors are red and dark-gray"
                    width={80}
                    height={80}
                    className="object-cover"
                />
                Created With 💖 to show my skills and for personal use.
            </Link>

            <ThemeModeToggle />
        </div>
    );
}
