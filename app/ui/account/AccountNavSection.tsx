import Link from "next/link";

export default function AccountNavSection() {
	return (
		<div>
			<Link
				href="/login"
				className="text-default active:text-indigo-800 active:tracking-wide p-1"
			>
				Log In
			</Link>{" "}
			or <Link href="/create-account">Create an Account</Link>
		</div>
	);
}
