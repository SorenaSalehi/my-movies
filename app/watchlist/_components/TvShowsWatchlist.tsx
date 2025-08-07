"use client";
import { TV_SHOWS_WATCHLIST_KEY } from "@/app/_lib/contents";
import { safeParse } from "@/app/_lib/helpers";
import { useState } from "react";

export default function TvShowsWatchlist() {
    const [seriesWatchlistIds] = useState<number[]>(() => {
        return safeParse<number[]>(
            localStorage.getItem(TV_SHOWS_WATCHLIST_KEY),
            []
        );
    });
    return;
}
