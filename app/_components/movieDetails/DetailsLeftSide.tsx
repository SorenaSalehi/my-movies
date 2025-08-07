import { MovieDetails } from "@/app/_types/tmdbTypes";
import OptimizedMovieImg from "../media/OptimizedMovieImg";
import { Separator } from "../ui/separator";

interface Props {
    movie: MovieDetails;
}
export default function DetailsLeftSide({ movie }: Props) {
    console.log("movie.release_date", movie.release_date);
    return (
        // begin:: media details : name , rate , img , releaseTime
        <div className="flex flex-col  justify-center items-center lg:self-start ">
            <h4 className="text-lg md:text-2xl font-bold">
                {movie.title || movie.name}
            </h4>
            <Separator className="bg-red-500/40 max-w-50 my-2" />

            <div className="flex gap-2 ">
                {/* begin:: movie release time  */}
                {movie.release_date && (
                    <span className="text-primary/70 border-[.01rem] border-red-500/50 rounded-xl px-2 py1 ">
                        {movie.release_date?.slice(0, 4)}
                        {movie.first_air_date}
                    </span>
                )}
                {/* end:: movie release time  */}
                {/* begin:: series release time  */}
                {movie.first_air_date && (
                    <span className="text-primary/70 border-[.01rem] border-red-500/50 rounded-xl px-2 py1 text-xs">
                        {movie.first_air_date?.slice(0, 4) +
                            "-" +
                            movie.last_air_date?.slice(0, 4)}{" "}
                        {movie.status}
                    </span>
                )}
                {/* end:: series release time  */}
                {/* begin:: movie release run time  */}
                {movie.runtime && (
                    <span className="text-primary/70 border-[.01rem] border-red-500/50 rounded-xl px-2 py1">
                        {movie.runtime} min
                    </span>
                )}{" "}
                {/* end:: movie release run time  */}
                {/* begin:: series release run time  */}
                {movie.episode_run_time && (
                    <span className="text-primary/70 border-[.01rem] border-red-500/50 rounded-xl px-2 py1">
                        {movie.episode_run_time[0]} min
                    </span>
                )}
                {/* end:: series release run time  */}
                <p className="border-[.01rem] border-red-500/50 rounded-xl px-2 py1">
                    <span className="text-primary/70 ">IMDB: </span>
                    <span className="text-amber-200 font-extrabold">
                        {movie.vote_average.toFixed(1)}⭐
                    </span>
                </p>
            </div>
            <div className="w-[200px] md:w-[250px] h-75 md:h-100 relative pt-4">
                <OptimizedMovieImg movie={movie} isHero={false} />
            </div>
        </div>
        // end:: media details : name , rate , img , releaseTime
    );
}
