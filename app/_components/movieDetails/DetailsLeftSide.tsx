import { MovieDetails } from "@/app/_types/tmdbTypes";
import OptimizedMovieImg from "../media/OptimizedMovieImg";

interface Props {
    movie: MovieDetails;
}
export default function DetailsLeftSide({ movie }: Props) {
    return (
        <div className="flex flex-col  justify-center items-center lg:self-start ">
            <div className="w-screen md:w-[250px] h-auto md:h-100 relative ">
                <OptimizedMovieImg movie={movie} isHero={true} />
                <div className="text-primary/70 font-extrabold ml-1 absolute bottom-0 flex items-center gap-1 left-3 bg-red-500/80 backdrop-blur-2xl px-2 rounded-2xl shadow-amber-500">
                    <span>vote: </span>
                    <span className="text-amber-200 font-extrabold ">
                        {movie?.vote_average.toFixed(1)}⭐
                    </span>
                </div>{" "}
                <div className="text-primary/70 font-extrabold ml-1 absolute bottom-0 flex items-center gap-1 right-3 bg-red-500/80 backdrop-blur-2xl px-2 rounded-2xl shadow-amber-500">
                    <span>vote count: </span>
                    <span className="text-amber-200 font-extrabold ">
                        {movie?.vote_count}
                    </span>
                </div>
            </div>
        </div>
    );
}
