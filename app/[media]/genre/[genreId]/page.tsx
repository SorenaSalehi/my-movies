import { fetchByGenre, fetchGenres } from "@/app/_lib/tmdb";
import ListView from "../../[slug]/ListView";

export const revalidate = 86400;
interface Props {
    params: Promise<{ media: "movie" | "tv"; genreId: string }>;
}

export default async function page({ params }: Props) {
    const paramsPromise = await params;
    const { media, genreId } = paramsPromise;
    const { results } = await fetchByGenre(media, Number(genreId));

    const [...genres] = await Promise.all([
        fetchGenres("movie"),
        fetchGenres("tv"),
    ]);

    const genre = genres.flat().find((g) => g.id === Number(genreId));
    return (
        <ListView
            initialItems={results}
            media={media}
            list={`${genre?.name}`}
            apiPath={`/api/tmdb/discover/${media}/${genreId}`}
        />
    );
}
