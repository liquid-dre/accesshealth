// components/ContentBlocks.tsx
import Image from "next/image";

export interface Block {
	type: string;
	[key: string]: unknown;
}

interface ContentBlocksProps {
	blocks: Block[];
}

export const ContentBlocks: React.FC<ContentBlocksProps> = ({ blocks }) => (
	<div className="space-y-6">
		{blocks.map((block, idx) => {
			switch (block.type) {
				case "heading":
					return (
						<h2 key={idx} className="text-2xl font-bold">
							{block.text}
						</h2>
					);
				case "subheading":
					return (
						<h3 key={idx} className="text-xl font-semibold">
							{block.text}
						</h3>
					);
				case "paragraph":
					return (
						<p key={idx} className="leading-relaxed">
							{block.text}
						</p>
					);
				case "image":
					return (
						<figure key={idx} className="my-6">
							<Image
								src={block.src}
								alt={block.alt || ""}
								width={block.width || 800}
								height={block.height || 450}
								className="rounded-lg"
							/>
							{block.caption && (
								<figcaption className="mt-2 text-sm text-center text-gray-500">
									{block.caption}
								</figcaption>
							)}
						</figure>
					);
				case "list":
					return (
						<ul key={idx} className="list-disc list-inside">
							{block.items.map((item: string, i: number) => (
								<li key={i}>{item}</li>
							))}
						</ul>
					);
				default:
					return null;
			}
		})}
	</div>
);
