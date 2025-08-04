"use server";

interface Props {
    mediaListIds: number[];
}
export default async function MediaList({ mediaListIds }: Props) {
    if (!mediaListIds || mediaListIds.length === 0) {
        return <h1>You haven&apos;t any saved movie!</h1>;
    }

    // const results = await Promise.all(
    //     mediaListIds?.map((id) => fetchById("movie", id))
    // );
    return <div>MediaList</div>;
}
