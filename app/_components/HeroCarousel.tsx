"use client";
import { useRef } from "react";
import Autoplay from "embla-carousel-autoplay";
import {
    Carousel,
    CarouselContent,
    CarouselItem,
} from "@/app/_components/ui/carousel";
import OptimizedMovieImg from "./OptimizedMovieImg";
import { Movie } from "./OptimizedMovieImg";
import { useRouter } from "next/navigation";

type Props = {
    topRated: Movie[];
};

export default function HeroCarousel({ topRated }: Props) {
    const plugin = useRef(Autoplay({ delay: 10000, stopOnInteraction: true }));
    const router = useRouter();
    return (
        <Carousel
            plugins={[plugin.current]}
            className="lg:top-0 lg:right-0 lg:bottom-0 lg:left-0 lg:-z-50 lg:absolute p-3 pt-4 lg:brightness-10 lg:h-[100vh] "
            onMouseEnter={plugin.current.stop}
            onMouseLeave={plugin.current.reset}
        >
            <CarouselContent>
                {topRated.map((m) => (
                    <CarouselItem
                        key={m.id}
                        className="relative pl-4 lg:pl-0 lg:h-full"
                        onClick={() => {
                            router.push(`/movie/${m.id}`);
                        }}
                        id="hero-carousel-item"
                    >
                        <div className="relative rounded-xl w-full aspect-[21/9] lg:aspect-[1/1]  overflow-hidden ">
                            <OptimizedMovieImg movie={m} isHero={true} />
                            <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent" />
                            <h2 className="lg:hidden bottom-6 left-6 absolute drop-shadow font-bold text-white text-2xl">
                                {m.title}
                            </h2>
                            <h3 className="lg:hidden top-4 right-2 absolute drop-shadow font-bold text-white text-2xl">
                                {m.vote_average?.toFixed(1)} ⭐
                            </h3>
                        </div>
                    </CarouselItem>
                ))}
            </CarouselContent>
        </Carousel>
    );
}
