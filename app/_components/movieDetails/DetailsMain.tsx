import { MovieDetails } from "@/app/_types/tmdbTypes";
import CollapseText from "../ui/CollapseText";
import DetailsBtns from "./DetailsBtns";
import { Suspense } from "react";
import Spinner from "../ui/Spinner";
import TrailerPlayer from "./TrailerPlayer";

interface Props {
    movie: MovieDetails;
    trailer: string | undefined;
}

export default function DetailsMain({ movie, trailer }: Props) {
    return (
        <div className="flex flex-col gap-4 justify-center items-center  lg:w-[70vw] relative">
            <div className="flex items-center justify-center lg:justify-start w-full gap-4">
                <Suspense fallback={<Spinner />}>
                    <section className="rounded-2xl  w-100  overflow-hidden border-1 border-red-700/50 shadow-lg shadow-red-800/50 mt-2 hidden lg:block">
                        {trailer ? (
                            <TrailerPlayer url={trailer} />
                        ) : (
                            <p>No Trailer Found!!</p>
                        )}
                    </section>
                </Suspense>
                {/* // end:: trailer*/}
                <div className="flex flex-col gap-4 lg:items-start items-center">
                    {/* begin:: media genres  */}
                    <div className="flex gap-2 flex-wrap text-zinc-100 text-center">
                        <h4 className="text-2xl md:text-2xl font-bold ">
                            {movie.title || movie.name}
                            <span className="ml-2 ">
                                <DetailsBtns movieId={movie.id} />
                            </span>
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
                </div>
            </div>

            {/* begin:: media overview  */}
            <CollapseText text={movie.overview} />
            {/* end:: media overview  */}
        </div>
    );
}
