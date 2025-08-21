import { SectionHeading } from "@/components/shared/section-heading";
import resources from "@/lib/resourcedata/resources.json";
import { notFound } from "next/navigation";
import { ContentBlocks } from "./content-blocks";

interface PageProps {
	params: { resourceId?: string[] };
}

export default function ResourcePage({ params }: PageProps) {
	const slug = params.resourceId?.[0];
	const resource = resources.find((r) => r.id === slug);

	if (!resource) {
		notFound();
	}

	return (
		<article className="section">
			<div className="container">
				<SectionHeading
					title={resource.title}
					subtitle="Educational resource"
				/>
				<div className="mt-6 text-lg leading-7">
					<ContentBlocks content={resource.content} />
				</div>
			</div>
		</article>
	);
}

export function generateStaticParams() {
	return resources.map((r) => ({ resourceId: [r.id] }));
}
