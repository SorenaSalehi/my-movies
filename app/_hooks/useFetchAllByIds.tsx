import { useQuery } from "@tanstack/react-query";
import React from "react";
import { fetchAllById } from "../_lib/tmdb";

interface Props {
    ids: number[];
    media: "movie" | "tv";
}
export function useFetchAllByIds({ ids, media }: Props) {
    const {
        data: watchlistData = [],
        isFetching,
        isError,
    } = useQuery({
        queryKey: [ids],
        queryFn: () => fetchAllById(ids, media),
    });

    return { watchlistData, isFetching, isError };
}
