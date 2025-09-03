import { notFound } from "next/navigation";
import resources from "@/lib/resourcedata/resources.json";
import { ResourceClientPage } from "./_components/resource-page-client";
import type { Block } from "@/components/resources/ContentBlocks";

interface Resource {
	id: string | string[];
	title: string;
	content: string | Block[];
}
interface ResourcePageProps {
        params: Promise<{ resourceId?: string | string[] }>;
}

export default async function ResourcePage({ params }: ResourcePageProps) {
        const { resourceId } = await params;
        const slug = resourceId?.[0];
        const resource = (resources as Resource[]).find((r) => r.id === slug);

	if (!resource) {
		notFound();
	}

	const contentBlocks: Block[] = Array.isArray(resource.content)
		? resource.content
		: [{ type: "paragraph", text: resource.content }];

	return (
		<ResourceClientPage
			title={resource.title}
			subtitle="Educational resource"
			content={contentBlocks}
		/>
	);
}

export function generateStaticParams() {
	return (resources as Resource[]).map((r) => ({ resourceId: [r.id] }));
}
