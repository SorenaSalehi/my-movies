import { NextRequest, NextResponse } from "next/server";
import { fetchAllById, MediaType } from "@/app/_lib/tmdb";

interface PageResponse {
    page: number;
    pageSize: number;
    total: number;
    totalPages: number;
    hasMore: boolean;
    results: unknown;
}

export async function GET(
    req: NextRequest,
    { params }: { params: Promise<{ media: MediaType }> }
) {
    const { media } = await params;
    if (media !== "movie" && media !== "tv") {
        return NextResponse.json(
            { error: "Invalid media parameter!" },
            { status: 400 }
        );
    }

    const url = req.nextUrl;

    const idsParam = url.searchParams.get("ids") || "";
    const ids = idsParam
        .split(",")
        .map((id) => parseInt(id, 10))
        .filter((id) => Number.isFinite(id));

    const page = Math.max(1, parseInt(url.searchParams.get("page") ?? "1", 10));
    const pageSize = Math.max(
        1,
        Math.min(50, parseInt(url.searchParams.get("pageSize") ?? "10", 10))
    );

    const total = ids.length;
    const totalPages = Math.max(1, Math.ceil(total / pageSize));
    const start = (page - 1) * pageSize;
    const end = Math.min(start + pageSize, total);

    const pageIds = ids.slice(start, end);

    try {
        const results = pageIds?.length ? await fetchAllById(ids, media) : [];
        const body: PageResponse = {
            page,
            pageSize,
            total,
            totalPages,
            hasMore: page < totalPages,
            results,
        };
        return NextResponse.json(body, { status: 200 });
    } catch (err: unknown) {
        console.error("Error in Api route", err);
        return NextResponse.json(
            { error: err || "Internal server error!" },
            { status: 500 }
        );
    }
}
