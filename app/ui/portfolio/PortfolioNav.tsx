import Link from "next/link";
import AccountNavSection from "../account/AccountNavSection";

export default function PortfolioNav() {
	return (
		<nav
			id="portfolio-nav"
			className="bg-sky-100 rounded h-10 flex flex-row p-1 justify-evenly"
		>
			<Link
				href={"/"}
				className="text-default active:text-indigo-800 active:tracking-wide w-5 p-1"
			>
				Home
			</Link>
			<Link
				href={"/articles"}
				className="text-default active:text-indigo-800 active:tracking-wide w-5 p-1"
			>
				Articles
			</Link>
			<AccountNavSection />
		</nav>
	);
}
