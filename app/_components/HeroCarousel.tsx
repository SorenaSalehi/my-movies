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
    movies: {
        id: number;
        title: string;
        backdrop_path: string;
        poster_path: string;
    }[];
};

export default function HeroCarousel({ movies }: Props) {
    const plugin = useRef(Autoplay({ delay: 6000, stopOnInteraction: true }));
    console.log(movies);
    return (
        <Carousel
            plugins={[plugin.current]}
            className="p-3 pt-4"
            onMouseEnter={plugin.current.stop}
            onMouseLeave={plugin.current.reset}
        >
            <CarouselContent>
                {movies.slice(0, 6).map((m) => (
                    <CarouselItem key={m.id} className="relative  h-100">
                        <div className="relative aspect-[21/9] w-full rounded-xl overflow-hidden">
                            <Image
                                src={`https://image.tmdb.org/t/p/w1280/${m.backdrop_path}`}
                                alt={m.title}
                                fill
                                sizes="100vw"
                                className="object-cover object-center "
                                priority
                            />
                            <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent" />
                            <h2 className="absolute bottom-6 left-6 text-2xl font-bold text-white drop-shadow">
                                {m.title}
                            </h2>
                        </div>
                    </CarouselItem>
                ))}
            </CarouselContent>
        </Carousel>
    );
}
