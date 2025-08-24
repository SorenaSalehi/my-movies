"use client";
import { useEffect, useRef } from "react";

type Options = {
    /** id کانتینر اسکرول */
    containerId?: string; // default: "main_app_container"
    /** کلید ذخیره‌سازی (برای صفحات مختلف لیست کلید متفاوت بده) */
    storageKey?: string; // default: "scroll:/list"
    /** اگر لیست اینفینیت داری، اینارو بده تا خودش صفحات بعدی رو بکشه */
    hasNextPage?: boolean;
    fetchNextPage?: () => Promise<unknown>;
    /** حداکثر چندبار تلاش برای لود تا رسیدن به آیتم مرجع */
    maxTries?: number; // default: 20
    /** فاصله بین تلاش‌ها به میلی‌ثانیه */
    tryIntervalMs?: number; // default: 120
};

export default function useScrollRestore({
    containerId = "main_app_container",
    storageKey = "scroll:/list",
    hasNextPage,
    fetchNextPage,
    maxTries = 20,
    tryIntervalMs = 120,
}: Options = {}) {
    const restoredRef = useRef(false);

    // ذخیره در زمان خروج/سوئیچ تب/آن‌مانت
    useEffect(() => {
        const container = document.getElementById(containerId);
        if (!container) return;

        const save = () => {
            const payload = {
                pos: container.scrollTop,
                // اگر آخرین آیتم کلیک‌شده ذخیره شده، نگه‌ش می‌داریم؛ اگر نبود فقط پوزیشن رو داریم
                ...(() => {
                    try {
                        const last = sessionStorage.getItem(storageKey);
                        if (!last) return {};
                        const parsed = JSON.parse(last);
                        return parsed.anchorId
                            ? { anchorId: parsed.anchorId }
                            : {};
                    } catch {
                        return {};
                    }
                })(),
                t: Date.now(),
            };
            sessionStorage.setItem(storageKey, JSON.stringify(payload));
        };

        const onVisibility = () => {
            if (document.visibilityState === "hidden") save();
        };

        window.addEventListener("pagehide", save);
        document.addEventListener("visibilitychange", onVisibility);

        return () => {
            window.removeEventListener("pagehide", save);
            document.removeEventListener("visibilitychange", onVisibility);
            save();
        };
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [containerId, storageKey]);

    // بازگردانی در مونت
    useEffect(() => {
        if (restoredRef.current) return;

        const raw = sessionStorage.getItem(storageKey);
        if (!raw) return;
        let parsed: { pos?: number; anchorId?: string } | null = null;
        try {
            parsed = JSON.parse(raw);
        } catch {
            return;
        }
        if (!parsed) return;

        const { pos, anchorId } = parsed;
        const container = document.getElementById(containerId);
        if (!container) return;

        const tryScroll = () => {
            if (anchorId) {
                const el = document.getElementById(anchorId);
                if (el) {
                    // اسکرول نسبت به کانتینر
                    const rect = el.getBoundingClientRect();
                    const containerRect = container.getBoundingClientRect();
                    const offset =
                        rect.top - containerRect.top + container.scrollTop;
                    container.scrollTo({ top: offset, behavior: "smooth" });
                    restoredRef.current = true;
                    return true;
                }
            }
            if (typeof pos === "number" && Number.isFinite(pos)) {
                container.scrollTo({ top: pos, behavior: "smooth" });
                restoredRef.current = true;
                return true;
            }
            return false;
        };

        // اگر همین الآن قابل اسکرول بود، انجام بده
        if (tryScroll()) return;

        // وگرنه تلاش تکراری؛ در هر تلاش اگر آیتم نبود و hasNextPage=true صفحه بعدی رو بکش
        let tries = 0;
        const timer = window.setInterval(async () => {
            if (tryScroll()) {
                window.clearInterval(timer);
                return;
            }
            if (tries++ >= maxTries) {
                window.clearInterval(timer);
                return;
            }
            if (!anchorId) return; // اگر فقط pos بود، نیاز به fetch بیشتر نداریم
            if (hasNextPage && fetchNextPage) {
                try {
                    await fetchNextPage();
                } catch {
                    // بی‌خیال خطا، دوباره تلاش می‌کنیم
                }
            }
        }, tryIntervalMs);

        return () => window.clearInterval(timer);
    }, [
        containerId,
        storageKey,
        hasNextPage,
        fetchNextPage,
        maxTries,
        tryIntervalMs,
    ]);
}
