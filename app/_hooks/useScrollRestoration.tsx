"use client";

import { usePathname } from "next/navigation";
import { useEffect } from "react";

const PREFIX = "scroll-restoration:";
export default function useScrollRestoration() {
    const pathname = usePathname();
    const key = PREFIX + pathname;
    useEffect(() => {
        if (typeof window === "undefined") return;
        if ("scrollRestoration" in history) {
            history.scrollRestoration = "manual";
        }

        const saved = sessionStorage.getItem(key);
        if (saved) window.scrollTo(0, parseInt(saved, 10));

        const save = () => sessionStorage.setItem(key, String(window.scrollY));

        const handleBeforePop = () => save();

        window.addEventListener("beforeunload", save);
        window.addEventListener("pagehide", save);

        window.addEventListener("popstate", handleBeforePop);

        return () => {
            window.removeEventListener("beforeunload", save);
            window.removeEventListener("pagehide", save);
            window.removeEventListener("popstate", handleBeforePop);
        };
    }, [key]);
}
