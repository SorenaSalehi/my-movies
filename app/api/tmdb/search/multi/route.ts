import { fetchBySearch } from "@/app/_lib/tmdb";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
    const query = req.nextUrl.searchParams.get("query")?.trim();
    if (!query) return NextResponse.json([], { status: 200 });

    try {
        const results = await fetchBySearch(query);
        const filtered = results.filter(
            (r: { media_type: string }) =>
                r.media_type === "movie" || r.media_type === "tv"
        );

        return NextResponse.json(filtered);
    } catch (err: unknown) {
        return NextResponse.json([], { status: 500 });
    }
}
