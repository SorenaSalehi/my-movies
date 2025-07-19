const TMDB = "https://api.themoviedb.org/3";

type MediaType = "movie" | "tv";
type ListKind = "popular" | "top_rated" | "now_playing";

export async function fetchList(
    media: MediaType,
    list: ListKind,
    page = 1,
    signal?: AbortSignal
) {
    const url = `${TMDB}/${media}/${list}?api_key=${process.env.TMDB_KEY}&page=${page}`;
    const res = await fetch(url, { signal, next: { revalidate: 3600 } });

    if (!res.ok) throw new Error(`${media}/${list} failed (${res.status})`);

    const data = await res.json();

    return data.results;
}

export async function fetchGenres(media: MediaType) {
    const url = `${TMDB}/genre/${media}/list?api_key=${process.env.TMDB_KEY}`;
    const res = await fetch(url, { next: { revalidate: 3600 * 24 } });

    if (!res.ok) throw new Error(`${media}/genres failed (${res.status})`);

    const data = await res.json();

    return data.genres;
}
