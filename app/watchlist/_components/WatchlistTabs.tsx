"use client";

import Link from "next/link";
import {
    Tabs,
    TabsList,
    TabsTrigger,
    TabsContent,
} from "@/app/_components/ui/tabs";
import MoviesWatchlist from "../_components/MoviesWatchlist";
import TvShowsWatchlist from "../_components/TvShowsWatchlist";

export default function WatchlistTabs({ media }: { media: "movie" | "tv" }) {
    return (
        <Tabs
            value={media}
            style={{ minHeight: "65dvh" }}
            className="flex flex-col items-center gap-4 my-4"
        >
            <h1 className="text-center border border-red-500/20 p-2 rounded-xl animate-pulse delay-1000 text-xs backdrop-brightness-200 shadow-lg mx-4">
                You can keep a local watchlist, but it may be lost. Please log
                in to keep it safe.
            </h1>

            <TabsList className="my-4">
                <TabsTrigger value="tv" asChild>
                    <Link href="/watchlist/tv">TV Shows</Link>
                </TabsTrigger>
                <TabsTrigger value="movie" asChild>
                    <Link href="/watchlist/movie">Movies</Link>
                </TabsTrigger>
            </TabsList>

            <TabsContent
                value="movie"
                className="grid grid-cols-2 gap-x-4 gap-y-2 mb-4 md:grid-cols-3 w-full max-w-6xl"
            >
                <MoviesWatchlist />
            </TabsContent>

            <TabsContent
                value="tv"
                className="grid grid-cols-2 gap-x-4 gap-y-2 mb-4 md:grid-cols-3 w-full max-w-6xl"
            >
                <TvShowsWatchlist />
            </TabsContent>
        </Tabs>
    );
}
