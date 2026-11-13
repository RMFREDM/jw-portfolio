import { getUsernameBEmail } from "@/app/lib/data";
import { auth, signOut } from "@/auth";
import Link from "next/link";

export default async function AccountNavSection() {
	// check if there is a user
	const session = await auth();
	const userSession = session?.user;
	let username;
	if (userSession) {
		username = (await getUsernameBEmail(userSession?.email!))?.username;
	}

	return (
		<div className="w-57 p-1">
			{!userSession && (
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
			{userSession && (
				<div className="flex justify-between">
					<p>{username}</p>
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
				</div>
			)}
		</div>
	);
}
