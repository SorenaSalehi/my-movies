import { Genre, Movie } from "@/app/_types/tmdbTypes";

interface Props {
    details: Movie & {
        overview: string;
        release_date: string;
        runtime: number;
        genres: Genre[];
    };
}

export default async function MediaDetailsView({ details }: Props) {
    return <div>page</div>;
}
