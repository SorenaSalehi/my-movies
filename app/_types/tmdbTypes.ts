export interface Movie {
    id: number;
    title: string;
    backdrop_path: string;
    poster_path: string;
    vote_average: number;
    genre_ids: number[];
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
