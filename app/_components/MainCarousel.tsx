"use client";
import { Card, CardContent } from "@/app/_components/ui/card";
import {
    Carousel,
    CarouselContent,
    CarouselItem,
    CarouselNext,
    CarouselPrevious,
} from "@/app/_components/ui/carousel";
import HomeCarouselsTitle from "./HomeCarouselsTitle";
type Props = {
    movies: {
        id: number;
        title: string;
        backdrop_path: string;
        poster_path: string;
    }[];
};

export function MainCarousel({ movies }: Props) {
    return (
        <div>
            <HomeCarouselsTitle />
            <Carousel className="w-full max-w-4xl " opts={{ align: "start" }}>
                <CarouselContent className="-ml-1">
                    {movies.slice(6, -1).map((m) => (
                        <CarouselItem
                            key={m.id}
                            className="  md:basis-1/2 lg:basis-1/3"
                        >
                            <div className="p-1">
                                <Card>
                                    <CardContent className="flex aspect-square items-center justify-center p-6">
                                        <span className="text-2xl font-semibold">
                                            {m.title}
                                        </span>
                                    </CardContent>
                                </Card>
                            </div>
                        </CarouselItem>
                    ))}
                </CarouselContent>
                {/* <CarouselPrevious />
            <CarouselNext /> */}
            </Carousel>
        </div>
    );
}
