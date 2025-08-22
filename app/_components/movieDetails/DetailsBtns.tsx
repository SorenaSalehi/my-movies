"use client";

import { Bookmark, BookmarkCheck } from "lucide-react";
import { Button } from "../ui/button";
import { useCallback, useEffect, useMemo, useState } from "react";
import {
    MOVIE_WATCHLIST_KEY,
    TV_SHOWS_WATCHLIST_KEY,
} from "@/app/_lib/contents";
import { safeParse } from "@/app/_lib/helpers";
import { useParams } from "next/navigation";

export default function DetailsBtns({ movieId }: { movieId: number }) {
    const { media } = useParams();

    // begin:: getting movies/series id from local
    const [moviesWatchlist, setMoviesWatchlist] = useState<number[]>(() =>
        safeParse<number[]>(localStorage.getItem(MOVIE_WATCHLIST_KEY), [])
    );
    const [TvsWatchlist, setTvsWatchlist] = useState<number[]>(() =>
        safeParse<number[]>(localStorage.getItem(TV_SHOWS_WATCHLIST_KEY), [])
    );
    // end:: getting movies/series id from local

    const isAlreadySaved = useMemo(
        () =>
            media === "movie"
                ? moviesWatchlist.includes(movieId)
                : TvsWatchlist.includes(movieId),
        [media, movieId, moviesWatchlist, TvsWatchlist]
    );

    // begin:: saving movies/series ids to local
    useEffect(() => {
        localStorage.setItem(
            MOVIE_WATCHLIST_KEY,
            JSON.stringify(moviesWatchlist)
        );
    }, [moviesWatchlist]);
    useEffect(() => {
        localStorage.setItem(
            TV_SHOWS_WATCHLIST_KEY,
            JSON.stringify(TvsWatchlist)
        );
    }, [TvsWatchlist]);
    // end:: saving movies/series ids to local

    //media watchlist handler
    const handleClick = useCallback(() => {
        if (isAlreadySaved) {
            if (media === "movie") {
                setMoviesWatchlist((items) =>
                    items?.filter((i) => i !== movieId)
                );
            } else {
                setTvsWatchlist((items) => items?.filter((i) => i !== movieId));
            }
        }

        if (!isAlreadySaved) {
            if (media === "movie") {
                setMoviesWatchlist((prev) => {
                    if (prev.includes(movieId)) return prev;
                    return [...prev, movieId];
                });
            } else {
                setTvsWatchlist((prev) => {
                    if (prev.includes(movieId)) return prev;
                    return [...prev, movieId];
                });
            }
        }
    }, [media, movieId, isAlreadySaved]);

    return (
        <div className="flex md:flex-row gap-4">
            <Button
                className="bg-amber-300 w-50 font-bold text-zinc-800/90"
                onClick={handleClick}
            >
                {isAlreadySaved ? (
                    <BookmarkCheck strokeWidth={3} />
                ) : (
                    <Bookmark strokeWidth={3} />
                )}
                {isAlreadySaved ? "It's already saved" : "Add to WatchList"}
            </Button>
        </div>
    );
}
