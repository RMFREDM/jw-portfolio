"use client";

import { CommentState, createComment } from "@/app/lib/actions";
import { useState, useActionState } from "react";

export default function CommentForm(props: { articleId: string }) {
	// control the comment value with state
	const [comment, setComment] = useState("");

	// create the form state
	const createCommentWithArticleId = createComment.bind(
		null,
		props.articleId,
	);
	const initialState: CommentState = {};
	const [state, formAction, isLoading] = useActionState(
		createCommentWithArticleId,
		initialState,
	);

	return (
		<form action={formAction} className="p-2">
			<label htmlFor="content">Make a Comment</label>
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
			{state.errors?.content &&
				state.errors.content.map((error: string) => (
					<p className="text-sm text-red-500 p-1" key={error}>
						{error}
					</p>
				))}
			<button
				type="submit"
				aria-disabled={isLoading}
				className="border rounded bg-gray-300 hover:bg-gray-400 active:bg-gray-500 hover:cursor-pointer px-1"
			>
				Comment
			</button>
		</form>
	);
}
