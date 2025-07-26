import { fetchList, fetchMediaDetails, ListKind } from "@/app/_lib/tmdb";
import ListView from "./ListView";
import MediaDetailsView from "./MediaDetailsView";

interface Props {
    params: Promise<{ media: "movie" | "tv"; slug: ListKind | string }>;
}

export default async function page({ params }: Props) {
    const paramsPromise = await params;
    if (["popular", "top_rated", "now_played"].includes(paramsPromise.slug)) {
        const initialItems = await fetchList(
            paramsPromise.media,
            paramsPromise.slug,
            1
        );
        return (
            <ListView
                initialItems={initialItems}
                media={paramsPromise.media}
                list={paramsPromise.slug}
            />
        );
    } else {
        const id = parseInt(paramsPromise.slug, 10);
        const details = await fetchMediaDetails(paramsPromise.media, id);

        return <MediaDetailsView details={details} />;
    }
}
