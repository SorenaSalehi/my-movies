import HeroCarousel from "./_components/carousels/HeroCarousel";
import { MainCarousel } from "./_components/carousels/MainCarousel";
import { fetchGenres, fetchList } from "@/app/_lib/tmdb";
import MainLcList from "./_components/media/MainLcList";
import { DataProvider } from "./_context/DataProvider";
import { Separator } from "./_components/ui/separator";
import { Skeleton } from "./_components/ui/skeleton";
import HeroTextBanner from "./_components/ui/HeroTextBanner";

export const revalidate = 86400;

export default async function page() {
    const [
        { results: movieTopRated },
        { results: popular },
        { results: tvPopular },
        { results: tvTopRated },
    ] = await Promise.all([
        fetchList("movie", "top_rated"),
        fetchList("movie", "popular"),
        fetchList("tv", "popular"),
        fetchList("tv", "top_rated"),
    ]);

    const [...genres] = await Promise.all([
        fetchGenres("movie"),
        fetchGenres("tv"),
    ]);
    return (
        <DataProvider genres={genres.flat()}>
            <HeroTextBanner />
            {/*begin:: hero carousel for sm/md screens */}
            <HeroCarousel topRated={movieTopRated} />
            {/*end:: hero carousel for sm/md screens */}
            {/* //begin:: movie carousel for sm/md screens  */}
            <MainCarousel
                data={popular}
                title="Hot Movies"
                path="movie/popular"
                mediaType="movie"
            />
            {/* //end:: movie carousel for sm/md screens  */}
            <Separator className="my-4 bg-red-500 lg:hidden " />
            {/* //begin:: tv carousel for sm/md screens  */}
            <MainCarousel
                data={tvPopular}
                title="Popular TV Shows"
                path="tv/popular"
                mediaType="tv"
            />
            {/* //end:: tv carousel for sm/md screens  */}
            <Separator className="my-4 bg-red-500 lg:hidden " />
            {/* //begin:: top rated carousel for sm/md screens  */}
            <MainCarousel
                data={movieTopRated}
                title="Top Rated Movies"
                path="movie/top_rated"
                mediaType="movie"
            />
            {/* //end:: top rated carousel for sm/md screens  */}
            <Separator className="my-4 bg-red-500 lg:hidden " />
            {/* //begin:: top rated tv carousel for sm/md screens  */}
            <MainCarousel
                data={tvTopRated}
                title="Top Rated TV Shows"
                path="tv/top_rated"
                mediaType="tv"
            />
            {/* //end:: top rated tv carousel for sm/md screens  */}
            <Skeleton className="my-4 h-1 w-full bg-red-500 lg:hidden " />

            {/* //begin:: list for lg screens   */}
            <div id="home-main-media-ul-container" className="hidden lg:block ">
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
