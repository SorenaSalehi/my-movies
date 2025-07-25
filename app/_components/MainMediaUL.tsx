import MainLcItems from "./MainLcItems";
import { Movie } from "./OptimizedMovieImg";
import Link from "next/link";
import { largeTitleConverter } from "../_lib/helpers";
import Spinner from "./Spinner";

type Props = {
    items: Movie[];
    isLoading: boolean;
    loaderRef: React.RefObject<HTMLLIElement | null>;
    mediaType: string;
};

function MainMediaUL({ items, isLoading, loaderRef, mediaType }: Props) {
    return (
        <ul
            className={`grid-cols-3 gap-2 w-full md:gap-4 grid xl:grid-cols-7 px-6 md:px-12 lg:grid-cols-4 md:grid-cols-4 pt-4 `}
        >
            {items.map((m) => (
                <li key={m.id}>
                    <Link href={`/${mediaType}/${m.id}`}>
                        <MainLcItems movie={m} />
                        <h1 className="text-center text-base lg:hidden">
                            {largeTitleConverter(m?.title || m?.name)}
                        </h1>
                    </Link>
                </li>
            ))}
            <li ref={loaderRef} className="h-10 w-full" />
            <li className="justify-self-start">{isLoading && <Spinner />}</li>
        </ul>
    );
}

export default MainMediaUL;
