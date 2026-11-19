import { auth } from "@/auth";
import ContactForm from "./ContactForm";
import Link from "next/link";

export default async function ContactSection() {
	const user = (await auth())?.user;

	return (
		<div id="contact-section" className="p-1 m-1">
			<h2 className="text-xl">Contact me!</h2>
			{!user && (
				<p>
					<Link
						href="/login"
						className="text-default hover:text-blue-500 active:text-indigo-800 hover:tracking-wide"
					>
						Log in
					</Link>{" "}
					to contact me.
				</p>
			)}
			{user && <ContactForm />}
		</div>
	);
}
