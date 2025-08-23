"use client";
import MainMediaUL from "./MainMediaUL";
import { useData } from "../../_context/DataProvider";
import useScrollRestoration from "../../_hooks/useScrollRestoration";
import { MovieDetails } from "@/app/_types/tmdbTypes";
import useInfiniteList from "@/app/_hooks/useInfiniteList";

type Props = {
    initialItems: MovieDetails[];
    apiPath: string;
    mediaType: string;
};

export default function MainLcList({
    initialItems,
    apiPath,
    mediaType,
}: Props) {
    useScrollRestoration();
    const { genresMap } = useData();
    const { items, loaderRef, isLoading, isFetchingNextPage } = useInfiniteList(
        { apiPath, initialItems, genresMap }
    );

    return (
        <MainMediaUL
            items={items}
            isLoading={isLoading || isFetchingNextPage}
            loaderRef={loaderRef}
            mediaType={mediaType}
        />
    );
}
