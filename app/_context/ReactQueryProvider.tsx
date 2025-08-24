"use client";

import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import React, { useState } from "react";

export default function ReactQueryProvider({
    children,
}: {
    children: React.ReactNode;
}) {
    const [client] = useState(
        () =>
            new QueryClient({
                defaultOptions: {
                    queries: {
                        staleTime: 30 * 60_000,
                        gcTime: 30 * 60_000,
                        refetchOnWindowFocus: false,
                        refetchOnReconnect: false,
                        refetchOnMount: false,
                    },
                },
            })
    );
    return (
        <QueryClientProvider client={client}>{children}</QueryClientProvider>
    );
}
