import HeroCarousel from "./_components/HeroCarousel";
import { MainCarousel } from "./_components/MainCarousel";
import { fetchGenres, fetchList } from "@/app/_lib/tmdb";
import MainLcList from "./_components/MainLcList";
import { DataProvider } from "./_context/DataProvider";
import { Separator } from "./_components/ui/separator";

export default async function page() {
    const [topRated, popular, tvPopular] = await Promise.all([
        fetchList("movie", "top_rated"),
        fetchList("movie", "popular"),
        fetchList("tv", "popular"),
    ]);
    console.log(tvPopular);

    const [...genres] = await Promise.all([
        fetchGenres("movie"),
        fetchGenres("tv"),
    ]);

    return (
        <DataProvider genres={genres.flat()}>
            {/* hero carousel for sm/md screens */}
            <HeroCarousel topRated={topRated} />
            {/* //movie carousel for sm/md screens  */}
            <MainCarousel
                data={popular}
                title="What's Hot"
                path="/movies/popular"
            />
            <Separator className="my-4 bg-red-500/20 md:hidden " />
            {/* //tv carousel for sm/md screens  */}
            <MainCarousel
                data={tvPopular}
                title="Top TV Shows"
                path="/tv/popular"
            />{" "}
            <Separator className="my-4 bg-red-500/20 md:hidden " />
            {/* //top rated carousel for sm/md screens  */}
            <MainCarousel
                data={topRated}
                title="Top Rated Movies"
                path="/movies/top_rated"
            />
            {/* //list for lg screens   */}
            <MainLcList initialItems={popular} apiPath="/api/tmdb/movie/popular" />
        </DataProvider>
    );
}
