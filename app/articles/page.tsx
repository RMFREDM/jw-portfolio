import { Suspense } from "react";
import ArticlesList from "../ui/articles/ArticlesList";
import ArticlesListSkeleton from "../ui/articles/ArticlesListSkeleton";
import { Metadata } from "next";

export const metadata: Metadata = {
	title: "Articles",
};

export default function Page() {
	return (
		<div className="flex justify-center text-center w-full p-1">
			<div>
				<h1 className="text-3xl">JW Articles</h1>
				<p>Read my articles!</p>
				<Suspense fallback={<ArticlesListSkeleton />}>
					<ArticlesList />
				</Suspense>
			</div>
		</div>
	);
}
