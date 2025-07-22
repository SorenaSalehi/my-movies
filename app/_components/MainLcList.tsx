import MainLcItems from "./MainLcItems";
import { Movie } from "./OptimizedMovieImg";

type Props = {
    movies: Movie[];
};

export default function MainLcList({ movies }: Props) {
    return (
        <ul className="hidden gap-4 md:grid xl:grid-cols-7 px-6 md:px-12 lg:grid-cols-4 md:grid-cols-4 pt-4 lg:max-h-[calc(100vh-100px)] overflow-y-auto">
            {movies.map((m) => (
                <li key={m.id}>
                    <MainLcItems movie={m} />
                </li>
            ))}
        </ul>
    );
}
