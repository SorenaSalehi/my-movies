"use client";
import { MOVIE_WATCHLIST_KEY } from "@/app/_lib/contents";
import { safeParse } from "@/app/_lib/helpers";
import MediaList from "./MediaList";
import { useState } from "react";

export default function MoviesWatchlist() {
    const [watchlistIds] = useState<number[]>(() => {
        return safeParse<number[]>(
            localStorage.getItem(MOVIE_WATCHLIST_KEY),
            []
        );
    });

    return <MediaList mediaListIds={watchlistIds} />;
}
