import { getUsernameById } from "@/app/lib/data";
import { Comment } from "@/app/lib/definitions";
import DeleteCommentButton from "./DeleteCommentButton";
import EditCommentForm from "./EditCommentForm";
import isAssociatedWithCurrentAccount from "@/app/lib/isAssociatedWithCurrentAccount";

export default async function CommentDisplay(props: {
	comment: Comment;
	articleId: string;
}) {
	// get the comment and username
	const comment = props.comment;
	const username = (await getUsernameById(comment.accountid))?.username;

	// check if the comment is linked with the current user
	const isAssociated = await isAssociatedWithCurrentAccount(
		comment.accountid,
	);

	return (
		<div
			id={comment.id}
			className="flex flex-col align-left bg-gray-100 rounded-3xl p-3 m-1"
		>
			<div className="flex justify-between">
				<p className=" whitespace-pre-wrap w-280">{comment.content}</p>
				{isAssociated && (
					<div
						id="modify-comment"
						className="flex justify-between h-fit"
					>
						<EditCommentForm comment={comment} />
						<DeleteCommentButton
							commentId={comment.id}
							articleId={props.articleId}
						/>
					</div>
				)}
			</div>
			<p className="w-fit p-1">- {username}</p>
		</div>
	);
}
