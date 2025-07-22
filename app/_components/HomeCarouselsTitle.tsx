import React from "react";
import { Skeleton } from "./ui/skeleton";
import SeeMoreBtn from "./SeeMoreBtn";
import { ArrowRightIcon } from "lucide-react";

interface Props {
    title: string;
    seeMoreBtnText: string;
}

export default function HomeCarouselsTitle({ title, seeMoreBtnText }: Props) {
    return (
        <div className="flex justify-between items-center w-full">
            <div className="flex items-center  gap-1 ">
                <Skeleton className="h-[10px] w-[10px] rounded-full" />
                <h1 className="text-center font-bold ">{title}</h1>
                <Skeleton className="h-[10px] w-[100px] rounded-full" />
            </div>

            <SeeMoreBtn>
                <span>{seeMoreBtnText}</span>
                <ArrowRightIcon className="w-4 h-4" />
            </SeeMoreBtn>
        </div>
    );
}
