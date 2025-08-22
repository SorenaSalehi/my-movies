"use client";
import { MovieDetails } from "@/app/_types/tmdbTypes";
import { useMemo } from "react";
import { GenreMap } from "@/app/_types/dataProvTypes";
import { savedGenres } from "@/app/_lib/genres";

interface Props {
    movie: MovieDetails;
}

export default function ItemDetails({ movie }: Props) {
    const genresMap = useMemo<GenreMap>(
        () => Object.fromEntries(savedGenres.map((g) => [g.id, g.name])),
        []
    );

    const genresIds =
        movie?.genre_ids?.map((id) => genresMap[id]).slice(0, 3) || [];
    const genresArray = movie?.genres;
    return (
        <div className="bottom-0 absolute  transition-all duration-300 ease-in-out   inset-x-0 flex flex-col gap-2 bg-red-800/95 p-4 h-40 translate-y-full rounded-xl opacity-0 lg:group-hover:translate-y-0 lg:group-hover:opacity-100 text-center">
            <p className=" text-amber-200 flex flex-wrap justify-center">
                {genresIds &&
                    genresIds?.map((genre, i) => (
                        <span key={i} className="text-nowrap text-xs">
                            {genre === "Science Fiction" ? "Sci-Fi." : genre}{" "}
                            {i + 1 < genresIds?.length && ", "}
                        </span>
                    ))}
                {genresArray &&
                    genresArray?.map((genre, i) => (
                        <span
                            key={i}
                            className="border-[.02rem] text-nowrap border-gray-50/50 rounded-xl p-1 text-[.6rem]"
                        >
                            {genre.name}
                        </span>
                    ))}
            </p>
            {movie?.release_date && (
                <h6 className=" text-gray-300">
                    Released: {movie?.release_date?.split("-")[0]}
                </h6>
            )}
            {movie?.first_air_date && (
                <h6 className=" text-gray-300">
                    First Air Date: {movie?.first_air_date?.split("-")[0]}
                </h6>
            )}{" "}
            {movie?.original_language && (
                <h6 className=" text-gray-300">
                    Language: {movie?.original_language}
                </h6>
            )}
        </div>
    );
}
