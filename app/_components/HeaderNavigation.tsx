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
import NavigationItemReusable from "./NavigationItemReusable";

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
                    // width={100}
                    // height={0}
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
