import { GenreMap } from "../_types/dataProvTypes";

export const filterGenresName = (ids: number[], genresMap: GenreMap) => {
    console.log(ids, genresMap);
    return ids
        .map((id) => genresMap[id])
        .filter(Boolean)
        .join(", ");
};

export const largeTitleConverter = (title: string) => {
    return title?.slice(0, 16) + "...";
};
