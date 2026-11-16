import { getUsernameById } from "@/app/lib/data";
import { Comment } from "@/app/lib/definitions";

export default async function CommentDisplay(props: { comment: Comment }) {
	const comment = props.comment;
	console.log(comment.accountid);
	const username = await getUsernameById(comment.accountid);

	return (
		<div>
			<p>{comment.content}</p>
			<p>{username!}</p>
		</div>
	);
}
