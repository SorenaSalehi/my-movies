import {
    Tabs,
    TabsList,
    TabsTrigger,
    TabsContent,
} from "../_components/ui/tabs";

export default function page() {
    return (
        <Tabs
            defaultValue="movie"
            style={{ minHeight: "65dvh" }}
            className="flex flex-col justify-center  items-center gap-4 my-4"
        >
            <h1 className="text-center border-[.4rem] border-red-500/30 animate-pulse text-xs backdrop-blur-2xl shadow-lg">
                You can have your watchlist in your local device but you will
                loose them after a while! <br />
                So please login in to keep them safe.
            </h1>
            <TabsList className="my-4">
                <TabsTrigger value="tv-shows">TV Shows</TabsTrigger>
                <TabsTrigger value="movie">Movie</TabsTrigger>
            </TabsList>
            <TabsContent
                value="movie"
                className="grid grid-cols-2 gap-x-4 gap-y-2 mb-4 md:grid-cols-3"
            >
                {/* <MoviesWatchlist /> */}
            </TabsContent>
            <TabsContent
                value="tv-shows"
                className="grid grid-cols-2 gap-x-4 gap-y-2 mb-4 md:grid-cols-3"
            ></TabsContent>
        </Tabs>
    );
}
