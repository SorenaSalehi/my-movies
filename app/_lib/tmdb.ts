const TMDB = "https://api.themoviedb.org/3";

export async function getPopular(page = 1) {
    const d = await fetch(
        `${TMDB}/movie/popular?api_key=${process.env.TMDB_KEY}&page=${page}`,
        { next: { revalidate: 3600 } }
    );

    if (d.status !== 200)
        throw new Error("something went wrong in getPopular!!");

    const r = d.json();

    return r;
}
