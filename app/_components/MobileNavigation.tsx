"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { User, LayoutGrid, Bookmark, Home, Search } from "lucide-react";
import React from "react";

type NavItem = {
    id: string;
    icon: React.ReactNode;
    href: string;
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

    // وسط — زیر ناچ
    {
        id: "search",
        href: "/search",
        icon: <Search className="w-6 h-6" />,
        title: "Search",
    },

    {
        id: "home",
        href: "/",
        icon: <Home className="w-6 h-6" />,
        title: "Home",
    },
    {
        id: "dashboard",
        href: "/dashboard",
        icon: <User className="w-6 h-6" />,
        title: "Profile",
    },
];

type Props = { notchBg?: string };

/** فقط سگمنت اول مسیر تب را برمی‌گرداند (base) */
const basePathOf = (href: string) => {
    if (href === "/") return "/";
    const seg = href.split("?")[0].split("#")[0].split("/").filter(Boolean)[0];
    return seg ? `/${seg}` : "/";
};

/** اگر pathname با یکی از تب‌ها مچ شد، ایندکس آن را می‌دهد؛ وگرنه -1 */
const matchIndexFromPath = (pathname: string) => {
    return navItems.findIndex((item) => {
        const base = basePathOf(item.href);
        if (base === "/") return pathname === "/";
        return pathname === base || pathname.startsWith(base + "/");
    });
};

const MobileNavigation: React.FC<Props> = ({
    notchBg = "hsl(var(--background))",
}) => {
    const pathname = usePathname();
    const count = navItems.length;

    // مقدار اولیه: اگر مچ شد همان تب، وگرنه وسط
    const [activeIndex, setActiveIndex] = React.useState<number>(() => {
        const idx = matchIndexFromPath(
            typeof window !== "undefined" ? window.location.pathname : "/"
        );
        return idx === -1 ? Math.floor(count / 2) : idx;
    });

    // فقط وقتی مسیر با تب‌ها مچ شد، اکتیو را آپدیت کن؛ وگرنه دست نزن
    React.useEffect(() => {
        const idx = matchIndexFromPath(pathname);
        if (idx !== -1) setActiveIndex(idx);
    }, [pathname]);

    const cssVars = {
        ["--count" as string]: String(count),
        ["--active" as string]: String(activeIndex),
        ["--notch-bg" as string]: notchBg,
    } as React.CSSProperties;

    return (
        <div className="fixed inset-x-0 bottom-[calc(env(safe-area-inset-bottom)+16px)] z-[1000] flex justify-center lg:hidden pointer-events-none">
            <nav
                role="navigation"
                aria-label="Bottom navigation"
                className="relative pointer-events-auto w-[min(92vw,520px)] h-16 px-2 flex items-center gap-1
                   rounded-2xl bg-zinc-900/90 ring-1 ring-white/10 shadow-[0_10px_28px_rgba(0,0,0,.35)]
                   backdrop-blur-xl motion-reduce:transition-none"
                style={{
                    ...cssVars,
                    WebkitBackdropFilter: "blur(12px)",
                    backdropFilter: "blur(12px)",
                }}
            >
                {/* ناچ */}
                <span
                    aria-hidden="true"
                    className="absolute -top-[4px] w-[68px] h-[16px] rounded-b-full
                     shadow-[0_8px_16px_rgba(0,0,0,.35),inset_0_-1px_0_rgba(255,255,255,.06)]
                     transition-[left] duration-300 ease-[cubic-bezier(0.22,1,0.36,1)]
                     motion-reduce:transition-none bg-background"
                    style={{
                        left: "calc((100%/var(--count)) * (var(--active) + 0.5))",
                        transform: "translateX(-50%)",
                        // background: "var(--notch-bg)",
                    }}
                />
                {/* دایره‌ی بالای ناچ */}
                <span
                    aria-hidden="true"
                    className="absolute -top-[16px] w-3 h-3 rounded-full bg-red-500
                     shadow-[0_0_0_6px_rgba(59,130,246,.18)]
                     transition-[left] duration-300 ease-[cubic-bezier(0.22,1,0.36,1)]
                     motion-reduce:transition-none"
                    style={{
                        left: "calc((100%/var(--count)) * (var(--active) + 0.5))",
                        transform: "translateX(-50%)",
                    }}
                />

                {navItems.map((item, i) => {
                    const active = i === activeIndex;
                    return (
                        <Link
                            prefetch={false}
                            key={item.id}
                            href={item.href}
                            aria-label={item.title}
                            aria-current={active ? "page" : undefined}
                            onClick={() => setActiveIndex(i)} // با کلیک فوری اکتیو می‌شود
                            className="flex-1 h-12 grid place-items-center rounded-xl no-underline select-none
                         text-zinc-500 hover:text-white/90 hover:bg-white/5
                         transition-colors motion-reduce:transition-none z-[10001] ring-transparent"
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
                })}
            </nav>
        </div>
    );
};

export default MobileNavigation;
