"use client";
import { useRef } from "react";
import Autoplay from "embla-carousel-autoplay";
import {
    Carousel,
    CarouselContent,
    CarouselItem,
} from "@/app/_components/ui/carousel";
import Image from "next/image";

type Props = {
    topRated: {
        id: number;
        title: string;
        backdrop_path: string;
        poster_path: string;
        vote_average: number;
    }[];
};

export default function HeroCarousel({ topRated }: Props) {
    const plugin = useRef(Autoplay({ delay: 6000, stopOnInteraction: true }));

    return (
        <Carousel
            plugins={[plugin.current]}
            className="p-3 pt-4 md:absolute md:-z-50 top-0 right-0 left-0 "
            onMouseEnter={plugin.current.stop}
            onMouseLeave={plugin.current.reset}
        >
            <CarouselContent>
                {topRated.map((m) => (
                    <CarouselItem key={m.id} className="relative">
                        <div className="relative aspect-[21/9] w-full rounded-xl overflow-hidden">
                            <Image
                                src={`https://image.tmdb.org/t/p/w1280/${m.backdrop_path}`}
                                alt={m.title}
                                fill
                                sizes="100vw"
                                className="object-cover object-center brightness-50"
                                priority
                            />
                            <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent" />
                            <h2 className="absolute bottom-6 left-6 text-2xl font-bold text-white drop-shadow md:hidden">
                                {m.title}
                            </h2>
                            <h3 className="absolute top-4 right-2 text-2xl font-bold text-white drop-shadow md:hidden">
                                {m.vote_average.toFixed(1)} ⭐
                            </h3>
                        </div>
                    </CarouselItem>
                ))}
            </CarouselContent>
        </Carousel>
    );
}
