import {
    Tabs,
    TabsContent,
    TabsList,
    TabsTrigger,
} from "@/app/_components/ui/tabs";
import { Genre } from "../_types/dataProvTypes";

import Link from "next/link";
import Image from "next/image";

interface Props {
    movieGenres: Genre[];
    tvGenres: Genre[];
}
export default function CategoriesMobileList({ movieGenres, tvGenres }: Props) {
    const movieGenresList = movieGenres.map((genre) => ({
        title: genre.name,
        href: `/movie/genre/${genre.id}`,
    }));
    const tvGenresList = tvGenres.map((genre) => ({
        title: genre.name,
        href: `/tv/genre/${genre.id}`,
    }));
    const movieFilters = ["Romance", "TV Movie"];
    const tvFilters = ["News", "Soap", "War & Politics"];

    return (
        <Tabs
            defaultValue="movies"
            className="flex flex-col justify-center  items-center gap-4 my-4"
        >
            <TabsList className="my-4">
                <TabsTrigger value="tv-shows">TV Shows</TabsTrigger>
                <TabsTrigger value="movies">Movies</TabsTrigger>
            </TabsList>

            {/* begin::movies categories */}
            <TabsContent
                value="movies"
                className="grid grid-cols-2 gap-x-4 gap-y-2 mb-4 md:grid-cols-3"
            >
                {movieGenresList.map((m, i) => {
                    if (movieFilters.includes(m.title)) return;
                    return (
                        <Link
                            href={m.href}
                            key={i}
                            className="relative w-40 h-50 rounded-xl overflow-hidden"
                        >
                            <Image
                                src={`/${m.title}.jpg`}
                                alt={`${m.title} movie image for displaying to my movies web app categories.`}
                                fill
                                className="absolute w-full h-full brightness-80"
                            />
                            <div
                                className={`text-center bg-primary-foreground/80 px-2 py-1 rounded-xl border-b-2 font-bold  absolute w-full bottom-0 text-lime-500 h-15`}
                            >
                                {m.title}
                            </div>
                        </Link>
                    );
                })}
            </TabsContent>
            {/* end::movies categories */}

            {/* begin::TV shows categories */}
            <TabsContent
                value="tv-shows"
                className="grid grid-cols-2 gap-x-4 gap-y-2 mb-4 md:grid-cols-3"
            >
                {tvGenresList.map((m, i) => {
                    if (tvFilters.includes(m.title)) return;
                    return (
                        <Link
                            href={m.href}
                            key={i}
                            className="relative w-40 h-50 rounded-xl overflow-hidden"
                        >
                            <Image
                                src={`/${m.title}-tv.jpg`}
                                alt={`${m.title} movie image for displaying to my movies web app categories.`}
                                fill
                                className="absolute w-full h-full brightness-80"
                            />
                            <div
                                className={`text-center bg-primary-foreground/80 px-2 py-1 rounded-xl border-b-2 font-bold absolute w-full bottom-0 text-lime-500 h-15`}
                            >
                                {m.title}
                            </div>
                        </Link>
                    );
                })}
            </TabsContent>
            {/* end::TV shows categories */}
        </Tabs>
    );
}
