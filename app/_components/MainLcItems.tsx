import OptimizedMovieImg from "./OptimizedMovieImg";
import { Card, CardContent } from "./ui/card";
import { Movie } from "./OptimizedMovieImg";
import ItemDetails from "./ItemDetails";

type Props = {
    movie: Movie;
    priority?: boolean;
};

export default function MainLcItems({ movie, priority }: Props) {
    return (
        <div className="p-1 h-[300px]">
            <Card className="h-full overflow-hidden">
                <CardContent className="relative flex justify-center items-center p-6 h-full aspect-square">
                    <OptimizedMovieImg
                        movie={movie}
                        priority={priority}
                        isHero={false}
                    />

                    <ItemDetails movie={movie} />
                </CardContent>
            </Card>
        </div>
    );
}
