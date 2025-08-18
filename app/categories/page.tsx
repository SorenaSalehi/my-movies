import CategoriesMobileList from "../_components/CategoriesMobileList";
import { fetchGenres } from "../_lib/tmdb";

export default async function categoriesPage() {
    const [movieGenres, tvGenres] = await Promise.all([
        fetchGenres("movie"),
        fetchGenres("tv"),
    ]);

    return (
        <CategoriesMobileList movieGenres={movieGenres} tvGenres={tvGenres} />
    );
}
