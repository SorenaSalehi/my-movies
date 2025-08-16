"use client";

import MediaList from "./MediaList";
import { useState } from "react";
import { safeParse } from "@/app/_lib/helpers";
import { TV_SHOWS_WATCHLIST_KEY } from "@/app/_lib/contents";

export default function TvShowsWatchlist() {
    const [ids] = useState<number[]>(() =>
        safeParse<number[]>(
            typeof window !== "undefined"
                ? localStorage.getItem(TV_SHOWS_WATCHLIST_KEY)
                : null,
            []
        )
    );

    return <MediaList mediaListIds={ids} media="tv" />;
}
