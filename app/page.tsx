import { Suspense } from "react";
import ContactSection from "./ui/contact/ContactSection";
import ProjectsCarousel from "./ui/portfolio/ProjectsCarousel";
import ContactSectionSkeleton from "./ui/contact/ContactSectionSkeleton";

export default function Home() {
	return (
		<div className="flex justify-center text-center w-full p-1">
			<div>
				<h1 className="text-3xl">JW Portfolio</h1>
				<p>Welcome to my portfolio!</p>
				<ProjectsCarousel />
				<Suspense fallback={<ContactSectionSkeleton />}>
					<ContactSection />
				</Suspense>
			</div>
		</div>
	);
}
