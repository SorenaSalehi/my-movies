"use client";

import React, { useState } from "react";
import { MovieDetails } from "../../_types/tmdbTypes";

export type Movie = {
    id: number;
    title: string;
    name: string;
    backdrop_path: string | null;
    poster_path: string | null;
    vote_average?: number;
    genre_ids: number[];
    release_date: string;
};

type Props = {
    movie: Movie | MovieDetails;
    maxSize?: "w500" | "w780" | "w1280";
    isHero: boolean;
};

export default function OptimizedMovieImg({
    movie,
    maxSize = "w780",
    isHero,
}: Props) {
    const [blurOff, setBlurOff] = useState(false);

    const path = isHero ? movie.backdrop_path : movie.poster_path;
    if (!path) return null;

    const srcSet = `
    https://image.tmdb.org/t/p/w500${path} 500w,
    https://image.tmdb.org/t/p/w780${path} 780w,
    https://image.tmdb.org/t/p/w1280${path} 1280w
  `;

    return (
        <picture className="h-full w-full block ">
            {/* Largest size only for big screens */}
            {maxSize === "w1280" && (
                <source
                    media="(min-width: 1024px)"
                    srcSet={`https://image.tmdb.org/t/p/w1280${path}`}
                />
            )}
            {maxSize !== "w500" && (
                <source
                    media="(min-width: 640px)"
                    srcSet={`https://image.tmdb.org/t/p/w780${path}`}
                />
            )}

            {/* Fallback <img> with low-res blur placeholder */}
            <img
                src={
                    blurOff
                        ? `https://image.tmdb.org/t/p/${maxSize}${path}`
                        : `https://image.tmdb.org/t/p/w92${path}`
                }
                srcSet={srcSet}
                sizes="100vw"
                decoding="async"
                loading={"lazy"}
                fetchPriority={"auto"}
                alt={movie.title || movie.name}
                onLoad={() => setBlurOff(true)}
                className={
                    isHero
                        ? "object-cover w-[1080px] lg:w-[1380px] xl:w-[1680px] 2xl:w-[2080px] lg:h-screen"
                        : "object-cover w-full h-full transition-opacity"
                }
            />
        </picture>
    );
}
