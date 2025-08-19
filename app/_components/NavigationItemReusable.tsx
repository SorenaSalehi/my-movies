import {
    NavigationMenuContent,
    NavigationMenuItem,
    NavigationMenuLink,
    NavigationMenuTrigger,
    navigationMenuTriggerStyle,
} from "@/app/_components/ui/navigation-menu";
import Link from "next/link";
import { ReactNode } from "react";

interface Props {
    href?: string;
    type: "link" | "button";
    triggerText?: string | ReactNode;
    listItems?: { title: string; href: string }[];
    children?: ReactNode;
}
export default function NavigationItemReusable({
    href,
    type,
    triggerText,
    listItems,
    children,
}: Props) {
    return (
        <NavigationMenuItem>
            {/* //begin::nav link type */}
            {type === "link" && (
                <NavigationMenuLink
                    asChild
                    className={navigationMenuTriggerStyle()}
                >
                    <Link href={href || "#"}>{children}</Link>
                </NavigationMenuLink>
            )}
            {/* //end::nav link type */}

            {/* //begin::nav button type */}
            {type === "button" && (
                <>
                    <NavigationMenuTrigger>{triggerText}</NavigationMenuTrigger>
                    <NavigationMenuContent>
                        <ul className="grid gap-2  md:grid-cols-2 w-max z-[20001]">
                            {listItems?.map((item) => (
                                <ListItem
                                    key={item.title}
                                    title={item.title}
                                    href={item.href}
                                    className="border-l-2 border-red-500/25 z-[20001]"
                                ></ListItem>
                            ))}
                        </ul>
                    </NavigationMenuContent>
                </>
            )}
            {/* //end::nav button type */}
        </NavigationMenuItem>
    );
}

function ListItem({
    title,
    children,
    href,
    ...props
}: React.ComponentPropsWithoutRef<"li"> & { href: string }) {
    return (
        <li {...props}>
            <NavigationMenuLink asChild>
                <Link href={href}>
                    <div className="text-sm leading-none font-medium">
                        {title}
                    </div>
                    <p className="text-muted-foreground line-clamp-2 text-sm leading-snug">
                        {children}
                    </p>
                </Link>
            </NavigationMenuLink>
        </li>
    );
}
