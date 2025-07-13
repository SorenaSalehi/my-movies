import HeroCarousel from "./_components/HeroCarousel";
import { getPopular } from "./_lib/tmdb";

export default async function page() {
    const popular = await getPopular();
    const movies = await popular.results;
    console.log(movies);
    return (
        <div className="min-h-screen">
            <HeroCarousel movies={movies} />
        </div>
    );
}
