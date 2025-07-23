"use server";

import MainLcList from "@/app/_components/MainLcList";
import MediaTitle from "@/app/_components/MediaTitle";
import { fetchList } from "@/app/_lib/tmdb";
import { Separator } from "@radix-ui/react-separator";

interface Props {
    params: Promise<{
        media: "movie" | "tv";
        list: "popular" | "top_rated" | "now_playing";
    }>;
}

export default async function Page({ params }: Props) {
    const paramsPromise = await params;
    const { media, list } = paramsPromise;

    const initialItems = await fetchList(media, list, 1);
    const apiPath = `/api/tmdb/${media}/${list}`;

    return (
        <div className="px-6 pt-4 w-full">
            <MediaTitle
                title={`${media === "movie" ? "Movies" : "TV Shows"} - ${list
                    .replace("_", "")
                    .replace(/\b\w/g, (c) => c.toUpperCase())}`}
            />

            <Separator className="my-4 bg-red-500/20 md:hidden " />
            <MainLcList initialItems={initialItems} apiPath={apiPath} />
        </div>
    );
}
