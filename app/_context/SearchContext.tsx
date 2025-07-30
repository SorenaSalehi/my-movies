"use client";

import { createContext, useContext, useState, ReactNode } from "react";

interface SearchContextType {
    query: string;
    setQuery: (q: string) => void;
}

const SearchContext = createContext<SearchContextType | undefined>(undefined);

export function SearchProvider({ children }: { children: ReactNode }) {
    const [query, setQuery] = useState("");
    return (
        <SearchContext.Provider value={{ query, setQuery }}>
            {children}
        </SearchContext.Provider>
    );
}

export function useSearchContext() {
    const ctx = useContext(SearchContext);
    if (!ctx) {
        throw new Error("useSearchContext must be used inside SearchProvider");
    }
    return ctx;
}
