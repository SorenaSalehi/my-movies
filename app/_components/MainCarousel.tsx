import { Card, CardContent } from "@/app/_components/ui/card";
import {
    Carousel,
    CarouselContent,
    CarouselItem,
    CarouselNext,
    CarouselPrevious,
} from "@/app/_components/ui/carousel";
import HomeCarouselsTitle from "./HomeCarouselsTitle";
import OptimizedMovieImg, { Movie } from "./OptimizedMovieImg";
type Props = {
    popular: Movie[];
};

export function MainCarousel({ popular }: Props) {
    return (
        <div
            id="main-carousel-container"
            className="md:hidden flex flex-col justify-center w-[80vw]"
        >
            <HomeCarouselsTitle />
            <Carousel className="w-full" opts={{ align: "center" }}>
                <CarouselContent className="-ml-1">
                    {popular.map((m, i) => (
                        <CarouselItem
                            key={m.id}
                            className="basis-1/4 md:basis-1/2 lg:basis-1/3"
                        >
                            <div className="p-1">
                                <Card>
                                    <CardContent className="relative flex justify-center items-center p-6 aspect-square">
                                        <OptimizedMovieImg
                                            movie={m}
                                            priority={i <= 2}
                                            isHero={false}
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
