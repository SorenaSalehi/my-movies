export interface Genre {
    id: number;
    name: string;
}
export type GenreMap = Record<number, string>;
export interface DataProviderProps {
    genres: Genre[];
    children: React.ReactNode;
}
export interface DataContextType {
    genres: Genre[];
    genresMap: GenreMap;
    children: React.ReactNode;
}
