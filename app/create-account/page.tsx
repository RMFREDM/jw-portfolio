import Link from "next/link";

export default function Page() {
	return (
		<>
			<h1 className="text-3xl">Create Account</h1>
			<p>
				Already have an account?{" "}
				<Link
					href={"/login"}
					className="text-blue-500 active:text-indigo-800"
				>
					Log in
				</Link>
				!
			</p>
			<form>create account form</form>
		</>
	);
}
