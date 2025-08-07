"use server";

import MainLcList from "@/app/_components/media/MainLcList";
import MediaTitle from "@/app/_components/media/MediaTitle";
import { ListKind } from "@/app/_lib/tmdb";
import { Separator } from "@radix-ui/react-separator";
import { Movie } from "../../_components/media/OptimizedMovieImg";
import { Suspense } from "react";
import Spinner from "@/app/_components/ui/Spinner";

interface Props {
    initialItems: Movie[];
    media: "movie" | "tv";
    list: ListKind;
    apiPath: string;
}

export default async function ListView({
    initialItems,
    media,
    list,
    apiPath,
}: Props) {
    return (
        <div className="px-6 pt-4 ">
            <MediaTitle
                title={`${media === "movie" ? "Movies" : "TV Shows"} - ${list
                    .replace("_", " - ")
                    .replace(/\b\w/g, (c: string) => c.toUpperCase())}`}
            />

            <Separator className="my-4 bg-red-500/20 md:hidden " />
            <Suspense fallback={<Spinner />}>
                <MainLcList
                    initialItems={initialItems}
                    apiPath={apiPath}
                    mediaType={media}
                />
            </Suspense>
        </div>
    );
}
