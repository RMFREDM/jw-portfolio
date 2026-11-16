import { auth } from "@/auth";
import CommentForm from "./CommentForm";
import CommentsList from "./CommentstList";

export default async function ArticleCommentsSection(props: {
	articleId: string;
}) {
	const user = (await auth())?.user;

	return (
		<div id="comments-section p-1">
			<h2 className="text-2xl">Comments</h2>
			<CommentsList articleId={props.articleId} />
			{user && <CommentForm articleId={props.articleId} />}
		</div>
	);
}
