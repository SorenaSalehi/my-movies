"use client";
import {
    Drawer,
    DrawerContent,
    DrawerTrigger,
} from "@/app/_components/ui/drawer";
import { Film, Search, Tv } from "lucide-react";
import {
    Command,
    CommandEmpty,
    CommandGroup,
    CommandInput,
    CommandItem,
    CommandList,
} from "./ui/command";
import { useRef, useState } from "react";
import { useSearchContext } from "../_context/SearchContext";
import SpinnerMini from "./SpinnerMini";
import { useSearchMulti } from "../_lib/useSearchMulti";
import { useRouter } from "next/navigation";
import OptimizedMovieImg from "./OptimizedMovieImg";

export default function MobileSearch() {
    const { query, setQuery } = useSearchContext();
    const { results, isLoading } = useSearchMulti(query);
    const [open, setOpen] = useState(false);
    const inputRef = useRef<HTMLInputElement>(null);
    const router = useRouter();

    return (
        <Drawer>
            <DrawerTrigger>
                <Search />
            </DrawerTrigger>
            <DrawerContent>
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
                        autoFocus
                        placeholder="Search for movie/series..."
                        className="h-10 text-md"
                    />
                    <CommandList key={query} className="px-4">
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
            </DrawerContent>
        </Drawer>
    );
}
