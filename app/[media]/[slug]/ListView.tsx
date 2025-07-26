"use server";

import MainLcList from "@/app/_components/MainLcList";
import MediaTitle from "@/app/_components/MediaTitle";
import { ListKind } from "@/app/_lib/tmdb";
import { Separator } from "@radix-ui/react-separator";
import { Movie } from "../../_components/OptimizedMovieImg";

interface Props {
    initialItems: Movie[];
    media: "movie" | "tv";
    list: ListKind;
}

export default async function ListView({ initialItems, media, list }: Props) {
    const apiPath = `/api/tmdb/${media}/${list}`;

    return (
        <div className="px-6 pt-4 w-full">
            <MediaTitle
                title={`${media === "movie" ? "Movies" : "TV Shows"} - ${list
                    .replace("_", "")
                    .replace(/\b\w/g, (c: string) => c.toUpperCase())}`}
            />

            <Separator className="my-4 bg-red-500/20 md:hidden " />
            <MainLcList
                initialItems={initialItems}
                apiPath={apiPath}
                mediaType={media}
            />
        </div>
    );
}
