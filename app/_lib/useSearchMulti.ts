"use client";
import { useQuery } from "@tanstack/react-query";
import { MovieDetails } from "../_types/tmdbTypes";
import { useDebouncedValue } from "../_hooks/useDebouncedValue";
interface SearchMultiResult extends MovieDetails {
    media_type: "movie" | "tv";
}
export function useSearchMulti(query: string) {
    const q = useDebouncedValue(query?.trim(), 400);
    const {
        data: results = [],
        isLoading,
        isError,
    } = useQuery<SearchMultiResult[], Error>({
        queryKey: ["search-multi", q],
        queryFn: async ({ signal }) => {
            const res = await fetch(`/api/tmdb/search/multi?query=${q}`, {
                signal,
            });
            return res.ok ? res.json() : [];
        },
        enabled: q.trim().length > 0,
        staleTime: 60_000,
        gcTime: 300_000,
    });
    return { results, isLoading, isError };
}
