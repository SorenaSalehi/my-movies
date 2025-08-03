"use client";
import { useEffect } from "react";
import { registerServiceWorker } from "../_lib/registerSW";

export default function ClientInit({
    children,
}: {
    children: React.ReactNode;
}) {
    useEffect(() => {
        registerServiceWorker();
    }, []);
    return <>{children}</>;
}
