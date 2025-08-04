"use client";
import { useCallback, useEffect, useRef, useState } from "react";
import { Movie } from "./OptimizedMovieImg";
import MainMediaUL from "./MainMediaUL";
import { useData } from "../_context/DataProvider";
import useScrollRestoration from "../_hooks/useScrollRestoration";

type Props = {
    initialItems: Movie[];
    apiPath: string;
    mediaType: string;
};

export default function MainLcList({
    initialItems,
    apiPath,
    mediaType,
}: Props) {
    useScrollRestoration();
    const { genresMap } = useData();
    const loaderRef = useRef<HTMLLIElement | null>(null);
    const [items, setItems] = useState(initialItems);
    const [isLoading, setIsLoading] = useState(false);
    const pageRef = useRef(1);

    const loadMoreItems = useCallback(async () => {
        if (isLoading) return;
        setIsLoading(true);

        const nextPage = pageRef.current + 1;
        try {
            const res = await fetch(`${apiPath}?page=${nextPage}`);
            if (!res.ok) throw new Error("Failed to load more items");

            const { results }: { results: Movie[] } = await res.json();
            setItems((prev) => {
                const map = new Map<number, Movie>();

                prev?.forEach((m) => map.set(m.id, m));

                results?.forEach((m) => {
                    if (!map.has(m.id)) {
                        map.set(m.id, m);
                    }
                });

                const mergedItems = Array.from(map?.values());
                const filteredItems = mergedItems?.filter(
                    (m) =>
                        !m.genre_ids
                            ?.map((id) => genresMap[id])
                            ?.includes("Romance")
                );
                return filteredItems;
            });
            pageRef.current = nextPage;
        } catch (err: unknown) {
            console.log("err", err);
        } finally {
            setIsLoading(false);
        }
    }, [apiPath, genresMap, isLoading]);

    useEffect(() => {
        const observe = new IntersectionObserver(
            (entries) => {
                if (entries[0].isIntersecting) {
                    loadMoreItems();
                }
            },
            { root: null, rootMargin: "200px", threshold: 0 }
        );

        const el = loaderRef.current;
        if (el) observe.observe(el);

        return () => {
            observe.disconnect();
        };
    }, [apiPath, loadMoreItems]);

    return (
        <MainMediaUL
            items={items}
            isLoading={isLoading}
            loaderRef={loaderRef}
            mediaType={mediaType}
        />
    );
}
