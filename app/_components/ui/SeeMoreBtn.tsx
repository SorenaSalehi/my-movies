import React from "react";
import { Button } from "./button";
import Link from "next/link";

interface Props extends React.ButtonHTMLAttributes<HTMLButtonElement> {
    children: React.ReactNode;
    path?: string;
}
export default function SeeMoreBtn({ path, children, ...props }: Props) {
    return (
        <Link href={path || "#"}>
            <Button variant={"ghost"} {...props}>
                {children}
            </Button>
        </Link>
    );
}
