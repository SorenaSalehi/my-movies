import { MovieDetails, TMDBVideo } from "../_types/tmdbTypes";

const TMDB = "https://api.themoviedb.org/3";
const apiKey = process.env.TMDB_KEY;

export type MediaType = "movie" | "tv";
export type ListKind = "popular" | "top_rated" | "now_playing" | string;

export interface MovieApiResponse {
    results: MovieDetails[];
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

//it's fetching all  movie genres
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
    page = 1,
    signal?: AbortSignal
): Promise<MovieApiResponse> {
    const url = `${TMDB}/discover/${media}?api_key=${apiKey}&with_genres=${genreId}&page=${page}`;

    const res = await fetch(url, { signal, next: { revalidate: 3600 * 24 } });
    if (!res.ok) throw new Error(`Discover ${media} failed (${res.status})`);

    const data = await res.json();
    return {
        results: data.results,
        page: data.page,
        total_pages: data.total_pages,
    };
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
export async function fetchOneById(media: "movie" | "tv", id: number) {
    const url = `${TMDB}/${media}/${id}?api_key=${apiKey}`;

    const res = await fetch(url, { next: { revalidate: 86400 } });

    if (!res.ok) throw new Error("Fetch one by id Failed!!");

    const data = await res.json();
    return data;
}

export async function fetchAllById(ids: number[], media: "movie" | "tv") {
    if (!ids || ids.length === 0) return [];

    const settled = await Promise.allSettled(
        ids?.map((id) => fetchOneById(media, id))
    );

    const ok = settled
        .filter(
            (s): s is PromiseFulfilledResult<string> => s.status === "fulfilled"
        )
        .map((s) => s.value);

    return ok;
}

export async function fetchTrailer(id: number, media: "movie" | "tv") {
    if (!id) return;
    const url = `${TMDB}/${media}/${id}/videos?api_key=${apiKey}`;
    const res = await fetch(url, { next: { revalidate: 3600 } });

    if (!res.ok) return;
    const data = (await res.json()) as { results?: TMDBVideo[] };

    const vids = (data.results ?? [])
        .filter((v) => ["Trailer", "Teaser"].includes(v.type))
        .sort((a, b) => {
            const o = Number(b.official === true) - Number(a.official === true);
            if (o !== 0) return o;
            return (
                new Date(b.published_at ?? 0).getTime() -
                new Date(a.published_at ?? 0).getTime()
            );
        });

    const v = vids.find((x) => x.site === "YouTube") ?? vids[0];
    if (v) {
        const url =
            v.site === "YouTube"
                ? `https://www.youtube.com/watch?v=${v.key}`
                : v.site === "Vimeo"
                ? `https://vimeo.com/${v.key}`
                : "";
        if (url) return url;
    }
}
