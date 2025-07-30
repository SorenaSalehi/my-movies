"use client";
import { useData } from "../_context/DataProvider";
import { largeTitleConverter } from "../_lib/helpers";
import { Movie } from "./OptimizedMovieImg";

interface Props {
    movie: Movie;
}

export default function ItemDetails({ movie }: Props) {
    console.log("movie", movie);
    const { genresMap } = useData();
    console.log("genresMap", genresMap);
    const genres = movie.genre_ids.map((id) => genresMap[id]).slice(0, 3);
    console.log("genres", genres);
    return (
        <div className="bottom-0 absolute  transition-all duration-300 ease-in-out   inset-x-0 flex flex-col gap-2 bg-red-500 p-4 h-40 translate-y-full rounded-xl opacity-0 lg:group-hover:translate-y-0 lg:group-hover:opacity-100 text-center">
            <h1 className="justify-self-center text-center text-sm col-start-1 row-start-1 font-bold md:text-xl">
                {largeTitleConverter(movie?.title) ||
                    largeTitleConverter(movie?.name)}
            </h1>
            <p className=" text-amber-200 flex  justify-center">
                {genres.map((genre, i) => (
                    <span
                        key={i}
                        className="border-[.02rem] text-nowrap border-gray-50/50 rounded-xl p-1 text-[.6rem]"
                    >
                        {genre}
                    </span>
                ))}
            </p>
            <h6 className=" text-gray-300">
                Released: {movie?.release_date?.split("-")[0]}
            </h6>
        </div>
    );
}
