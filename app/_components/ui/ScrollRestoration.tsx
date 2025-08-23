"use client";

import { useEffect } from "react";
import { usePathname, useSearchParams } from "next/navigation";

type Props = {
    containerId?: string;
};

export default function ScrollRestoration({
    containerId = "main_app_container",
}: Props) {
    const pathname = usePathname();
    const searchParams = useSearchParams();

    useEffect(() => {
        // کلید یکتای history برای هر entry (پشت/جلو)
        const stateKey =
            (typeof window !== "undefined" &&
                window.history?.state?.key?.toString()) ||
            `${pathname}?${searchParams?.toString()}`;

        const storeKey = `scroll:${stateKey}`;
        const el = (document.getElementById(containerId) ??
            document.scrollingElement) as HTMLElement | null;

        // بازیابی بعد از رندر
        const saved = sessionStorage.getItem(storeKey);
        const y = saved ? parseInt(saved, 10) : 0;
        requestAnimationFrame(() => {
            if (!el) return;
            el.scrollTo(0, y);
        });

        // تابع ذخیره
        const save = () => {
            if (!el) return;
            const current = el.scrollTop ?? window.scrollY ?? 0;
            try {
                sessionStorage.setItem(storeKey, String(current));
            } catch {}
        };

        // ذخیره هنگام خروج/تغییر تب (برای Safari/iOS هم جواب می‌دهد)
        const onPageHide = () => save();
        const onVisibility = () => {
            if (document.visibilityState === "hidden") save();
        };
        window.addEventListener("pagehide", onPageHide);
        document.addEventListener("visibilitychange", onVisibility);

        // ذخیره هنگام ترک مسیر فعلی
        return () => {
            save();
            window.removeEventListener("pagehide", onPageHide);
            document.removeEventListener("visibilitychange", onVisibility);
        };
    }, [pathname, searchParams, containerId]);

    return null;
}
