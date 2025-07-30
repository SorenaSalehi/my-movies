"use client";

import * as React from "react";
import Link from "next/link";

import {
    NavigationMenu,
    NavigationMenuContent,
    NavigationMenuItem,
    NavigationMenuLink,
    NavigationMenuList,
    NavigationMenuTrigger,
    navigationMenuTriggerStyle,
} from "@/app/_components/ui/navigation-menu";
import Image from "next/image";
import { Genre } from "../_types/dataProvTypes";
import { useSearchContext } from "../_context/SearchContext";

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

interface Props {
    movieGenres: Genre[];
    tvGenres: Genre[];
}
const contactMe = [
    { title: "Whatsapp", href: "https://wa.me/905379676995" },
    { title: "Email", href: "mailto:itssorenadev@gmail.com" },
    { title: "Github", href: "https://github.com/SorenaSalehi" },
];

export function HeaderNavigation({ movieGenres, tvGenres }: Props) {
    const movieGenresList = movieGenres.map((genre) => ({
        title: genre.name,
        href: `/movie/genre/${genre.id}`,
    }));
    const tvGenresList = tvGenres.map((genre) => ({
        title: genre.name,
        href: `/tv/genre/${genre.id}`,
    }));
    const { setQuery } = useSearchContext();
    return (
        <NavigationMenu viewport={false}>
            <NavigationMenuList>
                <NavigationMenuItem>
                    <NavigationMenuLink
                        asChild
                        className={navigationMenuTriggerStyle()}
                    >
                        <Link
                            href="/"
                            className="h-20 mx-4"
                            onClick={() => setQuery("")}
                        >
                            <Image
                                src={"/icon.webp"}
                                alt="my movies icon , it is a old camera mixed by red and gray colors"
                                fill
                                className="object-cover"
                                quality={100}
                            />
                        </Link>
                    </NavigationMenuLink>
                </NavigationMenuItem>
                <NavigationMenuItem>
                    <NavigationMenuLink
                        asChild
                        className={navigationMenuTriggerStyle()}
                        onClick={() => setQuery("")}
                    >
                        <Link href="/">Home</Link>
                    </NavigationMenuLink>
                </NavigationMenuItem>
                <NavigationMenuItem>
                    <NavigationMenuTrigger>Watchlist</NavigationMenuTrigger>
                    <NavigationMenuContent>
                        <ul className="grid gap-2  md:grid-cols-2 w-max">
                            {watchlist.map((component) => (
                                <ListItem
                                    key={component.title}
                                    title={component.title}
                                    href={component.href}
                                    className="border-l-2 border-red-500/25 "
                                ></ListItem>
                            ))}
                        </ul>
                    </NavigationMenuContent>
                </NavigationMenuItem>
                <NavigationMenuItem>
                    <NavigationMenuTrigger>Movies</NavigationMenuTrigger>
                    <NavigationMenuContent>
                        <ul className="grid gap-2  md:grid-cols-2 w-max">
                            {movieGenresList.map((component) => (
                                <ListItem
                                    key={component.title}
                                    title={component.title}
                                    href={component.href}
                                    className="border-l-2  border-red-500/25"
                                ></ListItem>
                            ))}
                        </ul>
                    </NavigationMenuContent>
                </NavigationMenuItem>
                <NavigationMenuItem>
                    <NavigationMenuTrigger>TV Shows</NavigationMenuTrigger>
                    <NavigationMenuContent>
                        <ul className="grid gap-2  md:grid-cols-2 w-max">
                            {tvGenresList.map((component) => (
                                <ListItem
                                    key={component.title}
                                    title={component.title}
                                    href={component.href}
                                    className="border-l-2 border-red-500/25 "
                                ></ListItem>
                            ))}
                        </ul>
                    </NavigationMenuContent>
                </NavigationMenuItem>
                <NavigationMenuItem>
                    <NavigationMenuTrigger>Contact me</NavigationMenuTrigger>
                    <NavigationMenuContent>
                        <ul className="grid gap-2  md:grid-cols-2 w-max">
                            {contactMe.map((component) => (
                                <ListItem
                                    key={component.title}
                                    title={component.title}
                                    href={component.href}
                                    className="border-l-2 border-red-500/25 "
                                ></ListItem>
                            ))}
                        </ul>
                    </NavigationMenuContent>
                </NavigationMenuItem>
            </NavigationMenuList>
        </NavigationMenu>
    );
}

function ListItem({
    title,
    children,
    href,
    ...props
}: React.ComponentPropsWithoutRef<"li"> & { href: string }) {
    return (
        <li {...props}>
            <NavigationMenuLink asChild>
                <Link href={href}>
                    <div className="text-sm leading-none font-medium">
                        {title}
                    </div>
                    <p className="text-muted-foreground line-clamp-2 text-sm leading-snug">
                        {children}
                    </p>
                </Link>
            </NavigationMenuLink>
        </li>
    );
}
