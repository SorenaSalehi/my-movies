import { Skeleton } from "./ui/skeleton";

interface Props {
    title: string;
}

export default function MediaTitle({ title }: Props) {
    return (
        <div className="flex items-center justify-center  gap-1 ">
            <Skeleton className="h-[5px] w-[15vw] sm:w-[30vw] rounded-full" />

            <h1 className="text-center  font-bold text-sm sm:text-base md:text-2xl text-nowrap">
                {title}
            </h1>
            <Skeleton className="h-[5px] w-[15vw] sm:w-[30vw] rounded-full" />
        </div>
    );
}
