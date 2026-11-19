import { Project } from "@/app/lib/definitions";
import ProjectDisplay from "./ProjectDisplay";

export default function ProjectsCarousel() {
	// define a list to hold the projects
	const projectsList: Array<Project> = [
		{
			title: "App Router Code-along",
			image: "app-router",
			url: "https://tesd-1000-app-router-code-along.vercel.app/",
		},
		{
			title: "Recipe Database",
			image: "recipe-db",
			url: "https://recipe-db-orpin.vercel.app/",
		},
		{
			title: "TESD 1000 Code-alongs",
			image: "tesd-1000",
			url: "https://tesd-1000.vercel.app/",
		},
	];

	return (
		<div
			id="project-carousel"
			className="border rounded bg-sky-100 p-1 md:w-200"
		>
			<h2 className="text-xl">View my projects!</h2>
			<div className=" flex justify-between overflow-scroll">
				{projectsList.map((project) => (
					<div key={project.title}>
						<ProjectDisplay project={project} />
					</div>
				))}
			</div>
		</div>
	);
}
