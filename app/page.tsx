import HeroCarousel from "./_components/HeroCarousel";
import { MainCarousel } from "./_components/MainCarousel";
import { fetchGenres, fetchList } from "@/app/_lib/tmdb";
import MainLcList from "./_components/MainLcList";
import { DataProvider } from "./_context/DataProvider";

export default async function page() {
    const [topRated, popular] = await Promise.all([
        fetchList("movie", "top_rated"),
        fetchList("movie", "popular"),
    ]);
    console.log("popular", popular);

    const [...genres] = await Promise.all([
        fetchGenres("movie"),
        fetchGenres("tv"),
    ]);

    return (
        <DataProvider genres={genres.flat()}>
            {/* hero carousel for sm/md screens */}
            <HeroCarousel topRated={topRated} />

            {/* //carousel for sm/md screens  */}
            <MainCarousel popular={popular} />

            {/* //list for lg screens   */}
            <MainLcList movies={popular} />
        </DataProvider>
    );
}
