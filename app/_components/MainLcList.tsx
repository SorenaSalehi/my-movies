"use client";
import { useCallback, useEffect, useRef, useState } from "react";
import MainLcItems from "./MainLcItems";
import { Movie } from "./OptimizedMovieImg";
import { largeTitleConverter } from "../_lib/helpers";
import Spinner from "./Spinner";
import Link from "next/link";
import MainMediaUL from "./MainMediaUL";

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
    const [items, setItems] = useState(initialItems);
    const [isLoading, setIsLoading] = useState(false);
    const pageRef = useRef(1);
    const loaderRef = useRef<HTMLLIElement | null>(null);

    const loadMoreItems = useCallback(async () => {
        if (isLoading) return;
        setIsLoading(true);

        const nextPage = pageRef.current + 1;
        try {
            const res = await fetch(`${apiPath}?page=${nextPage}`);
            if (!res.ok) throw new Error("Failed to load more items");

            const data: Movie[] = await res.json();
            setItems((prev) => {
                const map = new Map<number, Movie>();

                prev.forEach((m) => map.set(m.id, m));

                data.forEach((m) => {
                    if (!map.has(m.id)) {
                        map.set(m.id, m);
                    }
                });

                return Array.from(map.values());
            });
            pageRef.current = nextPage;
        } catch (err: unknown) {
        } finally {
            setIsLoading(false);
        }
    }, [apiPath]);

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
    console.log("apiPath", apiPath.split("/"));
    return (
        <MainMediaUL
            items={items}
            isLoading={isLoading}
            loaderRef={loaderRef}
            mediaType={mediaType}
        />
    );
}
