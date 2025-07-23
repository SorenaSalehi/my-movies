import { fetchList } from "@/app/_lib/tmdb";
import { NextRequest, NextResponse } from "next/server";

export async function GET(
    req: NextRequest,
    { params }: { params: Promise<{ media: string; list: string }> }
) {
    const { media, list } = await params;
    const page = req.nextUrl.searchParams.get("page") ?? "1";

    try {
        const data = await fetchList(
            media as "movie" | "tv",
            list as "popular" | "top_rated" | "now_playing",
            parseInt(page, 10)
        );
        return NextResponse.json(data);
    } catch (error: unknown) {
        return NextResponse.json({ error: error }, { status: 500 });
    }
}
