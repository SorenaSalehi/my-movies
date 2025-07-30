import { fetchByGenre } from "@/app/_lib/tmdb";
import { NextRequest, NextResponse } from "next/server";

export async function GET(
    req: NextRequest,
    { params }: { params: Promise<{ media: string; genre: string }> }
) {
    const { media, genre } = await params;
    const page = Number(req.nextUrl.searchParams.get("page") ?? "1");

    try {
        const results = await fetchByGenre(
            media as "movie" | "tv",
            Number(genre),
            page
        );
        return NextResponse.json(results);
    } catch (err: unknown) {
        return NextResponse.json({ error: err }, { status: 500 });
    }
}
