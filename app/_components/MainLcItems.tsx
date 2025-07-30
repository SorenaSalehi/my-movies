import OptimizedMovieImg from "./OptimizedMovieImg";
import { Card, CardContent } from "./ui/card";
import { Movie } from "./OptimizedMovieImg";
import ItemDetails from "./ItemDetails";

type Props = {
    movie: Movie;
};

export default function MainLcItems({ movie }: Props) {
    console.log("movie", movie);
    return (
        <Card className="flex flex-col gap-6  shadow-sm  border rounded-xl text-card-foreground p-1 max-w-[220px] min-w-[150px]  h-[240px]  w-full overflow-clip">
            <CardContent className="relative h-full aspect-square group ">
                <p className="top-0 right-0 z-10 absolute bg-amber-300 shadow-2xl p-1 rounded-md max-w-max font-bold text-gray-900 text-xs md:text-sm">
                    IMDb : {movie?.vote_average?.toFixed(1)}
                </p>
                <OptimizedMovieImg movie={movie} isHero={false} />
                <h1 className=" lg:hidden text-xs sm:text-sm absolute bottom-0 left-1 bg-red-500 px-2 py-1 rounded-md text-gray-900 font-bold shadow-2xl">
                    {movie?.title || movie?.name}
                </h1>
                <ItemDetails movie={movie} />
            </CardContent>
        </Card>
    );
}
