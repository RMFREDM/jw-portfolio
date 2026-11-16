export default async function ArticleDetailsSkeleton() {
    return (
        <div className="animate-pulse p-1">
            <h1 className="text-3xl">Loading Article</h1>
            <p className="whitespace-pre-wrap w-full h-5 bg-gray-500 rounded-full mb-1"></p>
            <p className="whitespace-pre-wrap w-full h-5 bg-gray-500 rounded-full mb-1"></p>
            <p className="whitespace-pre-wrap w-full h-5 bg-gray-500 rounded-full"></p>
        </div>
    );
}