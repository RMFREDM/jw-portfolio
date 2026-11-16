import { auth } from "@/auth";
import CommentForm from "./CommentForm";

export default async function ArticleCommentsSection(props: {
	articleId: string;
}) {
	const user = (await auth())?.user;

	return (
		<div id="comments-section">
			comments
			{user && <CommentForm articleId={props.articleId} />}
		</div>
	);
}
