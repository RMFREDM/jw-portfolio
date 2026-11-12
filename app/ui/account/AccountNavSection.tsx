import { auth, signOut } from "@/auth";
import Link from "next/link";

export default async function AccountNavSection() {
	const session = await auth();
	const user = session?.user;
	return (
		<div className="w-57 p-1">
			{!user && (
				<>
					<Link
						href="/login"
						className="text-default hover:text-blue-500 active:text-indigo-800 hover:tracking-wide"
					>
						Log In
					</Link>{" "}
					or{" "}
					<Link
						href="/create-account"
						className="text-default hover:text-blue-500 active:text-indigo-800 hover:tracking-wide"
					>
						Create an Account
					</Link>
				</>
			)}
			{user && (
				<form
					action={async () => {
						"use server";
						await signOut({ redirectTo: "/" });
					}}
				>
					<button className="text-default hover:text-blue-500 active:text-indigo-800 hover:tracking-wide hover:cursor-pointer">
						Log Out
					</button>
				</form>
			)}
		</div>
	);
}
