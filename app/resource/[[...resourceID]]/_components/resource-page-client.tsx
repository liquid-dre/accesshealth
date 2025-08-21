import { ContentBlocks, type Block } from "@/components/resources/ContentBlocks";

interface ResourceClientPageProps {
	title: string;
	subtitle: string;
	content: Block[]; // Blocks or similar data consumed by ContentBlocks
}

export const ResourceClientPage = ({
	title,
	subtitle,
	content,
}: ResourceClientPageProps) => (
	<article className="max-w-3xl mx-auto px-6 py-12">
		<header className="mb-12">
			<h1 className="text-4xl font-bold mb-4">{title}</h1>
			<p className="text-xl text-gray-600">{subtitle}</p>
		</header>

		{/* ContentBlocks is responsible for rendering blocks (markdown, images, etc.) */}
		<section className="prose prose-lg max-w-none">
			<ContentBlocks blocks={content} />
		</section>
	</article>
);

export default ResourceClientPage;