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
    threshold = 200,
    smooth = true,
}: Props) {
    const [visible, setVisible] = useState(false);

    useEffect(() => {
        const el =
            target && typeof document !== "undefined"
                ? (document.querySelector(target) as HTMLElement | null)
                : null;

        const isWindow = !el;
        const getScrollTop = () =>
            isWindow
                ? window.screenY || document.documentElement.scrollTop
                : el!.scrollTop;

        const onScroll = () => setVisible(getScrollTop() > threshold);

        onScroll();

        if (isWindow) {
            window.addEventListener("scroll", onScroll, { passive: true });
            return window.removeEventListener("scroll", onScroll);
        } else {
            el!.addEventListener("scroll", onScroll, { passive: true });
            return () => el!.removeEventListener("scroll", onScroll);
        }
    }, [target, threshold]);

    const scrollToTop = () => {
        const el =
            target && typeof document !== "undefined"
                ? (document.querySelector(target) as HTMLElement | null)
                : null;

        if (!el) {
            window.scrollTo({ top: 0, behavior: smooth ? "smooth" : "auto" });
        } else {
            el.scrollTo({ top: 0, behavior: "smooth" });
        }
    };

    return (
        <button
            aria-label="back to top"
            onClick={scrollToTop}
            className={`fixed bottom-24 right-4 z-50 rounded-full bg-black/70 text-lime-500 p-3 shadow-lg backdrop-blur-md transition-opacity animate-pulse delay-1000 duration-1000 ${
                visible
                    ? "opacity-100 pointer-events-auto"
                    : "opacity-0 pointer-events-none"
            }`}
        >
            <CircleArrowUp />
        </button>
    );
}
