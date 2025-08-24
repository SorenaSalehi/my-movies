"use client";
import MainMediaUL from "./MainMediaUL";
import { useData } from "../../_context/DataProvider";
import { MovieDetails } from "@/app/_types/tmdbTypes";
import useInfiniteList from "@/app/_hooks/useInfiniteList";
import useScrollRestore from "@/app/_hooks/useScrollRestoration";

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
    const { genresMap } = useData();
    const {
        items,
        loaderRef,
        isLoading,
        isFetchingNextPage,
        hasNextPage,
        fetchNextPage,
    } = useInfiniteList({ apiPath, initialItems, genresMap });
    const storageKey = `scroll:${apiPath || "root"}`;
    useScrollRestore({
        storageKey,
        containerId: "main_app_container",
        hasNextPage,
        fetchNextPage: async () => {
            await fetchNextPage();
        },
    });

    return (
        <MainMediaUL
            items={items}
            isLoading={isLoading || isFetchingNextPage}
            loaderRef={loaderRef}
            mediaType={mediaType}
            storageKey={storageKey}
        />
    );
}
