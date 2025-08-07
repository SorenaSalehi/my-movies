"use client";

import Spinner from "@/app/_components/ui/Spinner";
import { useFetchAllByIds } from "@/app/_hooks/useFetchAllByIds";

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
    if (isError)
        return (
            <h1>
                Something went wrong! Please check your connection and try
                again.
            </h1>
        );
    console.log("watchlistData", watchlistData);
    return <div>MediaList</div>;
}
