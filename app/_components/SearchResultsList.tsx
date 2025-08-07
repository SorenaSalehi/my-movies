"use client";

import { useSearchContext } from "@/app/_context/SearchContext";
import { useSearchMulti } from "@/app/_lib/useSearchMulti";
import Link from "next/link";
import OptimizedMovieImg from "./media/OptimizedMovieImg";
import Spinner from "./ui/Spinner";
import MediaTitle from "./media/MediaTitle";

export default function SearchResultsList() {
    const { query } = useSearchContext();
    const { results, isLoading } = useSearchMulti(query);
    if (query.trim() === "") return <h1>Search for movie / series...</h1>;
    if (isLoading) return <Spinner />;
    if (results.length === 0) return <p className="p-4">No results.</p>;

    return (
        <div className="flex flex-col  gap-4 py-4">
            <MediaTitle title="Search Results:" className="col-span-2" />
            <div className="px-6 py-4 grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4 ">
                {results.map((item) => (
                    <Link
                        key={`${item.media_type}-${item.id}`}
                        href={`/${item.media_type}/${item.id}`}
                        className="block shadow-sm relative  border rounded-xl text-card-foreground aspect-[2/3]  overflow-hidden"
                    >
                        <p className="top-0 right-0 z-10 absolute bg-amber-300 shadow-2xl p-1 rounded-md max-w-max font-bold text-gray-900 text-xs md:text-sm">
                            IMDb : {item?.vote_average?.toFixed(1)}
                        </p>
                        <OptimizedMovieImg movie={item} isHero={false} />
                        <h1 className=" lg:hidden text-xs absolute bottom-0 left-0 bg-red-800 p-1 rounded-md text-gray-100  shadow-2xl">
                            {item?.title || item?.name}
                        </h1>
                    </Link>
                ))}
            </div>
        </div>
    );
}
