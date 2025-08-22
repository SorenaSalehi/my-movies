import { Suspense } from "react";
import CategoriesMobileList from "../_components/CategoriesMobileList";
import { fetchGenres } from "../_lib/tmdb";
import Spinner from "../_components/ui/Spinner";

export default async function categoriesPage() {
    const [movieGenres, tvGenres] = await Promise.all([
        fetchGenres("movie"),
        fetchGenres("tv"),
    ]);

    return (
        <Suspense fallback={<Spinner />}>
            <CategoriesMobileList
                movieGenres={movieGenres}
                tvGenres={tvGenres}
            />
        </Suspense>
    );
}
