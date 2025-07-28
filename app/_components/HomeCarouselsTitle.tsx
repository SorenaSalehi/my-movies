import React from "react";
import { Skeleton } from "./ui/skeleton";
import SeeMoreBtn from "./SeeMoreBtn";
import { ArrowRightIcon } from "lucide-react";

interface Props {
    title: string;
    seeMoreBtnText: string;
    path: string;
}

export default function HomeCarouselsTitle({
    title,
    seeMoreBtnText,
    path,
}: Props) {
    return (
        <div className="flex justify-between items-center w-full">
            <div className="flex items-center  gap-1 ">
                <Skeleton className="h-[10px] w-[10px] rounded-full" />
                <h1 className="text-center font-bold text-xs sm:text-base text-nowrap">
                    {title}
                </h1>
                <Skeleton className="h-[10px] w-[15vw] sm:w-[30vw] rounded-full" />
            </div>

            <SeeMoreBtn path={path}>
                <span className="text-[.8rem] text-amber-500 sm:text-sm">
                    {seeMoreBtnText}
                </span>
                <ArrowRightIcon className="w-4 h-4 text-amber-500" />
            </SeeMoreBtn>
        </div>
    );
}
