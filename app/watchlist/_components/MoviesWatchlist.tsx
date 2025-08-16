"use client";

import MediaList from "./MediaList";
import { useState } from "react";
import { safeParse } from "@/app/_lib/helpers";
import { MOVIE_WATCHLIST_KEY } from "@/app/_lib/contents";

export default function MoviesWatchlist() {
    const [ids] = useState<number[]>(() =>
        safeParse<number[]>(
            typeof window !== "undefined"
                ? localStorage.getItem(MOVIE_WATCHLIST_KEY)
                : null,
            []
        )
    );
    console.log("ids", ids);
    return <MediaList mediaListIds={ids} media="movie" />;
}
