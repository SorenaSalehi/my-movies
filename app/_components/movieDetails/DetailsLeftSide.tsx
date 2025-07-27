import { MovieDetails } from "@/app/_types/tmdbTypes";
import OptimizedMovieImg from "../OptimizedMovieImg";
import { Separator } from "../ui/separator";

interface Props {
    movie: MovieDetails;
}
export default function DetailsLeftSide({ movie }: Props) {
    return (
        <div className="flex flex-col justify-center items-center lg:self-start ">
            <h4 className="text-lg md:text-2xl font-bold">{movie.title}</h4>
            <Separator className="bg-red-500/50 max-w-50" />

            <div className="flex gap-2">
                <span className="text-primary/70">
                    {movie.release_date.slice(0, 4)}
                </span>
                <Separator orientation="vertical" className="bg-red-500/50" />
                <span className="text-primary/70">{movie.runtime} min</span>
                <Separator orientation="vertical" className="bg-red-500/50" />

                <span className="text-primary/70">IMDB:</span>
                <span className="text-amber-200 font-extrabold">
                    {movie.vote_average.toFixed(1)}⭐
                </span>
            </div>
            <div className="w-[200px] md:w-[250px] h-75 md:h-100 relative">
                <OptimizedMovieImg movie={movie} isHero={false} />
            </div>
        </div>
    );
}
