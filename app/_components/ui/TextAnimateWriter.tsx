"use client";
import { useState } from "react";
import { useEffect } from "react";
const text =
    "This webapp created to show my skills and for my personal use.If you like it, please give me a star on github or contact me to get more information.";
export default function TextAnimateWriter() {
    const [currentText, setCurrentText] = useState("");
    useEffect(() => {
        const interval = setInterval(() => {
            setCurrentText(text.slice(0, currentText.length + 1));
        }, 100);
        return () => clearInterval(interval);
    }, [currentText]);
    return <div className="font-bold text-2xl">{currentText}</div>;
}
