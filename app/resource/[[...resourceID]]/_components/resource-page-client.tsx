"use client";

import { useRef, useEffect } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { MotionPathPlugin } from "gsap/MotionPathPlugin";
import {
	ContentBlocks,
	type Block,
} from "@/components/resources/ContentBlocks";

gsap.registerPlugin(ScrollTrigger, MotionPathPlugin);

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
	const circleRef = useRef<SVGCircleElement>(null);

	useEffect(() => {
		const prefersReduced = window.matchMedia(
			"(prefers-reduced-motion: reduce)"
		).matches;
		if (prefersReduced) return;

		const ctx = gsap.context(() => {
			const container = containerRef.current;
			const path = pathRef.current;
			const circle = circleRef.current;
			if (!container || !path || !circle) return;

			const length = path.getTotalLength();
			gsap.set(path, {
				strokeDasharray: length,
				strokeDashoffset: length,
			});

			const tl = gsap.timeline({
				scrollTrigger: {
					trigger: container,
					start: "top 10%",
					end: "bottom top",
					scrub: true,
				},
			});

			// tl.fromTo(
			// 	path,
			// 	{ strokeDashoffset: length },
			// 	{ strokeDashoffset: 0, duration: 1, ease: "none" }
			// )
			tl.to(path, {
				strokeDashoffset: 0,
				duration: 1,
				ease: "power2.out", // same easing as the circle
			}).to(
				circle,
				{
					motionPath: {
						path,
						align: path,
						alignOrigin: [0.5, 0.5],
					},
					duration: 1,
					ease: "power2.out",
				},
				0
			);
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
				className="pointer-events-none absolute top-0 left-full ml-8 h-full w-32"
				fill="none"
				viewBox="0 0 100 1000"
			>
				{/* ECG Line */}
				<path
					ref={pathRef}
					d="M50 0 L50 80 L45 90 L50 100 L50 120 L90 130 L50 140 L20 150 L50 160 L50 200 L45 210 L50 220 L50 240 L90 250 L50 260 L20 270 L50 280 L50 320 L45 330 L50 340 L50 360 L90 370 L50 380 L20 390 L50 400 L50 440 L45 450 L50 460 L50 480 L90 490 L50 500 L20 510 L50 520 L50 560 L45 570 L50 580 L50 600 L90 610 L50 620 L20 630 L50 640 L50 680 L45 690 L50 700 L50 720 L90 730 L50 740 L20 750 L50 760 L50 800 L45 810 L50 820 L50 840 L90 850 L50 860 L20 870 L50 880 L50 920 L45 930 L50 940 L50 960 L90 970 L50 980 L20 990 L50 1000"
					className="squiggle stroke-[#0863C5] dark:stroke-[#D3E8FE] "
					style={{
						strokeWidth: 2,
						strokeDasharray: "none",
						willChange: "stroke-dashoffset",
					}}
				/>
				<circle
					ref={circleRef}
					r={6}
					fill="currentColor"
					className="text-[#0863C5] dark:text-[#D3E8FE]"
				/>
			</svg>
		</article>
	);
};

export default ResourceClientPage;
