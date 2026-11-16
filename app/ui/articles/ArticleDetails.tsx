import getURLArticle from "@/app/lib/getURLArticle"
import Link from "next/link";

export default async function ArticleDetails(props: {
	props: { params: Promise<{ id: string }> };
}) {
    const article = await getURLArticle(props.props);
    console.log(article);
    return (
        <div className="p-1">
            <h1 className="text-3xl">{article.title}</h1>
            <p className="whitespace-pre-wrap">{article.contents}</p>
        </div>
    );
}