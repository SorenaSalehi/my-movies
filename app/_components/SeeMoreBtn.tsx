import React from "react";
import { Button } from "./ui/button";

interface Props extends React.ButtonHTMLAttributes<HTMLButtonElement> {
    children: React.ReactNode;
}
export default function SeeMoreBtn({ children, ...props }: Props) {
    return (
        <Button variant={"ghost"} {...props}>
            {children}
        </Button>
    );
}
