import ProjectsCarousel from "./ui/portfolio/ProjectsCarousel";

export default function Home() {
	return (
		<div className="flex justify-center text-center w-full p-1">
			<div>
				<h1 className="text-3xl">JW Portfolio</h1>
				<p>Welcome to my portfolio!</p>
				<ProjectsCarousel />
			</div>
		</div>
	);
}
