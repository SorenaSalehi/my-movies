import HeroCarousel from "./_components/HeroCarousel";
import { MainCarousel } from "./_components/MainCarousel";
import { fetchGenres, fetchList } from "@/app/_lib/tmdb";
import MainLcList from "./_components/MainLcList";
import { DataProvider } from "./_context/DataProvider";
import { Separator } from "./_components/ui/separator";
import { Skeleton } from "./_components/ui/skeleton";

export default async function page() {
    const [topRated, popular, tvPopular] = await Promise.all([
        fetchList("movie", "top_rated"),
        fetchList("movie", "popular"),
        fetchList("tv", "popular"),
    ]);
    console.log("topRated", topRated);

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
                mediaType="movie"
            />
            {/* //end:: movie carousel for sm/md screens  */}
            <Separator className="my-4 bg-red-500/20 lg:hidden " />
            {/* //begin:: tv carousel for sm/md screens  */}
            <MainCarousel
                data={tvPopular}
                title="Top TV Shows"
                path="tv/popular"
                mediaType="tv"
            />
            {/* //end:: tv carousel for sm/md screens  */}
            <Separator className="my-4 bg-red-500/20 lg:hidden " />
            {/* //begin:: top rated carousel for sm/md screens  */}
            <MainCarousel
                data={topRated}
                title="Top Rated Movies"
                path="movie/top_rated"
                mediaType="movie"
            />
            {/* //end:: top rated carousel for sm/md screens  */}
            <Skeleton className="my-4 h-1 w-full bg-red-500/20 lg:hidden " />

            {/* //begin:: list for lg screens   */}
            <div id="home-main-media-ul-container" className="hidden lg:block">
                <MainLcList
                    initialItems={popular}
                    apiPath="/api/tmdb/movie/popular"
                    mediaType="movie"
                />
            </div>
            {/* //end:: list for lg screens   */}
        </DataProvider>
    );
}
