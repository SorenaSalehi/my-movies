import OptimizedMovieImg from "./OptimizedMovieImg";
import { Card, CardContent } from "./ui/card";
import { Movie } from "./OptimizedMovieImg";
import ItemDetails from "./ItemDetails";

type Props = {
    movie: Movie;
    priority?: boolean;
};

export default function MainLcItems({ movie, priority }: Props) {
    return (
        <Card className="flex flex-col gap-6  shadow-sm  border rounded-xl text-card-foreground p-1 max-w-[220px] h-[300px] w-full overflow-clip">
            <CardContent className="relative h-full aspect-square group ">
                <p className="top-0 right-0 z-10 absolute bg-amber-300 shadow-2xl p-1 rounded-md max-w-max font-bold text-gray-900 text-xs md:text-sm">
                    IMDb : {movie?.vote_average?.toFixed(1)}
                </p>
                <OptimizedMovieImg
                    movie={movie}
                    priority={priority}
                    isHero={false}
                />

                <ItemDetails movie={movie} />
            </CardContent>
        </Card>
    );
}
