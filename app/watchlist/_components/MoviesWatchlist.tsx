"use client";
import MediaList from "./MediaList";
import { useState } from "react";
import { safeParse } from "@/app/_lib/helpers";
import { MOVIE_WATCHLIST_KEY } from "@/app/_lib/contents";

export default function MoviesWatchlist() {
    const [moviesWatchlistIds] = useState<number[]>(() => {
        return safeParse<number[]>(
            localStorage.getItem(MOVIE_WATCHLIST_KEY),
            []
        );
    });
    return (
        <div>
            <MediaList mediaListIds={moviesWatchlistIds} media="movie" />
        </div>
    );
}
