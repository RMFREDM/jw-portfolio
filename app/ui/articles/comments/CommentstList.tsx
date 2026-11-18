import { getCommentsByArticleId } from "@/app/lib/data";
import CommentDisplay from "./CommentDisplay";
import { Comment } from "@/app/lib/definitions";

export default async function CommentsList(props: { articleId: string }) {
	const comments = await getCommentsByArticleId(props.articleId);
	console.log(comments);

	return (
		<div className="border rounded overflow-scroll w-full min-h-25 max-h-100">
			{comments.map((comment) => (
				<div key={comment.id}>
					<CommentDisplay
						comment={comment as Comment}
						articleId={props.articleId}
					/>
				</div>
			))}
		</div>
	);
}
