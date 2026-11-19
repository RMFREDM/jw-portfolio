"use client";

import { useState } from "react";

export default function ContactForm() {
	// control the form values with state
	const [message, setMessage] = useState("");

	return (
		<form
			id="contact-form"
			className="border rounded bg-gray-200 w-fit p-1"
		>
			<div id="message-section" className="flex justify-center">
				<label htmlFor="message">Message</label>
				<textarea
					id="message"
					name="message"
					value={message}
					onChange={(e) => {
						e.preventDefault();
						setMessage(e.target.value);
					}}
					className="border rounded bg-white m-1"
				/>
			</div>

			<button
				type="submit"
				// aria-disabled={isLoading}
				className="align-center border rounded bg-gray-300 hover:bg-gray-400 active:bg-gray-500 disabled:bg-gray-100 h-fit w-fit px-1"
			>
				Submit
			</button>
		</form>
	);
}
