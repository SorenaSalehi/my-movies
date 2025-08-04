import { Movie } from "../_components/OptimizedMovieImg";

const TMDB = "https://api.themoviedb.org/3";

type MediaType = "movie" | "tv";
export type ListKind = "popular" | "top_rated" | "now_playing" | string;

export interface MovieApiResponse {
    results: Movie[];
    page: number;
    total_pages: number;
}

export async function fetchList(
    media: MediaType,
    list: ListKind,
    page = 1,
    signal?: AbortSignal
): Promise<MovieApiResponse> {
    const url = `${TMDB}/${media}/${list}?api_key=${process.env.TMDB_KEY}&page=${page}`;
    const res = await fetch(url, { signal, next: { revalidate: 3600 * 24 } });

    if (!res.ok) throw new Error(`${media}/${list} failed (${res.status})`);

    const data = await res.json();
    return {
        results: data.results,
        page: data.page,
        total_pages: data.total_pages,
    };
}

export async function fetchGenres(media: MediaType) {
    const url = `${TMDB}/genre/${media}/list?api_key=${process.env.TMDB_KEY}`;
    const res = await fetch(url, { next: { revalidate: 3600 * 24 } });

    if (!res.ok) throw new Error(`${media}/genres failed (${res.status})`);

    const data = await res.json();

    return data.genres;
}

export async function fetchMediaDetails(media: "movie" | "tv", id: number) {
    const url = `${TMDB}/${media}/${id}?api_key=${process.env.TMDB_KEY}`;

    const res = await fetch(url, { next: { revalidate: 3600 * 24 } });

    if (!res.ok) throw new Error(`${media}/${id} fetch failed (${res.status})`);

    const data = await res.json();
    return data;
}

export async function fetchByGenre(
    media: MediaType,
    genreId: number,
    page = 1
) {
    const url = `${TMDB}/discover/${media}?api_key=${process.env.TMDB_KEY}&with_genres=${genreId}&page=${page}`;

    const res = await fetch(url, { next: { revalidate: 3600 * 24 } });
    if (!res.ok) throw new Error(`Discover ${media} failed (${res.status})`);

    const data = await res.json();
    return data.results;
}

export async function fetchBySearch(query: string) {
    const url = `${TMDB}/search/multi?api_key=${
        process.env.TMDB_KEY
    }&query=${encodeURIComponent(query)}&include_adult=false`;

    const res = await fetch(url, { next: { revalidate: 3600 } });

    if (!res.ok) throw new Error("Search Failed!!");

    const data = await res.json();
    return data.results;
}
