// // "use client";

// import { useEffect, useRef } from "react";
// import gsap from "gsap";
// import { SectionHeading } from "@/components/shared/section-heading";
// import resources from "@/lib/resourcedata/resources.json";
// import { notFound } from "next/navigation";
// import { ContentBlocks } from "./content-blocks";

// interface PageProps {
// 	params: { resourceId?: string[] };
// }

// export default function ResourcePage({ params }: PageProps) {
// 	const slug = params.resourceId?.[0];
// 	const resource = resources.find((r) => r.id === slug);

// 	const headerRef = useRef<HTMLDivElement | null>(null);

// 	useEffect(() => {
// 		if (!headerRef.current) return;
// 		gsap.from(headerRef.current, {
// 			y: -20,
// 			opacity: 0,
// 			duration: 0.6,
// 			ease: "power1.out",
// 			delay: 0.2,
// 		});
// 	}, []);

// 	if (!resource) {
// 		notFound();
// 	}

// 	return (
// 		<article className="section">
// 			<div className="container">
// 				<div ref={headerRef}>
// 					<SectionHeading
// 						title={resource.title}
// 						subtitle="Educational resource"
// 					/>
// 				</div>
// 				<div className="mt-6 text-lg leading-7">
// 					<ContentBlocks content={resource.content} />
// 				</div>
// 			</div>
// 		</article>
// 	);
// }

// export function generateStaticParams() {
// 	return resources.map((r) => ({ resourceId: [r.id] }));
// }
import { notFound } from "next/navigation";
import resources from "@/lib/resourcedata/resources.json";
import { ResourceClientPage } from "./_components/resource-page-client";
import type { Block } from "@/components/resources/ContentBlocks";

interface Resource {
	id: string;
	title: string;
	content: string | Block[];
}
interface ResourcePageProps {
	params: { resourceId?: string[] };
}

export default function ResourcePage({ params }: ResourcePageProps) {
	const slug = params.resourceId?.[0];
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
