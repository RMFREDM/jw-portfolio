import { getCommentsByArticleId } from "@/app/lib/data";
import CommentDisplay from "./CommentDetails";
import { Comment } from "@/app/lib/definitions";

export default async function CommentsList(props: { articleId: string }) {
	const comments = await getCommentsByArticleId(props.articleId);
	console.log(comments);

	return (
		<div className="border rounded overflow-scroll overscroll-contain w-full min-h-25 max-h-100">
			{comments.map((comment) => (
				<div key={comment.id}>
					<CommentDisplay comment={comment as Comment} />
				</div>
			))}
		</div>
	);
}
