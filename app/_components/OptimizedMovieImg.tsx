"use client";

import React, { useState } from "react";
import { MovieDetails } from "../_types/tmdbTypes";

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
    priority?: boolean;
    maxSize?: "w500" | "w780" | "w1280";
    isHero?: boolean;
};

export default function OptimizedMovieImg({
    movie,
    priority = false,
    maxSize = "w780",
    isHero = true,
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
                loading={priority ? "eager" : "lazy"}
                fetchPriority={priority ? "high" : "auto"}
                width={1280}
                height={720}
                alt={movie.title || movie.name}
                onLoad={() => setBlurOff(true)}
                className={`  object-cover ${
                    !isHero && "w-full h-full p-3 lg:p-6  object-contain "
                } `}
            />
        </picture>
    );
}
