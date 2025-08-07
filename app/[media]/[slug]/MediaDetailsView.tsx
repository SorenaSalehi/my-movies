import DetailsLeftSide from "@/app/_components/movieDetails/DetailsLeftSide";
import DetailsMain from "@/app/_components/movieDetails/DetailsMain";
import Spinner from "@/app/_components/ui/Spinner";
import { Separator } from "@/app/_components/ui/separator";
import { MovieDetails } from "@/app/_types/tmdbTypes";
import { Suspense } from "react";

interface Props {
    details: MovieDetails;
}

export default async function MediaDetailsView({ details }: Props) {
    return (
        <div className="flex flex-col pb-10 w-full gap-4 justify-start items-center   px-4 ">
            <div className="flex flex-col gap-4 lg:flex-row lg:items-baseline mt-4 justify-evenly">
                <Suspense fallback={<Spinner />}>
                    {/* // begin:: Details left side : img , title,... */}
                    <DetailsLeftSide movie={details} />
                    {/* // end:: Details left side : img , title,... */}

                    {/* // begin:: Details Main : genres , overview ,... */}
                    <DetailsMain movie={details} />
                    {/* // end:: Details Main : genres , overview ,... */}
                </Suspense>
            </div>
            <Separator className="bg-red-500/20  " />
        </div>
    );
}
