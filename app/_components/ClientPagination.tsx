// import { Movie } from "./OptimizedMovieImg";

// interface Props {
//     initialData: Movie[];
//     media: "movie" | "tv";
//     list: "popular" | "top_rated" | "now_playing";
// }

// const fetcher = (url: string) => fetch(url).then((res) => res.json());

// export default function ClientPagination({ initialData, media, list }: Props) {
//     const PAGE_SIZE = 10;

//     const getKey = (pageIndex: number, previousPageData: Movie[] | null) => {
//         if (previousPageData && previousPageData.length < PAGE_SIZE) return null;

//         return `/api/${media}/${list}?page=${pageIndex + 1}`;
//     }

//     const {
//         data,
//         size,
//         setSize,
//         isValidating,
//         error,
//       } = useSWR<Movie[]>(getKey, fetcher, {
//         initialData: [initialMovies],
//         revalidateFirstPage: false,
//       });

//     return <div>ClientPagination</div>;
// }
