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
import Image from "next/image";
type Props = {
    popular: {
        id: number;
        title: string;
        backdrop_path: string;
        poster_path: string;
    }[];
};

export function MainCarousel({ popular }: Props) {
    return (
        <div
            id="main-carousel-container"
            className="w-[80vw] flex flex-col justify-center "
        >
            <HomeCarouselsTitle />
            <Carousel className="w-full" opts={{ align: "center" }}>
                <CarouselContent className="-ml-1">
                    {popular.slice(0, 5).map((m) => (
                        <CarouselItem
                            key={m.id}
                            className="  md:basis-1/2 lg:basis-1/3"
                        >
                            <div className="p-1">
                                <Card>
                                    <CardContent className="flex aspect-square items-center justify-center p-6 relative">
                                        <Image
                                            src={`https://image.tmdb.org/t/p/original${m.poster_path}`}
                                            alt={m.title}
                                            fill
                                            sizes="100vw"
                                            className="object-cover object-center brightness-50"
                                            priority
                                        />
                                    </CardContent>
                                </Card>
                            </div>
                        </CarouselItem>
                    ))}
                </CarouselContent>
                <CarouselPrevious />
                <CarouselNext />
            </Carousel>
        </div>
    );
}
