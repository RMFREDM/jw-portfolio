import Link from "next/link";
import CreateAccountForm from "../ui/account/CreateAccountForm";

export default function Page() {
	return (
		<>
			<h1 className="text-3xl flex justify-center">Create Account</h1>
			<p className="flex justify-center">
				Already have an account?{" "}
				<Link
					href={"/login"}
					className="text-blue-500 hover:text-blue-700 active:text-indigo-800 pl-1"
				>
					Log in
				</Link>
				!
			</p>
			<CreateAccountForm />
		</>
	);
}
