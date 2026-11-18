import { deleteComment } from "@/app/lib/actions";

export default async function DeleteCommentButton(props: {
	commentId: string;
	articleId: string;
}) {
	return (
		<button
			onClick={async () => {
				"use server";
				await deleteComment(props.commentId, props.articleId);
			}}
			className="border rounded bg-gray-300 hover:bg-gray-400 active:bg-gray-500 hover:cursor-pointer h-fit px-1 ml-1"
		>
			Delete
		</button>
	);
}
