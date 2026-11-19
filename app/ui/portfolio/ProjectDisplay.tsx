import { Project } from "@/app/lib/definitions";
import Link from "next/link";
import Image from "next/image";

export default function ProjectDisplay(props: { project: Project }) {
	return (
		<Link href={props.project.url} className="hover:cursor-pointer">
			<div className="border rounded bg-gray-200 w-100 h-80 p-2 m-5">
				{props.project.image && (
					<Image
						src={`/${props.project.image}.png`}
						alt={`Image of the project: ${props.project.title}`}
						width={400}
						height={275}
					/>
				)}
				<p>{props.project.title}</p>
			</div>
		</Link>
	);
}
