"use client";

import { CircleChevronLeft } from "lucide-react";
import { useRouter } from "next/navigation";

export default function BackButton() {
    const router = useRouter();

    return (
        <button
            type="button"
            onClick={() => router.back()}
            className="group inline-flex z-[1000] flex-col  justify-center items-center bg-red-800/50 mx-1 p-4  rounded-lg focus:outline-none w-[50px] md:w-[80px]  h-[50px]  transition-all duration-200 ease-in focus:bg-destructive focus:outline-0 focus:border-transparent focus:ring-0 text-center"
            aria-label="Back"
        >
            <span className="w-7 h-7">
                <CircleChevronLeft className="w-6 h-6" />
            </span>
            <p className="text-xs">Back</p>
        </button>
    );
}
