"use client";
import React, { useEffect, useRef, useState } from "react";
import { useSearchMulti } from "../_lib/useSearchMulti";
import { useRouter } from "next/navigation";
import { Popover, PopoverContent, PopoverTrigger } from "./ui/popover";
import { Button } from "./ui/button";
import {
    Command,
    CommandEmpty,
    CommandGroup,
    CommandInput,
    CommandItem,
    CommandList,
} from "./ui/command";
import { Film, Tv } from "lucide-react";
import OptimizedMovieImg from "./media/OptimizedMovieImg";
import { useSearchContext } from "../_context/SearchContext";
import SpinnerMini from "./ui/SpinnerMini";

export default function SearchInput() {
    const { query, setQuery } = useSearchContext();
    const [open, setOpen] = useState(false);
    const { results, isLoading } = useSearchMulti(query);
    const router = useRouter();
    const inputRef = useRef<HTMLInputElement>(null);

    useEffect(() => {
        if (open) inputRef.current?.focus();
    }, [open]);

    function handleClick() {
        setOpen(true);
        router.push("/search");
    }

    return (
        <Popover open={open} onOpenChange={setOpen}>
            {/* begin:: input button trigger */}
            <PopoverTrigger asChild>
                <Button
                    variant="outline"
                    role="combobox"
                    aria-expanded={open}
                    className=" text-center text-xl  "
                    onClick={handleClick}
                >
                    {query || "Search..."}
                </Button>
            </PopoverTrigger>
            {/* end:: input button trigger */}

            <PopoverContent className="w-75 p-0">
                <Command shouldFilter={false}>
                    {/* begin:: input */}
                    <CommandInput
                        ref={inputRef}
                        value={query}
                        onValueChange={(value) => {
                            if (!open) {
                                setOpen(true);
                                requestAnimationFrame(() =>
                                    inputRef.current?.focus()
                                );
                            }
                            setQuery(value);
                        }}
                        placeholder="Search for movie/series..."
                        className="h-10 text-md"
                    />
                    {/* end:: input */}

                    {/* begin:: lists */}
                    <CommandList key={query}>
                        {/* begin:: loader */}
                        {isLoading && <SpinnerMini />}
                        {/* end:: loader */}

                        {/* begin:: no results */}
                        {!isLoading && results.length === 0 && (
                            <CommandEmpty>No Results.</CommandEmpty>
                        )}
                        {/* end:: no results */}

                        {/* begin:: movies list */}
                        <CommandGroup
                            heading={query.trim().length > 0 ? "Movies" : ""}
                        >
                            {results
                                .filter((i) => i.media_type === "movie")
                                .map((movie) => (
                                    <CommandItem
                                        key={"m" + movie.id}
                                        onSelect={() => {
                                            router.push(`/movie/${movie.id}`);
                                            setOpen(false);
                                        }}
                                        className="flex items-center justify-start"
                                    >
                                        <Film className="mr-2" /> {movie.title}
                                        <div className="h-[3rem] w-[3rem] ml-auto">
                                            <OptimizedMovieImg
                                                movie={movie}
                                                isHero={false}
                                            />
                                        </div>
                                    </CommandItem>
                                ))}
                        </CommandGroup>
                        {/* end:: movies list */}

                        {/* begin:: series list */}
                        <CommandGroup
                            heading={query.trim().length > 0 ? "TV Shows" : ""}
                        >
                            {results
                                .filter((i) => i.media_type === "tv")
                                .map((tv) => (
                                    <CommandItem
                                        key={"t" + tv.id}
                                        onSelect={() => {
                                            router.push(`/tv/${tv.id}`);
                                            setOpen(false);
                                        }}
                                        className="flex items-center justify-start"
                                    >
                                        <Tv className="mr-2" /> {tv.name}
                                        <div className="h-[3rem] w-[3rem] ml-auto">
                                            <OptimizedMovieImg
                                                movie={tv}
                                                isHero={false}
                                            />
                                        </div>
                                    </CommandItem>
                                ))}
                        </CommandGroup>
                        {/* end:: movies list */}
                    </CommandList>
                    {/* end:: lists */}
                </Command>
            </PopoverContent>
        </Popover>
    );
}
