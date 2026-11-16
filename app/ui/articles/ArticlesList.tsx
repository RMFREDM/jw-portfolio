import { getArticles } from "@/app/lib/data"
import Link from "next/link"

export default async function ArticlesList() {
    const articles = await getArticles()
    return <ul className="list-disc">
        {articles.map((article) => (
            <li key={article.title}><Link href={`/articles/${article.id}`} className="text-default hover:text-blue-500 hover:tracking-wide active:text-indigo-800">{article.title}</Link></li>
        ))}
    </ul>
}