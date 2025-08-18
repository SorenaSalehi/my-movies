"use client";

import { CircleChevronLeft } from "lucide-react";
import { useRouter } from "next/navigation";

export default function BackButton() {
    const router = useRouter();

    return (
        <button
            type="button"
            onClick={() => router.back()}
            className="lg:hidden group inline-flex z-[1000] flex-col  justify-center items-center bg-destructive/60  rounded-lg focus:outline-none  md:w-[80px]  p-2  transition-all duration-200 ease-in  focus:outline-0 focus:border-transparent focus:ring-0 text-center"
            aria-label="Back"
        >
            {/* <span className="w-6 h-6"> */}
            <CircleChevronLeft className="w-5 h-5" />
            {/* </span> */}
            {/* <p className="text-xs">Back</p> */}
        </button>
    );
}
