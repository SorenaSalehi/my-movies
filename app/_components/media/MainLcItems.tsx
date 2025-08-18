import OptimizedMovieImg from "./OptimizedMovieImg";
import { Card, CardContent } from "../ui/card";
import ItemDetails from "./ItemDetails";
import { MovieDetails } from "@/app/_types/tmdbTypes";

type Props = {
    movie: MovieDetails;
};

export default function MainLcItems({ movie }: Props) {
    return (
        <Card className="aspect-[2/3] w-full overflow-hidden rounded-lg relative">
            <CardContent className="group shadow-md">
                <p className="top-0 right-0 z-10 absolute bg-amber-300 shadow-2xl p-1 rounded-md max-w-max font-bold text-gray-900 text-xs md:text-sm">
                    IMDb : {movie?.vote_average?.toFixed(1)}
                </p>
                <OptimizedMovieImg movie={movie} isHero={false} />
                <div className="lg:hidden text-xs absolute bottom-0 left-0 bg-red-800 p-1 rounded-md text-gray-100  shadow-2xl w-full">
                    <h1 className=" ">{movie?.title || movie?.name}</h1>
                </div>
                <ItemDetails movie={movie} />
            </CardContent>
        </Card>
    );
}
