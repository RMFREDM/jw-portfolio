import getURLArticle from "@/app/lib/getURLArticle"

export default async function ArticleDetails(props: {
	props: { params: Promise<{ id: string }> };
}) {
    const article = await getURLArticle(props.props);
    console.log(article);
    return <ul className="list-disc">
    </ul>
}