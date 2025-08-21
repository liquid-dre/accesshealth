// components/ContentBlocks.tsx
import Image from "next/image";
import type { StaticImport } from "next/dist/shared/lib/get-img-props";
import type { ReactNode } from "react";

export interface HeadingBlock {
	type: "heading";
	text: ReactNode;
}

export interface SubheadingBlock {
	type: "subheading";
	text: ReactNode;
}

export interface ParagraphBlock {
	type: "paragraph";
	text: ReactNode;
}

export interface ImageBlock {
	type: "image";
	src: string | StaticImport;
	alt?: string;
	width?: number;
	height?: number;
	caption?: ReactNode;
}

export interface ListBlock {
	type: "list";
	items: string[];
}
export interface OrderedListBlock {
	type: "orderedList";
	items: string[];
}

export interface BlockquoteBlock {
	type: "blockquote";
	text: ReactNode;
}

export interface LinkBlock {
	type: "link";
	text: ReactNode;
	href: string;
}

export type Block =
	| HeadingBlock
	| SubheadingBlock
	| ParagraphBlock
	| ImageBlock
	| ListBlock
	| OrderedListBlock
	| BlockquoteBlock
	| LinkBlock;

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
							{block.items.map((item, i) => (
								<li key={i}>{item}</li>
							))}
						</ul>
					);
				case "orderedList":
					return (
						<ol key={idx} className="list-decimal list-inside">
							{block.items.map((item, i) => (
								<li key={i}>{item}</li>
							))}
						</ol>
					);
				case "blockquote":
					return (
						<blockquote
							key={idx}
							className="border-l-4 border-gray-300 pl-4 italic"
						>
							{block.text}
						</blockquote>
					);
				case "link":
					return (
						<a
							key={idx}
							href={block.href}
							className="text-blue-600 hover:underline"
						>
							{block.text}
						</a>
					);
				default:
					return null;
			}
		})}
	</div>
);
