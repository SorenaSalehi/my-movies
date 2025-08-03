"use client";

import { useSearchContext } from "@/app/_context/SearchContext";
import { useSearchMulti } from "@/app/_lib/useSearchMulti";
import Link from "next/link";
import OptimizedMovieImg from "./OptimizedMovieImg";
import Spinner from "./Spinner";

export default function SearchResultsList() {
    const { query } = useSearchContext();
    const { results, isLoading } = useSearchMulti(query);

    if (query.trim() === "") return <h1>Search for movie / series...</h1>;
    if (isLoading) return <Spinner />;
    if (results.length === 0) return <p className="p-4">No results.</p>;

    return (
        <div className="px-6 py-4 grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4 ">
            {results.map((item) => (
                <Link
                    key={`${item.media_type}-${item.id}`}
                    href={`/${item.media_type}/${item.id}`}
                    className="block shadow-sm  border rounded-xl text-card-foreground p-1 max-w-[200px] min-w-[150px]  h-[240px]  w-full overflow-clip"
                >
                    <div className="aspect-square overflow-hidden rounded-lg">
                        <OptimizedMovieImg movie={item} isHero={false} />
                    </div>
                    <h3 className="mt-2 text-center text-sm">
                        {item.media_type === "movie" ? item.title : item.name}
                    </h3>
                </Link>
            ))}
        </div>
    );
}
