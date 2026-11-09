import Link from "next/link";

export default function Page() {
	return (
		<>
			<h1 className="text-3xl">Log In</h1>
			<p>
				No account?{" "}
				<Link
					href={"/create-account"}
					className="text-blue-500 active:text-indigo-800"
				>
					Create one
				</Link>
				!
			</p>
			<form>login form</form>
		</>
	);
}
