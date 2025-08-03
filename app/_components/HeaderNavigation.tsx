import {
    NavigationMenu,
    NavigationMenuList,
} from "@/app/_components/ui/navigation-menu";
import Image from "next/image";
import { Genre } from "../_types/dataProvTypes";
import NavigationItemReusable from "./NavigationItemReusable";
import { fetchGenres } from "../_lib/tmdb";

export const revalidate = 86400;

const watchlist: ListItem[] = [
    {
        title: "Movies",
        href: "/watchlist/movie",
    },
    {
        title: "Tv Shows",
        href: "/watchlist/tv",
    },
];

interface ListItem {
    title: string;
    href: string;
}

const contactMe = [
    { title: "Whatsapp", href: "https://wa.me/905379676995" },
    { title: "Email", href: "mailto:itssorenadev@gmail.com" },
    { title: "Github", href: "https://github.com/SorenaSalehi" },
];

export async function HeaderNavigation() {
    const [movieGenres, tvGenres] = await Promise.all<Genre[]>([
        fetchGenres("movie"),
        fetchGenres("tv"),
    ]);
    const movieGenresList = movieGenres.map((genre) => ({
        title: genre.name,
        href: `/movie/genre/${genre.id}`,
    }));
    const tvGenresList = tvGenres.map((genre) => ({
        title: genre.name,
        href: `/tv/genre/${genre.id}`,
    }));

    const navItems = [
        {
            type: "link" as const,
            href: "/",
            children: (
                <Image
                    src={"/icon.webp"}
                    alt="my movies icon , it is a old camera mixed by red and gray colors"
                    fill
                    className="object-cover "
                    quality={100}
                />
            ),
        },
        { type: "link" as const, href: "/", children: "Home" },
        {
            type: "button" as const,
            triggerText: "Watchlist",
            listItems: watchlist,
        },
        {
            type: "button" as const,
            triggerText: "Movies",
            listItems: movieGenresList,
        },
        {
            type: "button" as const,
            triggerText: "TV Shows",
            listItems: tvGenresList,
        },
        {
            type: "button" as const,
            triggerText: "Contact me",
            listItems: contactMe,
        },
    ];
    return (
        <NavigationMenu viewport={false} className="hidden lg:flex">
            <NavigationMenuList>
                {navItems.map((item, i) => (
                    <NavigationItemReusable key={i} {...item} />
                ))}
            </NavigationMenuList>
        </NavigationMenu>
    );
}
