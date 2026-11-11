import Link from "next/link";

export default function AccountNavSection() {
	return (
		<div className="w-57 p-1">
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
		</div>
	);
}
