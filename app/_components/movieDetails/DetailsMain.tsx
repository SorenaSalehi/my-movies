import { MovieDetails } from "@/app/_types/tmdbTypes";
import { Separator } from "../ui/separator";
import CollapseText from "../ui/CollapseText";
import DetailsBtns from "./DetailsBtns";
import OptimizedMovieImg from "../media/OptimizedMovieImg";

interface Props {
    movie: MovieDetails;
}

export default function DetailsMain({ movie }: Props) {
    return (
        <div className="flex flex-col gap-4 justify-center items-center  lg:w-[60vw] relative">
            <div className="absolute -z-10 brightness-16 top-0">
                <div className="w-screen lg:hidden md:w-[250px] h-auto md:h-100 relative ">
                    <OptimizedMovieImg movie={movie} isHero={false} />
                </div>
                <div className="hidden w-full lg:block  h-100  relative rounded-2xl overflow-hidden">
                    <OptimizedMovieImg movie={movie} isHero={true} />
                </div>
            </div>
            {/* begin:: media genres  */}
            <div className="flex gap-2 flex-wrap text-zinc-100 text-center">
                <h4 className="text-2xl md:text-2xl font-bold">
                    {movie.title || movie.name}
                </h4>
            </div>
            <div className="flex gap-2 flex-wrap">
                {/* begin:: movie release time  */}
                {movie?.release_date && (
                    <span className="text-zinc-200/90  ">
                        {movie.release_date?.slice(0, 4)}
                        {movie.first_air_date}
                        <span className="font-bold "> /</span>
                    </span>
                )}
                {/* end:: movie release time  */}
                {movie.spoken_languages && (
                    <span className="text-zinc-300/90 uppercase">
                        {movie.spoken_languages
                            .map((lang) => lang.iso_639_1)
                            .join(", ")}
                    </span>
                )}
                {/* end:: movie release time  */}
                <p className="text-zinc-300/90">/</p>
                {/* begin:: series release time  */}
                {movie.first_air_date && (
                    <span className="text-zinc-300/90 ">
                        {movie.first_air_date?.slice(0, 4) +
                            "-" +
                            movie.last_air_date?.slice(0, 4)}{" "}
                        {movie.status}
                    </span>
                )}
                {/* end:: series release time  */}
                {/* begin:: movie release run time  */}
                {movie.runtime && (
                    <span className="text-zinc-300/90 ">
                        {movie.runtime} min
                    </span>
                )}{" "}
                {/* end:: movie release run time  */}
                {/* begin:: series release run time  */}
                {movie?.episode_run_time &&
                    movie?.episode_run_time?.length !== 0 && (
                        <span className="text-zinc-300/90 ">
                            {movie?.episode_run_time[0]} min
                        </span>
                    )}
                {/* end:: series release run time  */}
            </div>

            <div className="flex flex-wrap justify-center items-center">
                <span className="text-zinc-300/90">Genres : </span>
                {movie?.genres.map((genre, i) => (
                    <span
                        key={i}
                        className=" lg:text-xl text-xs ml-1 text-zinc-100"
                    >
                        {genre.name}
                        {i + 1 < movie.genres.length ? ", " : ""}
                    </span>
                ))}
            </div>
            {/* end:: media genres  */}

            <Separator className="bg-red-500/50 lg:max-w-100" />

            {/* begin:: media overview  */}
            <CollapseText text={movie.overview} />
            {/* end:: media overview  */}

            <DetailsBtns movieId={movie.id} />
        </div>
    );
}
