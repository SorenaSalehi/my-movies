import HeroCarousel from "./_components/HeroCarousel";
import { MainCarousel } from "./_components/MainCarousel";
import { fetchList } from "@/app/_lib/tmdb";

export default async function page() {
    const [topRated, popular] = await Promise.all([
        fetchList("movie", "top_rated"),
        fetchList("movie", "popular"),
    ]);
    console.log(popular);
    return (
        <>
            <HeroCarousel topRated={topRated} />
            <MainCarousel popular={popular} />
        </>
    );
}
