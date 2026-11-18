import { Project } from "@/app/lib/definitions";
import Link from "next/link";
import Image from "next/image";

export default function ProjectDisplay(props: { project: Project }) {
	return (
		<Link href={props.project.url} className="w-fit hover:cursor-pointer">
			<div className="border rounded">
				{props.project.image && (
					<Image
						src={props.project.image}
						alt={`Image of the project: ${props.project.title}`}
					/>
				)}
				<p>{props.project.title}</p>
			</div>
		</Link>
	);
}
