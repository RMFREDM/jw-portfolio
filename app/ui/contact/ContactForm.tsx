"use client";

import { MessageState, createMessage } from "@/app/lib/actions";
import { useActionState, useState } from "react";

export default function ContactForm() {
	// control the form values with state
	const [message, setMessage] = useState("");

	// create the form state
	const initialState: MessageState = {};
	const [state, formAction, isLoading] = useActionState(
		createMessage,
		initialState,
	);

	return (
		<form
			id="contact-form"
			action={formAction}
			className="border rounded bg-gray-200 w-fit p-1"
		>
			<div id="message-section" className="flex justify-center">
				<label htmlFor="message" className="m-1">
					Message
				</label>
				<textarea
					id="message"
					name="message"
					value={message}
					onChange={(e) => {
						e.preventDefault();
						setMessage(e.target.value);
					}}
					className="border rounded bg-white w-100 m-1"
				/>
			</div>
			{state.errors?.message &&
				state.errors.message.map((error: string) => (
					<p
						className="mt-2 text-sm text-red-500 w-65 my-1"
						key={error}
					>
						{error}
					</p>
				))}

			<button
				type="submit"
				aria-disabled={isLoading}
				className="align-center border rounded bg-gray-300 hover:bg-gray-400 active:bg-gray-500 disabled:bg-gray-100 h-fit w-fit px-1"
			>
				Submit
			</button>
		</form>
	);
}
