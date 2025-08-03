"use client";
import React, { type ReactNode, useEffect, useRef, useState } from "react";
import { useSearchMulti } from "../_lib/useSearchMulti";
import { useRouter } from "next/navigation";
import { Popover, PopoverContent, PopoverTrigger } from "./ui/popover";
import {
    Command,
    CommandEmpty,
    CommandGroup,
    CommandInput,
    CommandItem,
    CommandList,
} from "./ui/command";
import { Film, Tv } from "lucide-react";
import OptimizedMovieImg from "./OptimizedMovieImg";
import { useSearchContext } from "../_context/SearchContext";
import SpinnerMini from "./SpinnerMini";

export default function SearchInputCopy({ children }: { children: ReactNode }) {
    const { query, setQuery } = useSearchContext();
    const [open, setOpen] = useState(false);
    const { results, isLoading } = useSearchMulti(query);
    const router = useRouter();
    const inputRef = useRef<HTMLInputElement>(null);

    useEffect(() => {
        if (open) inputRef.current?.focus();
    }, [open]);

    return (
        <Popover open={open} onOpenChange={setOpen}>
            <PopoverTrigger asChild>{children}</PopoverTrigger>
            <PopoverContent className="w-75 p-0">
                <Command shouldFilter={false}>
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
                    <CommandList key={query}>
                        {isLoading && <SpinnerMini />}
                        {!isLoading && results.length === 0 && (
                            <CommandEmpty>No Results.</CommandEmpty>
                        )}

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
                    </CommandList>
                </Command>
            </PopoverContent>
        </Popover>
    );
}
