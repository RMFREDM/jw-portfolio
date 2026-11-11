import Link from "next/link";
import LoginForm from "../ui/account/LoginForm";

export default function Page() {
	return (
		<>
			<h1 className="text-3xl flex justify-center">Log In</h1>
			<p className="flex justify-center">
				No account?{" "}
				<Link
					href={"/create-account"}
					className="text-blue-500 hover:text-blue-700 active:text-indigo-800 pl-1"
				>
					Create one
				</Link>
				!
			</p>
			<LoginForm />
		</>
	);
}
