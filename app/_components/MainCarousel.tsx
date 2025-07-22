import {
    Carousel,
    CarouselContent,
    CarouselItem,
} from "@/app/_components/ui/carousel";
import HomeCarouselsTitle from "./HomeCarouselsTitle";
import { Movie } from "./OptimizedMovieImg";
import MainLcItems from "./MainLcItems";
import { largeTitleConverter } from "../_lib/helpers";
type Props = {
    data: Movie[];
    title: string;
};

export function MainCarousel({ data, title }: Props) {
    console.log(data[0]);
    return (
        <div
            id="main-carousel-container"
            className="md:hidden flex flex-col justify-center w-[90vw] bg-red-500/3 rounded-md"
        >
            <HomeCarouselsTitle title={title} seeMoreBtnText="See More" />
            <Carousel className="w-full" opts={{ align: "center" }}>
                <CarouselContent className="-ml-1 gap-2">
                    {data.map((m, i) => (
                        <CarouselItem
                            key={m.id}
                            className="basis-1/2 sm:basis-1/3"
                        >
                            <MainLcItems movie={m} priority={i <= 2} />
                            <h1 className="text-center text-xs sm:text-sm">
                                {largeTitleConverter(m?.title || m?.name)}
                            </h1>
                        </CarouselItem>
                    ))}
                </CarouselContent>
                {/* <CarouselPrevious />
                <CarouselNext /> */}
            </Carousel>
        </div>
    );
}
