"use server"

import { getArticleById } from "./data";
import { Article } from "./definitions";

export default async function getURLArticle(props: {
	params: Promise<{ id: string }>;
}) {
    // await the id from the url
    const params = await props.params;
    const id = params.id;

    // get and return the corresponding article
    const article = (await getArticleById(id)) as Article;
    return article;
}