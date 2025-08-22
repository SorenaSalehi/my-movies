import DetailsLeftSide from "@/app/_components/movieDetails/DetailsLeftSide";
import DetailsMain from "@/app/_components/movieDetails/DetailsMain";
import TrailerPlayer from "@/app/_components/movieDetails/TrailerPlayer";
import Spinner from "@/app/_components/ui/Spinner";
import { Separator } from "@/app/_components/ui/separator";
import { MovieDetails } from "@/app/_types/tmdbTypes";
import { Suspense } from "react";

interface Props {
    details: MovieDetails;
    trailer: string | undefined;
}

export default async function MediaDetailsView({ details, trailer }: Props) {
    return (
        <div className="flex flex-col pb-10 w-full h-screen lg:h-auto gap-4 justify-start items-center px-4 ">
            <div className="flex flex-col gap-4 w-full lg:flex-row lg:items-baseline mt-4 justify-evenly">
                <Suspense fallback={<Spinner />}>
                    {/* // begin:: Details left side : img , title,... */}
                    <DetailsLeftSide movie={details} />
                    {/* // end:: Details left side : img , title,... */}
                </Suspense>

                <div>
                    {/* // begin:: Details Main : genres , overview ,... */}
                    <Suspense fallback={<Spinner />}>
                        <DetailsMain movie={details} />
                    </Suspense>
                    {/* // end:: Details Main : genres , overview ,... */}

                    {/* // begin:: trailer*/}
                    <Suspense fallback={<Spinner />}>
                        <section className="p-2 lg:mt-34">
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
            <Separator className="bg-red-500/20  " />
        </div>
    );
}
