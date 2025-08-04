import { MovieDetails } from "@/app/_types/tmdbTypes";
import { Separator } from "../ui/separator";
import CollapseText from "../CollapseText";
import DetailsBtns from "./DetailsBtns";

interface Props {
    movie: MovieDetails;
}

export default function DetailsMain({ movie }: Props) {
    return (
        <div className="flex flex-col gap-4 justify-center items-center mt-4 lg:w-[60vw] ">
            <div className="flex gap-2 flex-wrap justify-center items-center">
                {movie.genres.map((genre, i) => (
                    <span
                        key={i}
                        className="border border-gray-200/50 rounded-full px-2 py-1 lg:text-xl max-h-max"
                    >
                        {genre.name}
                    </span>
                ))}
            </div>
            <Separator className="bg-red-500/20 lg:max-w-100" />

            <CollapseText text={movie.overview} />
            <Separator className="bg-red-500/20 max-w-100" />
            <p className="lg:text-lg">
                <span>languages: </span>
                {movie.spoken_languages
                    .map((lang) => lang.english_name)
                    .join(", ")}
            </p>
            <Separator className="bg-red-500/20 max-w-100" />
            <DetailsBtns movieId={movie.id} />
        </div>
    );
}
