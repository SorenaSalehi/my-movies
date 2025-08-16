import { useQuery } from "@tanstack/react-query";
import { useMemo } from "react";

interface Props {
    ids: number[];
    media: "movie" | "tv";
}

export function useFetchAllByIds({ ids, media }: Props) {
    const keyIds = useMemo<number[]>(() => {
        return [...(ids ?? [])].sort((a, b) => a - b);
    }, [ids]);

    const {
        data: watchlistData = [],
        isFetching,
        isError,
    } = useQuery({
        queryKey: [ids, "watchlist", media],
        enabled: keyIds.length > 0,
        staleTime: 86400,
        retry: 1,
        queryFn: async () => {
            const qs = new URLSearchParams({ ids: keyIds.join(",") });
            const res = await fetch(
                `/api/tmdb/watchlist/${media}?${qs.toString()}`,
                { next: { revalidate: 86400 } }
            );
            if (!res.ok) throw new Error(`Fetch failed: ${res.status}`);
            return res.json();
        },
    });

    return { watchlistData, isFetching, isError };
}
