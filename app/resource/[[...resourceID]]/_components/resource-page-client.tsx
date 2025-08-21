"use client";

import { useRef, useEffect } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import {
	ContentBlocks,
	type Block,
} from "@/components/resources/ContentBlocks";

interface ResourceClientPageProps {
	title: string;
	subtitle: string;
	content: Block[]; // Blocks or similar data consumed by ContentBlocks
}

export const ResourceClientPage = ({
	title,
	subtitle,
	content,
}: ResourceClientPageProps) => {
	const containerRef = useRef<HTMLElement>(null);
	const pathRef = useRef<SVGPathElement>(null);

	useEffect(() => {
		const prefersReduced = window.matchMedia(
			"(prefers-reduced-motion: reduce)"
		).matches;
		if (prefersReduced) return;

		const ctx = gsap.context(() => {
			const container = containerRef.current;
			const path = pathRef.current;
			if (!container || !path) return;

			const length = path.getTotalLength();
			gsap.set(path, {
				strokeDasharray: length,
				strokeDashoffset: length,
			});

			gsap.to(path, {
				strokeDashoffset: 0,
				ease: "none",
				scrollTrigger: {
					trigger: container,
					start: "top top",
					end: "bottom bottom",
					scrub: true,
				},
			});
		}, containerRef);

		return () => ctx.revert();
	}, []);

	return (
		<article
			ref={containerRef}
			className="relative max-w-3xl mx-auto px-6 py-12"
		>
			<header className="mb-12">
				<h1 className="text-4xl font-bold mb-4">{title}</h1>
				<p className="text-xl text-gray-600">{subtitle}</p>
			</header>

			{/* ContentBlocks is responsible for rendering blocks (markdown, images, etc.) */}
			<section className="prose prose-lg max-w-none">
				<ContentBlocks blocks={content} />
			</section>

			<svg
				className="pointer-events-none absolute inset-0 h-full w-full"
				fill="none"
				viewBox="0 0 100 1000"
			>
				<path
					ref={pathRef}
					d="M50 0 Q75 100 50 200 T50 400 T50 600 T50 800 T50 1000"
					className="squiggle stroke-gray-300"
					style={{
						strokeWidth: 2,
						strokeDasharray: "4 8",
						willChange: "stroke-dashoffset",
					}}
				/>
			</svg>
		</article>
	);
};

export default ResourceClientPage;
