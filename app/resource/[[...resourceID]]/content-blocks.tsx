// "use client";

// import { useEffect, useRef } from "react";
// import gsap from "gsap";
// import { ScrollTrigger } from "gsap/ScrollTrigger";

// gsap.registerPlugin(ScrollTrigger);

// interface ContentBlocksProps {
// 	content: string;
// }

// export function ContentBlocks({ content }: ContentBlocksProps) {
// 	const blocksRef = useRef<HTMLElement[]>([]);

// 	useEffect(() => {
// 		blocksRef.current.forEach((block) => {
// 			if (!block) return;
// 			gsap.from(block, {
// 				scrollTrigger: { trigger: block, start: "top 80%" },
// 				y: 40,
// 				opacity: 0,
// 				duration: 0.6,
// 				ease: "power2.out",
// 			});
// 		});
// 	}, []);

// 	const paragraphs = content.split(/\n+/).filter(Boolean);

// 	return (
// 		<div className="space-y-4">
// 			{paragraphs.map((text, i) => (
// 				<p key={i} ref={(el) => (blocksRef.current[i] = el!)}>
// 					{text}
// 				</p>
// 			))}
// 		</div>
// 	);
// }
