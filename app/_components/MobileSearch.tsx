// MobileSearch.tsx
"use client";
import {
    Drawer,
    DrawerContent,
    DrawerDescription,
    DrawerTitle,
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
import { useEffect, useRef, useState } from "react";
import { useSearchContext } from "../_context/SearchContext";
import SpinnerMini from "./ui/SpinnerMini";
import { useSearchMulti } from "../_lib/useSearchMulti";
import { useRouter } from "next/navigation";
import OptimizedMovieImg from "./media/OptimizedMovieImg";

type MobileSearchProps = {
    onOpenChange?: (open: boolean) => void;
    /** اگر بخوای تریگر سفارشی بدی (مثلاً دکمه‌ی نوار پایین) */
    children?: React.ReactNode;
};

export default function MobileSearch({
    onOpenChange,
    children,
}: MobileSearchProps) {
    const { query, setQuery } = useSearchContext();
    const { results, isLoading } = useSearchMulti(query);
    const [open, setOpen] = useState(false);
    const inputRef = useRef<HTMLInputElement>(null);
    const router = useRouter();

    function handleSelect(path: string) {
        setOpen(false);
        setTimeout(() => router.push(path), 150);
    }

    useEffect(() => {
        if (open) requestAnimationFrame(() => inputRef.current?.focus());
    }, [open]);

    return (
        <Drawer
            open={open}
            onOpenChange={(o) => {
                setOpen(o);
                onOpenChange?.(o);
            }}
        >
            {/* تریگر سفارشی از بیرون */}
            <DrawerTrigger asChild>
                {children ?? (
                    <button
                        type="button"
                        className="grid place-items-center w-12 h-12"
                    >
                        <Search />
                    </button>
                )}
            </DrawerTrigger>

            <DrawerTitle className="hidden">Search Movie/Series...</DrawerTitle>
            <DrawerDescription className="hidden">
                my movie search drawer, it open from bottom and user will search
                movie/series to find it.
            </DrawerDescription>

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
                                        value={movie.title || ""}
                                        onSelect={() =>
                                            handleSelect(`/movie/${movie.id}`)
                                        }
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
                                        onSelect={() =>
                                            handleSelect(`/tv/${tv.id}`)
                                        }
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
