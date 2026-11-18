import { Project } from "@/app/lib/definitions";
import ProjectDisplay from "./ProjectDisplay";

export default function ProjectsCarousel() {
	// define a list to hold the projects
	const projectsList: [Project] = [
		{
			title: "App Router Code-along",
			image: "",
			url: "https://tesd-1000-app-router-code-along.vercel.app/",
		},
	];

	return (
		<div
			id="project-carousel"
			className="border rounded bg-sky-100 p-1 md:w-200"
		>
			<nav>
				<button className="border rounded bg-gray-300 hover:bg-gray-400 active:bg-gray-500 hover:cursor-pointer h-fit px-1 ml-1">
					Next
				</button>
			</nav>

			{projectsList.map((project) => (
				<div key={project.title}>
					<ProjectDisplay project={project} />
				</div>
			))}
		</div>
	);
}
