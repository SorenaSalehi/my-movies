"use client";

import { useEffect, useState } from "react";
import { Button } from "./button";

interface Props {
    text: string;
}

export default function CollapseText({ text }: Props) {
    const [isCollapse, setIsCollapse] = useState(true);
    const [displayText, setDisplayText] = useState("");

    useEffect(() => {
        if (isCollapse) {
            setDisplayText(text.slice(0, 80));
        } else {
            setDisplayText(text);
        }
    }, [isCollapse, displayText, text]);
    return (
        <div className="text-justify px-5  md:text-xl lg:text-2xl transition-all duration-400 ease-in">
            <h5>
                {displayText}
                <Button
                    onClick={() => setIsCollapse((isCol) => !isCol)}
                    variant={"ghost"}
                    className="text-amber-500 p-1"
                >
                    {isCollapse ? "read more..." : "show less"}
                </Button>
            </h5>
        </div>
    );
}
