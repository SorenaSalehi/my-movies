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
    data: Movie[];
    title: string;
};

export function MainCarousel({ data, title }: Props) {
    return (
        <div
            id="main-carousel-container"
            className="md:hidden flex flex-col justify-center w-[70vw]"
        >
            <HomeCarouselsTitle title={title} seeMoreBtnText="See More" />
            <Carousel className="w-full" opts={{ align: "center" }}>
                <CarouselContent className="-ml-1 ">
                    {data.map((m, i) => (
                        <CarouselItem key={m.id} className="basis-1/3">
                            <MainLcItems movie={m} priority={i <= 2} />
                            <h1>{m.title || m.name}</h1>
                        </CarouselItem>
                    ))}
                </CarouselContent>
                <CarouselPrevious />
                <CarouselNext />
            </Carousel>
        </div>
    );
}
