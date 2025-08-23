import OptimizedMovieImg from "@/app/_components/media/OptimizedMovieImg";
import DetailsLeftSide from "@/app/_components/movieDetails/DetailsLeftSide";
import DetailsMain from "@/app/_components/movieDetails/DetailsMain";
import TrailerPlayer from "@/app/_components/movieDetails/TrailerPlayer";
import Spinner from "@/app/_components/ui/Spinner";
import { MovieDetails } from "@/app/_types/tmdbTypes";
import { Suspense } from "react";

interface Props {
    details: MovieDetails;
    trailer: string | undefined;
}

export default async function MediaDetailsView({ details, trailer }: Props) {
    return (
        <div className="flex flex-col pb-10 w-full h-screen lg:max-h-max lg:overflow-clip  gap-4 justify-start items-center px-4 relative">
            <div className="absolute -z-10 brightness-16 top-0">
                <div className="w-screen lg:hidden md:w-[250px] h-auto md:h-100 relative ">
                    <OptimizedMovieImg movie={details} isHero={false} />
                </div>
                <div className="hidden w-full lg:block  h-full  relative rounded-2xl overflow-hidden">
                    <OptimizedMovieImg movie={details} isHero={true} />
                </div>
            </div>
            <div className="flex flex-col gap-4 w-full lg:flex-row lg:items-baseline mt-4 justify-evenly">
                <Suspense fallback={<Spinner />}>
                    {/* // begin:: Details left side : img , title,... */}
                    <DetailsLeftSide movie={details} />
                    {/* // end:: Details left side : img , title,... */}
                </Suspense>

                <div>
                    {/* // begin:: Details Main : genres , overview ,... */}
                    <Suspense fallback={<Spinner />}>
                        <DetailsMain movie={details} trailer={trailer} />
                    </Suspense>
                    {/* // end:: Details Main : genres , overview ,... */}

                    {/* // begin:: trailer*/}
                    <Suspense fallback={<Spinner />}>
                        <section className="rounded-2xl overflow-hidden border-1 border-red-700/50 shadow-lg shadow-red-800/50 mt-2 lg:hidden">
                            {trailer ? (
                                <TrailerPlayer url={trailer} />
                            ) : (
                                <p>No Trailer Found!!</p>
                            )}
                        </section>
                    </Suspense>
                    {/* // end:: trailer*/}
                </div>
            </div>
        </div>
    );
}
