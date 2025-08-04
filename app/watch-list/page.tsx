import {
    Tabs,
    TabsList,
    TabsTrigger,
    TabsContent,
} from "../_components/ui/tabs";

export default function watchListPage() {
    return (
        <Tabs
            defaultValue="movie"
            style={{ minHeight: "65dvh" }}
            className="flex flex-col justify-center  items-center gap-4 my-4"
        >
            <h1>
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
            ></TabsContent>
            <TabsContent
                value="tv-shows"
                className="grid grid-cols-2 gap-x-4 gap-y-2 mb-4 md:grid-cols-3"
            ></TabsContent>
        </Tabs>
    );
}
