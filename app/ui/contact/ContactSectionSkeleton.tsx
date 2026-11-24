import Link from "next/link";

export default function ContactSectionSkeleton() {
	return (
		<div id="contact-section" className="p-1 m-1">
			<h2 className="text-xl">Contact me!</h2>
			<p className="animate-pulse">
				<Link
					href="/login"
					className="text-blue-500 hover:text-blue-700 active:text-indigo-800 hover:tracking-wide"
				>
					Log in
				</Link>{" "}
				to contact me.
			</p>
		</div>
	);
}
