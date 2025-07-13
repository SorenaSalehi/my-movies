import HeroCarousel from "./_components/HeroCarousel";
import { MainCarousel } from "./_components/MainCarousel";
import { getPopular } from "./_lib/tmdb";

export default async function page() {
    const popular = await getPopular();
    const movies = await popular.results;
    console.log(movies);
    return (
        <div className="min-h-screen flex flex-col justify-start">
            <HeroCarousel movies={movies} />
            <MainCarousel movies={movies} />
        </div>
    );
}
