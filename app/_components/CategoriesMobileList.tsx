import {
    Tabs,
    TabsContent,
    TabsList,
    TabsTrigger,
} from "@/app/_components/ui/tabs";
import { Genre } from "../_types/dataProvTypes";

import Link from "next/link";

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

    return (
        <Tabs
            defaultValue="movies"
            style={{ minHeight: "65dvh" }}
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
                {movieGenresList.map((m, i) => (
                    <Link
                        href={m.href}
                        key={i}
                        className={`text-center bg-primary-foreground px-2 py-1 rounded-xl border-b-2 font-bold ${
                            i % 2 === 0
                                ? "border-red-500/50"
                                : "border-amber-500/50"
                        }`}
                    >
                        {m.title}
                    </Link>
                ))}
            </TabsContent>
            {/* end::movies categories */}

            {/* begin::TV shows categories */}
            <TabsContent
                value="tv-shows"
                className="grid grid-cols-2 gap-x-4 gap-y-2 mb-4 md:grid-cols-3"
            >
                {tvGenresList.map((m, i) => (
                    <Link
                        href={m.href}
                        key={i}
                        className={`text-center bg-primary-foreground px-2 py-1 rounded-xl border-b-2 font-bold ${
                            i % 2 === 0
                                ? "border-red-500/50"
                                : "border-amber-500/50"
                        }`}
                    >
                        {m.title}
                    </Link>
                ))}
            </TabsContent>
            {/* end::TV shows categories */}
        </Tabs>
    );
}
