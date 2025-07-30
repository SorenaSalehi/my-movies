"use client";
import { useQuery } from "@tanstack/react-query";
import { MovieDetails } from "../_types/tmdbTypes";
interface SearchMultiResult extends MovieDetails {
    media_type: "movie" | "tv";
}
export function useSearchMulti(query: string) {
    const {
        data: results = [],
        isLoading,
        isError,
    } = useQuery<SearchMultiResult[], Error>({
        queryKey: ["search-multi", query],
        queryFn: async () => {
            const res = await fetch(`/api/tmdb/search/multi?query=${query}`);
            return res.ok ? res.json() : [];
        },
        enabled: query.trim().length > 0,
        staleTime: 60_000,
        gcTime: 300_000,
    });
    return { results, isLoading, isError };
}
