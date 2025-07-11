"use client";
import { useRef } from "react";
import Autoplay from "embla-carousel-autoplay";
import { Carousel, CarouselContent, CarouselItem } from "./ui/carousel";
import Image from "next/image";

type Props = { movies: { id: number; title: string; backdrop_path: string }[] };

export default function HeroCarousel({ movies }: Props) {
    const plugins = useRef(Autoplay({ delay: 6000, stopOnInteraction: true }));

    return (
        <Carousel
            className="w-full aspect-[16/7] overflow-hidden"
            opts={{ loop: true }}
            plugins={[plugins.current]}
        >
            <CarouselContent>
                {movies.map((m) => (
                    <CarouselItem key={m.id} className="relative  h-100">
                        <Image
                            src={`https://image.tmdb.org/t/p/w1280/${m.backdrop_path}`}
                            alt={m.title}
                            fill
                            className="object-cover"
                            priority
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent" />
                        <h2 className="absolute bottom-6 left-6 text-2xl font-bold text-white drop-shadow">
                            {m.title}
                        </h2>
                    </CarouselItem>
                ))}
            </CarouselContent>
        </Carousel>
    );
}
