import { useInfiniteQuery } from "@tanstack/react-query";
import { fetchList, MovieApiResponse } from "../_lib/tmdb";

interface Params {
    media: "movie" | "tv";
    list: string;
}

export default function useInfiniteList({ media, list }: Params) {
    const queryKey = [media, list];
    const {
        data: items = [],
        fetchNextPage,
        hasNextPage,
        isFetchingNextPage,
        isLoading,
        isError,
        error,
    } = useInfiniteQuery<MovieApiResponse, Error>({
        queryKey,
        queryFn: () => fetchList(media, list),
        initialPageParam: 1,
        getNextPageParam: (lastPage) => {
            if (lastPage.page < lastPage.total_pages) return lastPage.page + 1;
            return undefined;
        },
        staleTime: 86400,
        gcTime: 86400,
    });
    return {
        items,
        fetchNextPage,
        hasNextPage,
        isFetchingNextPage,
        isLoading,
        isError,
        error,
    };
}
