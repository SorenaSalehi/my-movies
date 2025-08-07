import { fetchAllById, MediaType } from "@/app/_lib/tmdb";
import { NextRequest, NextResponse } from "next/server";

export async function GET(
    req: NextRequest,
    { params }: { params: Promise<{ media: "movie" | "tv" }> }
) {
    const { media } = await params;
    const idsParam = req.nextUrl.searchParams.get("ids") || "";
    const ids = idsParam
        .split(",")
        .map((s) => parseInt(s, 10))
        .filter((n) => !isNaN(n));

    if (!["movie", "tv"].includes(media)) {
        return NextResponse.json(
            { error: "Invalid media parameter" },
            { status: 400 }
        );
    }

    try {
        const data = await fetchAllById(ids, media as MediaType);
        return NextResponse.json(data);
    } catch (err: any) {
        console.log("Error in api route", err);
        return NextResponse.json(
            {
                error: err.message || "Internal Server Error!",
            },
            { status: 500 }
        );
    }
}
