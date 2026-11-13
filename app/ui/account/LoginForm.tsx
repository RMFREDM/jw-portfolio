"use client";

import { authenticate } from "@/app/lib/actions";
import { useActionState, useState } from "react";

export default function LoginForm() {
	// create teh form state
	const [errorMessage, formAction, isLoading] = useActionState(
		authenticate,
		undefined,
	);

	// use state to control form field values
	const [username, setUsername] = useState("");
	const [password, setPassword] = useState("");

	return (
		<div className="flex justify-center">
			<form
				action={formAction}
				className="p-1 grid grid-cols-1 grid-rows-4 w-fit"
			>
				<div id="username-section" className="flex flex-col p-1">
					<label htmlFor="username">Username</label>
					<input
						id="username"
						name="username"
						type="text"
						value={username}
						onChange={(e) => {
							e.preventDefault();
							setUsername(e.target.value);
						}}
						className="border rounded m-0.5"
					></input>
				</div>

				<div id="password-section" className="flex flex-col p-1">
					<label htmlFor="password">Password</label>
					<input
						id="password"
						name="password"
						type="password"
						value={password}
						onChange={(e) => {
							e.preventDefault();
							setPassword(e.target.value);
						}}
						className="border rounded m-0.5"
					></input>
				</div>

				<input type="hidden" name="redirectTo" value={"/"} />
				<button
					type="submit"
					aria-disabled={isLoading}
					className="align-center border rounded bg-gray-300 hover:bg-gray-400 active:bg-gray-500 disabled:bg-gray-100 h-fit w-fit px-1"
				>
					Log In
				</button>
				{errorMessage && (
					<p className="mt-2 text-sm text-red-500 w-65">
						{errorMessage}
					</p>
				)}
			</form>
		</div>
	);
}
