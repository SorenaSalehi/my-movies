"use client";

import MainMediaUL from "@/app/_components/media/MainMediaUL";
import Spinner from "@/app/_components/ui/Spinner";
import { useFetchAllByIds } from "@/app/_hooks/useFetchAllByIds";
import { Suspense } from "react";

interface Props {
    mediaListIds: number[];
    media: "movie" | "tv";
}

export default function MediaList({ mediaListIds, media }: Props) {
    const { watchlistData, isFetching, isError } = useFetchAllByIds({
        ids: mediaListIds,
        media,
    });
    if (isFetching) return <Spinner />;

    if (
        !watchlistData ||
        !mediaListIds ||
        mediaListIds.length === 0 ||
        (watchlistData?.results?.length === 0 && !isFetching)
    )
        return (
            <div className="col-span-full text-center opacity-70">
                Your {media === "movie" ? "movie" : "TV"} watchlist is empty.
            </div>
        );

    if (isError)
        return (
            <h1 className="col-span-full text-center text-red-400">
                Something went wrong! Please check your connection and try
                again.
            </h1>
        );

    return (
        <main className="w-screen">
            <Suspense fallback={<Spinner />}>
                <div className="px-6 pt-4 w-full h-full">
                    <MainMediaUL
                        items={watchlistData.results}
                        mediaType={media}
                        storageKey=""
                    />
                </div>
            </Suspense>
        </main>
    );
}
