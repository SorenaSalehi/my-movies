"use client";
import { Movie } from "./OptimizedMovieImg";

interface Props {
    movie: Movie;
}

export default function ItemDetails({ movie }: Props) {
    // const { genresMap } = useData();
    return (
        <>
            <p className="top-0 right-0 absolute bg-amber-300 shadow-2xl p-1 rounded-md max-w-max font-bold text-gray-900">
                IMDb : {movie.vote_average?.toFixed(1)}
            </p>
            <div className="bottom-0 absolute inset-x-0 flex flex-col gap-2 bg-red-500 p-4 h-30">
                <h1 className="justify-self-center col-start-1 row-start-1 font-bold text-2xl">
                    {movie.title}
                </h1>
            </div>
        </>
    );
}
