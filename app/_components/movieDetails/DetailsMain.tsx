import { MovieDetails } from "@/app/_types/tmdbTypes";
import { Separator } from "../ui/separator";
import { Button } from "../ui/button";
import { Bookmark, Eye } from "lucide-react";

interface Props {
    movie: MovieDetails;
}

export default function DetailsMain({ movie }: Props) {
    return (
        <div className="flex flex-col gap-4 justify-center items-center mt-4 lg:w-[60vw] ">
            <div className="flex gap-2">
                {movie.genres.map((genre, i) => (
                    <span
                        key={i}
                        className="border border-gray-200/50 rounded-full px-2 py-1 lg:text-xl"
                    >
                        {genre.name}
                    </span>
                ))}
            </div>
            <Separator className="bg-red-500/50 lg:max-w-100" />

            <h5 className="text-center px-10  md:text-xl lg:text-2xl">
                {movie.overview}
            </h5>
            <Separator className="bg-red-500/50 max-w-100" />
            <p className="lg:text-lg">
                <span>languages: </span>
                {movie.spoken_languages.map((lang) => lang.name).join(", ")}
            </p>
            <Separator className="bg-red-500/50 max-w-100" />
            <div className="flex gap-4">
                <Button className="bg-amber-300 w-50 font-bold">
                    <Bookmark strokeWidth={3} />
                    Add to WatchList
                </Button>{" "}
                <Button className="bg-gray-300 w-50 font-bold">
                    <Eye strokeWidth={3} />
                    Mark as watched
                </Button>
            </div>
        </div>
    );
}
