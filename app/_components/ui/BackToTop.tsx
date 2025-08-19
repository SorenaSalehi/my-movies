"use client";
import React, { useEffect, useState } from "react";
import { CircleArrowUp } from "lucide-react";

type Props = {
    target?: string;
    threshold?: number;
    smooth?: boolean;
};

export default function BackToTop({
    target = "#main_app_container",
    threshold = 400,
    smooth = true,
}: Props) {
    const [visible, setVisible] = useState(false);

    useEffect(() => {
        const el =
            typeof document !== "undefined"
                ? (document.querySelector(target) as HTMLElement | null)
                : null;

        const isWindow = !el;

        const getScrollTop = () =>
            isWindow
                ? (typeof window !== "undefined" ? window.scrollY : 0) ||
                  document.documentElement.scrollTop ||
                  document.body.scrollTop ||
                  0
                : el!.scrollTop;

        const onScroll = () => setVisible(getScrollTop() > threshold);

        // set initial state once on mount
        onScroll();

        if (isWindow) {
            window.addEventListener("scroll", onScroll, { passive: true });
            return () => window.removeEventListener("scroll", onScroll);
        } else {
            el!.addEventListener("scroll", onScroll, { passive: true });
            return () => el!.removeEventListener("scroll", onScroll);
        }
    }, [target, threshold]);

    const scrollToTop = () => {
        const el =
            typeof document !== "undefined"
                ? (document.querySelector(target) as HTMLElement | null)
                : null;

        if (!el) {
            window.scrollTo({ top: 0, behavior: smooth ? "smooth" : "auto" });
        } else {
            el.scrollTo({ top: 0, behavior: smooth ? "smooth" : "auto" });
        }
    };

    return (
        <button
            aria-label="back to top"
            onClick={scrollToTop}
            className={`fixed bottom-24 right-4 z-50 rounded-full bg-black/70 text-lime-500 p-3 shadow-lg backdrop-blur-md transition-opacity duration-300 ${
                visible
                    ? "opacity-100 pointer-events-auto animate-pulse"
                    : "opacity-0 pointer-events-none"
            }`}
        >
            <CircleArrowUp />
        </button>
    );
}
