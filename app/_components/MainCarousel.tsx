import {
    Carousel,
    CarouselContent,
    CarouselItem,
    CarouselNext,
    CarouselPrevious,
} from "@/app/_components/ui/carousel";
import HomeCarouselsTitle from "./HomeCarouselsTitle";
import { Movie } from "./OptimizedMovieImg";
import MainLcItems from "./MainLcItems";
type Props = {
    popular: Movie[];
};

export function MainCarousel({ popular }: Props) {
    return (
        <div
            id="main-carousel-container"
            className="md:hidden flex flex-col justify-center w-[70vw]"
        >
            <HomeCarouselsTitle />
            <Carousel className="w-full" opts={{ align: "center" }}>
                <CarouselContent className="-ml-1 ">
                    {popular.map((m, i) => (
                        <CarouselItem key={m.id} className="basis-1/3">
                            <MainLcItems movie={m} priority={i <= 2} />
                            <h1>{m.title}</h1>
                        </CarouselItem>
                    ))}
                </CarouselContent>
                <CarouselPrevious />
                <CarouselNext />
            </Carousel>
        </div>
    );
}
