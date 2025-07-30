"use client";

import { createContext, useContext, useMemo } from "react";
import {
    DataContextType,
    DataProviderProps,
    GenreMap,
} from "../_types/dataProvTypes";

const DataContext = createContext<DataContextType>({
    genres: [],
    genresMap: {},
    children: null,
});

export const useData = (): DataContextType => {
    const context = useContext(DataContext);
    if (!context) {
        throw new Error("useData must be used within a DataProvider");
    }
    return context;
};

export const DataProvider = ({ genres, children }: DataProviderProps) => {
    const genresMap = useMemo<GenreMap>(
        () => Object.fromEntries(genres.map((g) => [g.id, g.name])),
        [genres]
    );
    console.log(
        "genresMap---------------------------------------------------------------------------------------------------------",
        genresMap
    );
    return (
        <DataContext.Provider value={{ genres, genresMap, children }}>
            {children}
        </DataContext.Provider>
    );
};
