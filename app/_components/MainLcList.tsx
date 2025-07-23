"use client";
import { useCallback, useEffect, useRef, useState } from "react";
import MainLcItems from "./MainLcItems";
import { Movie } from "./OptimizedMovieImg";
import { largeTitleConverter } from "../_lib/helpers";

type Props = {
    initialItems: Movie[];
    apiPath: string;
};

export default function MainLcList({ initialItems, apiPath }: Props) {
    const [items, setItems] = useState(initialItems);
    const pageRef = useRef(1);
    const isLoading = useRef(false);
    const loaderRef = useRef<HTMLLIElement>(null);

    const loadMoreItems = useCallback(async () => {
        if (isLoading.current) return;
        isLoading.current = true;

        const nextPage = pageRef.current + 1;
        console.log("loading next page", nextPage);
        try {
            const res = await fetch(`${apiPath}?page=${nextPage}`);
            if (!res.ok) throw new Error("Failed to load more items");

            const data: Movie[] = await res.json();
            setItems((prev) => [...prev, ...data]);
            pageRef.current = nextPage;
        } catch (err: unknown) {
            console.log(err);
        } finally {
            isLoading.current = false;
        }
    }, [apiPath]);

    useEffect(() => {
        const observe = new IntersectionObserver(
            (entries) => {
                if (entries[0].isIntersecting) {
                    loadMoreItems();
                }
            },
            { root: null, rootMargin: "100px", threshold: 0 }
        );

        const el = loaderRef.current;
        if (el) observe.observe(el);

        return () => {
            observe.disconnect();
        };
    }, [apiPath, loadMoreItems]);

    return (
        <ul
            className={`grid-cols-2 gap-2 w-full md:gap-4 grid xl:grid-cols-7 px-6 md:px-12 lg:grid-cols-4 md:grid-cols-4 pt-4 `}
        >
            {items.map((m) => (
                <li key={m.id}>
                    <MainLcItems movie={m} />
                    <h1 className="text-center text-base md:hidden">
                        {largeTitleConverter(m?.title || m?.name)}
                    </h1>
                </li>
            ))}
            <li ref={loaderRef} className="h-10 w-full" />
        </ul>
    );
}
