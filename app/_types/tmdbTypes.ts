export interface Movie {
    id: number;
    title: string;
    backdrop_path: string;
    poster_path: string;
    vote_average: number;
    vote_count: number;
    genre_ids: number[];
}

export interface MovieDetails extends Movie {
    runtime: number;
    release_date: string | null;
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
    episode_run_time: number[];
    first_air_date: string | null;
    last_air_date: string | null;
    number_of_episodes: number;
    number_of_seasons: number;
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

export interface TMDBVideo {
    key: string;
    name: string;
    site: "YouTube" | "Vimeo" | string;
    type: "Trailer" | "Teaser" | "Clip" | string;
    official?: boolean;
    published_at?: string;
}
