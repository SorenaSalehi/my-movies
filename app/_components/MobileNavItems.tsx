"use client";

import * as React from "react";
import Link from "next/link";
import { User, LayoutGrid, Search, Bookmark, Home } from "lucide-react";

import {
    NavigationMenu,
    NavigationMenuContent,
    NavigationMenuItem,
    NavigationMenuLink,
    NavigationMenuList,
    NavigationMenuTrigger,
    navigationMenuTriggerStyle,
} from "@/app/_components/ui/navigation-menu";

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

export function MobileNavItems() {
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
                            className="group inline-flex z-[1000]  justify-center items-center gap-2 rounded-lg focus:outline-none w-[50px]  h-[50px]  transition-all duration-200 ease-in focus:bg-destructive text-center"
                        >
                            <Search className="w-6 h-6" />
                        </Link>
                    </NavigationMenuLink>
                </NavigationMenuItem>
                <NavigationMenuItem>
                    <NavigationMenuLink
                        asChild
                        className={navigationMenuTriggerStyle()}
                    >
                        <Link
                            href={"/categories"}
                            className="group inline-flex z-[1000]  justify-center items-center gap-2 rounded-lg focus:outline-none w-[50px]  h-[50px]  transition-all duration-200 ease-in focus:bg-destructive text-center"
                        >
                            <LayoutGrid className="w-6 h-6" />
                        </Link>
                    </NavigationMenuLink>
                </NavigationMenuItem>
                <NavigationMenuItem>
                    <NavigationMenuLink
                        asChild
                        className={navigationMenuTriggerStyle()}
                    >
                        <Link
                            href={"/"}
                            className="group inline-flex z-[1000]  justify-center items-center gap-2 rounded-lg focus:outline-none w-[50px]  h-[50px]  transition-all duration-200 ease-in focus:bg-destructive text-center"
                        >
                            <Home className="w-6 h-6" />
                        </Link>
                    </NavigationMenuLink>
                </NavigationMenuItem>
                <NavigationMenuItem>
                    <NavigationMenuTrigger>
                        <Bookmark className="w-6 h-6" />
                    </NavigationMenuTrigger>
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
                    <NavigationMenuLink
                        asChild
                        className={navigationMenuTriggerStyle()}
                    >
                        <Link href={"/dashboard"}>
                            <User className="w-6 h-6" />
                        </Link>
                    </NavigationMenuLink>
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
