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
        <div className={`p-1 h-[250px]`}>
            <Card className="h-full overflow-hidden">
                <CardContent className="relative flex justify-center items-center p-6 h-full aspect-square">
                    <p className="top-0 right-0 z-50 absolute bg-amber-300 shadow-2xl p-1 rounded-md max-w-max font-bold text-gray-900 text-xs md:text-sm">
                        IMDb : {movie.vote_average?.toFixed(1)}
                    </p>
                    <OptimizedMovieImg
                        movie={movie}
                        priority={priority}
                        isHero={false}
                    />

                    {/* <ItemDetails movie={movie} /> */}
                </CardContent>
            </Card>
        </div>
    );
}
