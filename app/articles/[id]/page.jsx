import { Suspense } from "react";
import ArticleDetails from "../../ui/articles/ArticleDetails";
import ArticleDetailsSkeleton from "../../ui/articles/ArticleDetailsSkeleton";

export default async function Page(props: { params: Promise<{ id: string }> }) {
	return (
		<Suspense fallback={<ArticleDetailsSkeleton />}>
			<ArticleDetails props={props} />
		</Suspense>
	);
}