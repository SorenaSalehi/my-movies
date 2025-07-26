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

    const [...genres] = await Promise.all([
        fetchGenres("movie"),
        fetchGenres("tv"),
    ]);

    return (
        <DataProvider genres={genres.flat()}>
            {/*begin:: hero carousel for sm/md screens */}
            <HeroCarousel topRated={topRated} />
            {/*end:: hero carousel for sm/md screens */}
            {/* //begin:: movie carousel for sm/md screens  */}
            <MainCarousel
                data={popular}
                title="What's Hot"
                path="movie/popular"
            />
            {/* //end:: movie carousel for sm/md screens  */}
            <Separator className="my-4 bg-red-500/20 lg:hidden " />
            {/* //begin:: tv carousel for sm/md screens  */}
            <MainCarousel
                data={tvPopular}
                title="Top TV Shows"
                path="tv/popular"
            />
            {/* //end:: tv carousel for sm/md screens  */}
            <Separator className="my-4 bg-red-500/20 lg:hidden " />
            {/* //begin:: top rated carousel for sm/md screens  */}
            <MainCarousel
                data={topRated}
                title="Top Rated Movies"
                path="movie/top_rated"
            />
            {/* //end:: top rated carousel for sm/md screens  */}
            {/* //begin:: list for lg screens   */}
            <MainLcList
                initialItems={popular}
                apiPath="/api/tmdb/movie/popular"
            />
            {/* //end:: list for lg screens   */}
        </DataProvider>
    );
}
