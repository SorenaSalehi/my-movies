import { Movie } from "../_components/media/OptimizedMovieImg";

const TMDB = "https://api.themoviedb.org/3";
const apiKey = process.env.TMDB_KEY;

export type MediaType = "movie" | "tv";
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
    const url = `${TMDB}/${media}/${list}?api_key=${apiKey}&page=${page}`;
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
    const url = `${TMDB}/genre/${media}/list?api_key=${apiKey}`;
    const res = await fetch(url, { next: { revalidate: 3600 * 24 } });

    if (!res.ok) throw new Error(`${media}/genres failed (${res.status})`);

    const data = await res.json();

    return data.genres;
}

export async function fetchMediaDetails(media: "movie" | "tv", id: number) {
    const url = `${TMDB}/${media}/${id}?api_key=${apiKey}`;

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
    const url = `${TMDB}/discover/${media}?api_key=${apiKey}&with_genres=${genreId}&page=${page}`;

    const res = await fetch(url, { next: { revalidate: 3600 * 24 } });
    if (!res.ok) throw new Error(`Discover ${media} failed (${res.status})`);

    const data = await res.json();
    return data.results;
}

export async function fetchBySearch(query: string) {
    const url = `${TMDB}/search/multi?api_key=${apiKey}&query=${encodeURIComponent(
        query
    )}&include_adult=false`;

    const res = await fetch(url, { next: { revalidate: 3600 } });

    if (!res.ok) throw new Error("Search Failed!!");

    const data = await res.json();
    return data.results;
}
export async function fetchById(media: "movie" | "tv", id: number) {
    const url = `${TMDB}/${media}/${id}?api_key=${apiKey}`;
    console.log("url", url);
    const res = await fetch(url, { next: { revalidate: 86400 } });
    console.log("res", res);
    if (!res.ok) throw new Error("Fetch by id Failed!!");

    const data = await res.json();
    return data;
}
export async function fetchAllById(ids: number[], media: "movie" | "tv") {
    const apiKey = process.env.TMDB_KEY;
    if (!apiKey) throw new Error("TMDB_KEY is not defined!!");
    console.log("apiKey", apiKey);
    if (ids.length === 0) return [];

    const res = await Promise.all(
        ids.map((id) => {
            const url = new URL(`${TMDB}/3/${media}/${id}?api_key=${apiKey}`);
            return fetch(url.toString(), { next: { revalidate: 86400 } }).then(
                (res) => {
                    if (!res.ok) return res.json();

                    return res.json();
                }
            );
        })
    );
    console.log("res", res);
    return res;
}
