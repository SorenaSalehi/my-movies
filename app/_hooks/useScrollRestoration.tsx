"use client";

import { usePathname } from "next/navigation";
import { useEffect } from "react";

const PREFIX = "scroll-restoration:";
export default function useScrollRestoration() {
    const pathname = usePathname();
    const key = PREFIX + pathname;
    console.log("1");
    useEffect(() => {
        if (typeof window === "undefined") return;
        if ("scrollRestoration" in history) {
            console.log("2");

            history.scrollRestoration = "manual";
        }

        const saved = sessionStorage.getItem(key);
        if (saved) window.scrollTo(0, parseInt(saved, 10));
        console.log("3");

        const save = () => sessionStorage.setItem(key, String(window.scrollY));

        const handleBeforePop = () => save();

        window.addEventListener("beforeunload", save);
        window.addEventListener("pagehide", save);

        window.addEventListener("popstate", handleBeforePop);
        console.log("4");

        return () => {
            window.removeEventListener("beforeunload", save);
            window.removeEventListener("pagehide", save);
            window.removeEventListener("popstate", handleBeforePop);
        };
    }, [key]);
}
