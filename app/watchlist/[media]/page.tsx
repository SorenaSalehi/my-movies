import { notFound } from "next/navigation";
import WatchlistTabs from "../_components/WatchlistTabs";

type MediaParam = "movie" | "tv";

export default async function Page({
    params,
}: {
    params: Promise<{ media: MediaParam }>;
}) {
    const { media } = await params;
    if (media !== "movie" && media !== "tv") notFound();

    return <WatchlistTabs media={media} />;
}
