import Link from "next/link";
import AccountNavSection from "../account/AccountNavSection";
import { Suspense } from "react";
import AccountNavSectionSkeleton from "../account/AccountNavSectionSkeleton";

export default function PortfolioNav() {
	return (
		<nav
			id="portfolio-nav"
			className="bg-sky-100 rounded h-10 flex flex-row p-1 justify-evenly"
		>
			<Link
				href={"/"}
				className="text-default hover:text-blue-500 hover:tracking-wide active:text-indigo-800 w-5 p-1"
			>
				Home
			</Link>
			<Link
				href={"/articles"}
				className="text-default hover:text-blue-500 hover:tracking-wide active:text-indigo-800 w-5 p-1"
			>
				Articles
			</Link>
			<Suspense fallback={<AccountNavSectionSkeleton />}>
				<AccountNavSection />
			</Suspense>
		</nav>
	);
}
