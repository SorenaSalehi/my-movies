"use client";
import { useEffect, useRef, useState } from "react";
import MainLcItems from "./MainLcItems";
import { Movie } from "./OptimizedMovieImg";

type Props = {
    initialItems: Movie[];
    apiPath: string;
};

export default function MainLcList({ initialItems, apiPath }: Props) {
    const [items, setItems] = useState(initialItems);
    const pageRef = useRef(1);
    const isLoading = useRef(false);
    const loaderRef = useRef<HTMLLIElement>(null);
    async function loadMoreItems() {
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
        } catch (err: any) {
            console.log(err);
        } finally {
            isLoading.current = false;
        }
    }

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
    }, [apiPath]);

    return (
        <ul className="hidden gap-4 md:grid xl:grid-cols-7 px-6 md:px-12 lg:grid-cols-4 md:grid-cols-4 pt-4 ">
            {items.map((m) => (
                <li key={m.id}>
                    <MainLcItems movie={m} />
                </li>
            ))}
            <li ref={loaderRef} className="h-10 w-full" />
        </ul>
    );
}
