"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { LayoutGrid, Bookmark, Home } from "lucide-react";
import React from "react";
import MobileSearch from "./MobileSearch";

type NavItem = {
    id: string;
    icon?: React.ReactNode;
    href?: string;
    title: string;
};

const navItems: NavItem[] = [
    {
        id: "categories",
        href: "/categories",
        icon: <LayoutGrid className="w-6 h-6" />,
        title: "Cats",
    },
    {
        id: "watchlist",
        href: "/watchlist/movie",
        icon: <Bookmark className="w-6 h-6" />,
        title: "Saves",
    },

    { id: "search", title: "Search" },

    {
        id: "home",
        href: "/",
        icon: <Home className="w-6 h-6" />,
        title: "Home",
    },
    // {
    //     id: "dashboard",
    //     href: "/dashboard",
    //     icon: <User className="w-6 h-6" />,
    //     title: "Profile",
    // },
];

type Props = { notchBg?: string };

const basePathOf = (href: string) => {
    if (!href || href === "/") return href ?? "/";
    const seg = href.split("?")[0].split("#")[0].split("/").filter(Boolean)[0];
    return seg ? `/${seg}` : "/";
};

const matchIndexFromPath = (pathname: string) =>
    navItems.findIndex((item) => {
        if (!item.href) return false;
        const base = basePathOf(item.href);
        if (base === "/") return pathname === "/";
        return pathname === base || pathname.startsWith(base + "/");
    });

const MobileNavigation: React.FC<Props> = ({
    notchBg = "hsl(var(--background))",
}) => {
    const pathname = usePathname();
    const router = useRouter();
    const count = navItems.length;
    const searchIndex = navItems.findIndex((i) => i.id === "search");

    const defaultIndex =
        navItems.findIndex((i) => i.href === "/") !== -1
            ? navItems.findIndex((i) => i.href === "/")
            : navItems.findIndex((i) => !!i.href);

    const [activeIndex, setActiveIndex] = React.useState<number>(() => {
        if (typeof window === "undefined") return defaultIndex;
        const idx = matchIndexFromPath(window.location.pathname);
        return idx === -1 ? defaultIndex : idx;
    });

    const prevActiveRef = React.useRef(activeIndex);

    React.useEffect(() => {
        const idx = matchIndexFromPath(pathname);
        if (idx !== -1) setActiveIndex(idx);
    }, [pathname]);

    const cssVars = {
        ["--count" as string]: String(count),
        ["--active" as string]: String(activeIndex),
        ["--notch-bg" as string]: notchBg,
    } as React.CSSProperties;

    const btnBase =
        "flex-1 h-12 grid place-items-center rounded-xl no-underline select-none " +
        "text-zinc-500 hover:text-white/90 hover:bg-white/5 transition-colors";

    return (
        <div className="fixed inset-x-0 bottom-[calc(env(safe-area-inset-bottom)+16px)] z-40 flex justify-center lg:hidden pointer-events-none ">
            <nav
                role="navigation"
                aria-label="Bottom navigation"
                className="relative isolate pointer-events-auto w-[min(92vw,520px)] h-16 px-2 flex items-center gap-1
                   rounded-2xl bg-zinc-900/90 ring-1 ring-white/10 inset-shadow-red-800/20 inset-shadow-sm
                   backdrop-blur-xl"
                style={{
                    ...cssVars,
                    WebkitBackdropFilter: "blur(12px)",
                    backdropFilter: "blur(12px)",
                }}
            >
                {/* notch*/}
                <span
                    aria-hidden="true"
                    className="pointer-events-none absolute -top-[4px] w-[68px] h-[16px] rounded-b-full
                     shadow-[0_8px_16px_rgba(0,0,0,.35),inset_0_-1px_0_rgba(255,255,255,.06)]
                     transition-[left] duration-300 bg-background ease-[cubic-bezier(0.22,1,0.36,1)] z-0"
                    style={{
                        left: "calc((100%/var(--count)) * (var(--active) + 0.5))",
                        transform: "translateX(-50%)",
                    }}
                />
                {/* notch dot*/}
                <span
                    aria-hidden="true"
                    className="pointer-events-none absolute -top-[8px] w-3 h-3 rounded-full bg-red-500
                     transition-[left] duration-300 ease-[cubic-bezier(0.22,1,0.36,1)] z-0"
                    style={{
                        left: "calc((100%/var(--count)) * (var(--active) + 0.5))",
                        transform: "translateX(-50%)",
                    }}
                />

                {navItems.map((item, i) => {
                    const active = i === activeIndex;

                    if (item.id !== "search") {
                        return (
                            <Link
                                prefetch={false}
                                key={item.id}
                                href={item.href!}
                                aria-label={item.title}
                                aria-current={active ? "page" : undefined}
                                onClick={() => setActiveIndex(i)}
                                className={[
                                    btnBase,
                                    active
                                        ? "text-red-500"
                                        : "ring-2 ring-transparent",
                                    "z-10",
                                ].join(" ")}
                            >
                                <span
                                    className={[
                                        "pointer-events-none",
                                        active ? "text-red-500" : "",
                                    ].join(" ")}
                                >
                                    {item.icon}
                                </span>
                            </Link>
                        );
                    }

                    return (
                        <MobileSearch
                            key="search"
                            onOpenChange={(open) => {
                                if (open) {
                                    prevActiveRef.current = activeIndex;
                                    setActiveIndex(searchIndex);
                                    router.push("/search");
                                }
                            }}
                        >
                            <button
                                type="button"
                                aria-label="Search"
                                className={[
                                    btnBase,
                                    active
                                        ? "text-red-500 "
                                        : "ring-2 ring-transparent",
                                    "z-10",
                                ].join(" ")}
                            >
                                <svg
                                    className={[
                                        "w-6 h-6",
                                        active ? "text-red-500" : "",
                                    ].join(" ")}
                                    viewBox="0 0 24 24"
                                    fill="none"
                                >
                                    <path
                                        d="M21 21l-4.35-4.35M10.5 18a7.5 7.5 0 1 1 0-15 7.5 7.5 0 0 1 0 15Z"
                                        stroke="currentColor"
                                        strokeWidth="2"
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                    />
                                </svg>
                            </button>
                        </MobileSearch>
                    );
                })}
            </nav>
        </div>
    );
};

export default MobileNavigation;
