"use client";
import { useData } from "../_context/DataProvider";
import { Movie } from "./OptimizedMovieImg";

interface Props {
    movie: Movie;
}

export default function ItemDetails({ movie }: Props) {
    const { genresMap } = useData();
    const genres = movie.genre_ids.map((id) => genresMap[id]);
    return (
        <div className="bottom-0 absolute  transition-all duration-300 ease-in-out   inset-x-0 flex flex-col gap-2 bg-red-500 p-4 h-40 translate-y-full rounded-xl opacity-0 md:group-hover:translate-y-0 md:group-hover:opacity-100 ">
            <h1 className="justify-self-center col-start-1 row-start-1 font-bold text-2xl">
                {movie.title || movie.name}
            </h1>
            <h2 className=" text-amber-200 flex gap-2">
                {genres.map((genre) => (
                    <span key={genre}>{genre}</span>
                ))}
            </h2>
            <h6 className=" text-gray-300">
                {movie?.release_date?.split("-")[0]}
            </h6>
        </div>
    );
}
