"use client";

import { useState } from "react";

export default function LoginForm() {
	// use state to control form field values
	const [username, setUsername] = useState("");
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");

	return (
		<div className="flex justify-center">
			<form className="p-1 grid grid-cols-1 grid-rows-4 w-fit">
				<div id="username-section" className="flex justify-between p-1">
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
						className="border rounded m-1"
					></input>
				</div>

				<div id="password-section" className="flex justify-between p-1">
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
						className="border rounded m-1"
					></input>
				</div>

				<button
					type="submit"
					className="align-center border rounded bg-gray-300 active:bg-gray-500 h-fit w-fit px-1"
				>
					Submit
				</button>
			</form>
		</div>
	);
}
