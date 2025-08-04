import { RefObject, useCallback, useEffect } from "react";

interface Args {
    loaderRef: RefObject<HTMLElement | null>;
    fetchMore: () => void;
    canFetchMore: boolean;
    isFetching: boolean;
}

export default function useLoadMoreOnScroll({
    loaderRef,
    fetchMore,
    canFetchMore,
    isFetching,
}: Args) {
    const observerCallback = useCallback(
        (entries: IntersectionObserverEntry[]) => {
            if (entries[0].isIntersecting && canFetchMore && !isFetching) {
                fetchMore();
            }
        },
        [fetchMore, canFetchMore, isFetching]
    );

    useEffect(() => {
        const observe = new IntersectionObserver(observerCallback, {
            root: null,
            rootMargin: "200px",
            threshold: 0,
        });
        const el = loaderRef.current;
        if (el) observe.observe(el);
        return () => {
            observe.disconnect();
        };
    }, [observerCallback, loaderRef]);
}
