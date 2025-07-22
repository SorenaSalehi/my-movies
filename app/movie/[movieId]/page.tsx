export default async function page({
    params,
}: {
    params: Promise<{ movieId: string }>;
}) {
    const { movieId } = await params;
    
    console.log("movieID", movieId);
    return <div>page</div>;
}
