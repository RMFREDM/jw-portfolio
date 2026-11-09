import ProjectsCarousel from "./ui/portfolio/ProjectsCarousel";

export default function Home() {
	return (
		<div className="flex flex-col justify-center w-full p-1">
			<h1 className="text-3xl">JW Portfolio</h1>
			<p>Welcome to my portfolio!</p>
			<ProjectsCarousel />
		</div>
	);
}
