"use client";

import { Check } from "lucide-react";

import { cn } from "@/lib/utils";
import { Button } from "@/app/_components/ui/button";
import {
    Command,
    CommandEmpty,
    CommandGroup,
    CommandInput,
    CommandItem,
    CommandList,
} from "@/app/_components/command";
import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from "@/app/_components/popover";
import { useState } from "react";

const frameworks = [
    {
        value: "next.js",
        label: "Next.js",
    },
    {
        value: "sveltekit",
        label: "SvelteKit",
    },
    {
        value: "nuxt.js",
        label: "Nuxt.js",
    },
    {
        value: "remix",
        label: "Remix",
    },
    {
        value: "astro",
        label: "Astro",
    },
];

export function SearchInput() {
    const [open, setOpen] = useState(false);
    const [value, setValue] = useState("");

    return (
        <Popover open={open} onOpenChange={setOpen}>
            <PopoverTrigger asChild>
                <Button
                    variant="outline"
                    role="combobox"
                    aria-expanded={open}
                    className=" text-center text-xl "
                >
                    {value
                        ? frameworks.find(
                              (framework) => framework.value === value
                          )?.label
                        : "What are you looking for?"}
                </Button>
            </PopoverTrigger>
            <PopoverContent className="w-100 p-0">
                <Command>
                    <CommandInput
                        placeholder="Search for movie/series..."
                        className="h-14 text-2xl"
                    />
                    <CommandList>
                        <CommandEmpty>No result.</CommandEmpty>
                        <CommandGroup>
                            {frameworks.map((framework) => (
                                <CommandItem
                                    key={framework.value}
                                    value={framework.value}
                                    onSelect={(currentValue) => {
                                        setValue(
                                            currentValue === value
                                                ? ""
                                                : currentValue
                                        );
                                        setOpen(false);
                                    }}
                                >
                                    {framework.label}
                                    <Check
                                        className={cn(
                                            "ml-auto",
                                            value === framework.value
                                                ? "opacity-100"
                                                : "opacity-0"
                                        )}
                                    />
                                </CommandItem>
                            ))}
                        </CommandGroup>
                    </CommandList>
                </Command>
            </PopoverContent>
        </Popover>
    );
}
