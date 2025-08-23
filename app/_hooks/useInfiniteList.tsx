"use client";
import { useInfiniteQuery } from "@tanstack/react-query";
import { MovieDetails } from "../_types/tmdbTypes";
import { useEffect, useMemo, useRef } from "react";

type PageResponse = {
    page?: number;
    results: MovieDetails[];
    total_pages?: number;
    total_results?: number;
};

type UseInfiniteMediaParams = {
    /** Base API path without the page param, e.g. '/api/movies/popular' */
    apiPath: string;
    /** Items you already have from SSR or first render */
    initialItems?: MovieDetails[];
    /** Map of genre_id -> genre_name (comes from your DataProvider) */
    genresMap: Record<number, string>;
    /** Optionally exclude genres by name (case-sensitive) */
    excludeGenres?: string[];
    /** IntersectionObserver rootMargin for earlier prefetch */
    loaderMargin?: string;
};

export default function useInfiniteList({
    apiPath,
    initialItems = [],
    genresMap,
    excludeGenres = ["Romance"],
    loaderMargin = "200px",
}: UseInfiniteMediaParams) {
    const loaderRef = useRef<HTMLLIElement | null>(null);

    const {
        data,
        isLoading,
        isFetching,
        isFetchingNextPage,
        hasNextPage,
        fetchNextPage,
        refetch,
        error,
    } = useInfiniteQuery<PageResponse, Error>({
        queryKey: ["media", apiPath],
        queryFn: async ({ pageParam = 1 }) => {
            const res = await fetch(`${apiPath}?page=${pageParam}`, {
                cache: "no-store",
            });
            if (!res.ok) throw new Error("Failed to fetch items");
            return res.json();
        },
        getNextPageParam: (lastPage) => {
            const current = lastPage.page ?? 1;
            // If server returns total_pages, stop at the end
            if (lastPage.total_pages && current >= lastPage.total_pages)
                return undefined;
            // If this page is empty, stop
            if (!lastPage.results || lastPage.results.length === 0)
                return undefined;
            // Otherwise just go next
            return current + 1;
        },
        //make page 1 = your initialItems to avoid a duplicate first fetch
        initialPageParam: 1,
        initialData: {
            pages: [{ page: 1, results: initialItems }],
            pageParams: [1],
        },
        //optional
        staleTime: 60_000,
        refetchOnMount: false,
        refetchOnWindowFocus: false,
    });
    // --- Flatten, dedupe by id, then filter out unwanted genres ---
    const items = useMemo(() => {
        // 1) Deduplicate by movie id across all loaded pages
        const map = new Map<number, MovieDetails>();
        for (const page of data?.pages ?? []) {
            for (const m of page.results ?? []) {
                if (!map.has(m.id)) {
                    map.set(m.id, m);
                }
            }
        }

        const merged = Array.from(map.values());

        // 2) Filter by genres if needed (exclude any item that contains an excluded genre)
        if (!excludeGenres?.length) return merged;
        return merged.filter((m) => {
            const names = m.genre_ids?.map((id) => genresMap[id]) ?? [];
            return !names.some((g) => g && excludeGenres.includes(g));
        });
    }, [data?.pages, genresMap, excludeGenres]);

    // --- IntersectionObserver: trigger fetchNextPage() when loaderRef is visible ---
    useEffect(() => {
        const el = loaderRef.current;
        if (!el) return;

        const observer = new IntersectionObserver(
            (entries) => {
                if (entries[0].isIntersecting && hasNextPage) {
                    //this will fetch the next page
                    fetchNextPage();
                }
            },
            { root: null, rootMargin: loaderMargin, threshold: 0 }
        );
        observer.observe(el);
        return () => observer.disconnect();
    }, [hasNextPage, fetchNextPage, loaderMargin]);

    return {
        items,
        loaderRef,
        isLoading,
        isFetching,
        isFetchingNextPage,
        hasNextPage,
        fetchNextPage,
        refetch,
        error,
    };
}
