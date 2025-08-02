"use client";

import { useState } from "react";
import { Genre } from "../_types/dataProvTypes";

import { Button } from "./ui/button";
import Link from "next/link";

interface Props {
    movieGenres: Genre[];
    tvGenres: Genre[];
}
export default function CategoriesMobileList({ movieGenres, tvGenres }: Props) {
    const [selectList, setSelectList] = useState("movies");
    const movieGenresList = movieGenres.map((genre) => ({
        title: genre.name,
        href: `/movie/genre/${genre.id}`,
    }));
    const tvGenresList = tvGenres.map((genre) => ({
        title: genre.name,
        href: `/tv/genre/${genre.id}`,
    }));

    function handleSelect() {}
    return (
        <div className="flex flex-col justify-center items-center gap-4">
            <div className="flex justify-center items-center">
                <Button value={"tv"}>Tv Shows</Button>
                <Button value={"movies"}>movies</Button>
            </div>
            <div className="grid grid-cols-2 gap-x-4 gap-y-2">
                {selectList === "movies" &&
                    movieGenresList.map((m, i) => (
                        <Link
                            href={m.href}
                            key={i}
                            className={`text-center bg-primary-foreground px-2 py-1 rounded-xl border-b-2 ${
                                i % 2 === 0
                                    ? "border-red-500/50"
                                    : "border-amber-500/50"
                            }`}
                        >
                            {m.title}
                        </Link>
                    ))}{" "}
                {selectList === "tv" &&
                    tvGenresList.map((m, i) => (
                        <Link
                            href={m.href}
                            key={i}
                            className={`text-center bg-primary-foreground px-2 py-1 rounded-xl border-b-2 ${
                                i % 2 === 0
                                    ? "border-red-500/50"
                                    : "border-amber-500/50"
                            }`}
                        >
                            {m.title}
                        </Link>
                    ))}
            </div>
        </div>
    );
}
