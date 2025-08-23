import {
    Carousel,
    CarouselContent,
    CarouselItem,
} from "@/app/_components/ui/carousel";
import MainLcItems from "../media/MainLcItems";
import Link from "next/link";
import HomeCarouselsTitle from "./HomeCarouselsTitle";
import { MovieDetails } from "@/app/_types/tmdbTypes";
type Props = {
    data: MovieDetails[];
    title: string;
    path: string;
    mediaType: string;
};
export function MainCarousel({ data, title, path, mediaType }: Props) {
    return (
        <div
            id="main-carousel-container"
            className="lg:hidden flex flex-col justify-center px-2  rounded-md"
        >
            {/* begin:: carousel title */}
            <HomeCarouselsTitle
                title={title}
                seeMoreBtnText="See More"
                path={path}
            />
            {/* end:: carousel title */}

            <Carousel className="w-full mx-auto" opts={{ align: "center" }}>
                <CarouselContent className="-ml-1 gap-4">
                    {data.map((m) => (
                        <Link
                            id="carousel-content-container-link"
                            key={m.title || m.name || m.id}
                            href={`/${mediaType}/${m.id}`}
                            role="group"
                            data-slot="carousel-item"
                            aria-roledescription="slide"
                            className="min-w-0 shrink-0 grow-0 basis-1/2 md:basis-1/3 text-center "
                        >
                            <CarouselItem key={m.id} id="carousel-item">
                                <MainLcItems movie={m} key={m.id} />
                            </CarouselItem>
                        </Link>
                    ))}
                </CarouselContent>
            </Carousel>
        </div>
    );
}
