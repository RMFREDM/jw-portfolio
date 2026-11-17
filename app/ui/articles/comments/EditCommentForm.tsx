"use client";

import { Comment } from "@/app/lib/definitions";
import { useState } from "react";

export default function EditCommentForm(props: {
	comment: Comment;
	articleId: string;
}) {
	// use state to control if the comment is being edited and the value of the form
	const [isEditing, setIsEditing] = useState(false);
	const [comment, setComment] = useState(props.comment.content);

	return (
		<>
			{isEditing && (
				<form>
					<textarea
						id="content"
						name="content"
						value={comment}
						onChange={(e) => {
							e.preventDefault();
							setComment(e.target.value);
						}}
						className="border rounded w-full p-1"
					></textarea>
					{/* {state.errors?.content &&
						state.errors.content.map((error: string) => (
							<p className="text-sm text-red-500 p-1" key={error}>
								{error}
							</p>
						))} */}
					<button
						type="submit"
						// aria-disabled={isLoading}
						className="border rounded bg-gray-300 hover:bg-gray-400 active:bg-gray-500 hover:cursor-pointer px-1"
					>
						Comment
					</button>
				</form>
			)}
			<button
				onClick={() => {
					setIsEditing(!isEditing);
				}}
				className="border rounded bg-gray-300 hover:bg-gray-400 active:bg-gray-500 hover:cursor-pointer px-1 mx-1"
			>
				{!isEditing && <>Edit</>}
				{isEditing && <>Cancel</>}
			</button>
		</>
	);
}
