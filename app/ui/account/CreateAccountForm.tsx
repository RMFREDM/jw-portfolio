"use client";

import { AccountState, createAccount } from "@/app/lib/actions";
import { useActionState, useState } from "react";

export default function CreateAccountForm() {
	// create the form state
	const initialState: AccountState = {};
	const [state, formAction, isLoading] = useActionState(
		createAccount,
		initialState,
	);

	// use state to control form field values
	const [username, setUsername] = useState("");
	const [email, setEmail] = useState("");
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
						className="border rounded w-65 m-0.5"
					></input>
					{state.errors?.username &&
						state.errors.username.map((error: string) => (
							<p
								className="mt-2 text-sm text-red-500"
								key={error}
							>
								{error}
							</p>
						))}
				</div>

				<div id="email-section" className="flex flex-col p-1">
					<label htmlFor="email">Email</label>
					<input
						id="email"
						name="email"
						type="email"
						value={email}
						onChange={(e) => {
							e.preventDefault();
							setEmail(e.target.value);
						}}
						className="border rounded w-65 m-0.5"
					></input>
					{state.errors?.email &&
						state.errors.email.map((error: string) => (
							<p
								className="mt-2 text-sm text-red-500 w-65"
								key={error}
							>
								{error}
							</p>
						))}
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
						className="border rounded w-65 m-0.5"
					></input>
					{state.errors?.password &&
						state.errors.password.map((error: string) => (
							<p
								className="mt-2 text-sm text-red-500 w-65"
								key={error}
							>
								{error}
							</p>
						))}
				</div>

				<button
					type="submit"
					aria-disabled={isLoading}
					className="align-center border rounded bg-gray-300 hover:bg-gray-400 active:bg-gray-500 disabled:bg-gray-100 h-fit w-fit px-1"
				>
					Submit
				</button>
				{state.message && (
					<p className="mt-2 text-sm text-red-500 w-65">
						{state.message}
					</p>
				)}
			</form>
		</div>
	);
}
