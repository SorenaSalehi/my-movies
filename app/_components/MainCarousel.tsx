import {
    Carousel,
    CarouselContent,
    CarouselItem,
} from "@/app/_components/ui/carousel";
import HomeCarouselsTitle from "./HomeCarouselsTitle";
import { Movie } from "./OptimizedMovieImg";
import MainLcItems from "./MainLcItems";
import { largeTitleConverter } from "../_lib/helpers";
import Link from "next/link";
type Props = {
    data: Movie[];
    title: string;
    path: string;
    mediaType: string;
};

export function MainCarousel({ data, title, path, mediaType }: Props) {
    // console.log(data[0]);
    return (
        <div
            id="main-carousel-container"
            className="lg:hidden flex flex-col justify-center w-[90vw] bg-red-500/3 rounded-md"
        >
            <HomeCarouselsTitle
                title={title}
                seeMoreBtnText="See More"
                path={path}
            />
            <Carousel className="w-full" opts={{ align: "center" }}>
                <CarouselContent className="-ml-1 gap-2">
                    {data.map((m, i) => (
                        <Link
                            key={m.id}
                            href={`/${mediaType}/${m.id}`}
                            role="group"
                            data-slot="carousel-item"
                            aria-roledescription="slide"
                            className="min-w-0 shrink-0 grow-0 pl-4 basis-1/3 sm:basis-1/3"
                        >
                            <CarouselItem key={m.id}>
                                <MainLcItems
                                    movie={m}
                                    priority={i <= 2}
                                    key={m.id}
                                />
                                <h1 className="text-center text-xs sm:text-sm">
                                    {largeTitleConverter(m?.title || m?.name)}
                                </h1>
                            </CarouselItem>
                        </Link>
                    ))}
                </CarouselContent>
                {/* <CarouselPrevious />
                <CarouselNext /> */}
            </Carousel>
        </div>
    );
}
