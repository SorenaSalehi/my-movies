export interface Movie {
    id: number;
    title: string;
    backdrop_path: string;
    poster_path: string;
    vote_average: number;
    genre_ids: number[];
}

export interface MovieDetails extends Movie {
    runtime: number;
    release_date: string;
    name: string;
    genres: { id: number; name: string }[];
    original_language: string;
    overview: string;
    spoken_languages: {
        english_name: string;
        iso_639_1: string;
        name: string;
    }[];
    status: string;
}

export interface MovieList {
    page: number;
    results: Movie[];
    total_pages: number;
    total_results: number;
}

export interface Genre {
    id: number;
    name: string;
}
