import MainLcItems from "./MainLcItems";
import { Movie } from "./OptimizedMovieImg";

type Props = {
    movies: Movie[];
};

export default function MainLcList({ movies }: Props) {
    return (
        <ul className="hidden gap-4 md:grid xl:grid-cols-6 lg:grid-cols-4 md:grid-cols-3 pt-4 max-h-[calc(100vh-100px)] overflow-y-auto">
            {movies.map((m) => (
                <li key={m.id}>
                    <MainLcItems movie={m} />
                </li>
            ))}
        </ul>
    );
}
