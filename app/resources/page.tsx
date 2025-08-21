"use client";

import { SectionHeading } from "@/components/shared/section-heading";
import { Card } from "@/components/ui/card";
import resources from "@/lib/resourcedata/resources.json";
import { useEffect, useRef } from "react";
import gsap from "gsap";
import { cn } from "@/lib/utils";

interface Resource {
	id: string;
	title: string;
	content: string;
}

export default function ResourcesPage() {
	const scope = useRef<HTMLDivElement | null>(null);

	useEffect(() => {
		const cleanupFns: Array<() => void> = [];

		const ctx = gsap.context(() => {
			const cards = gsap.utils.toArray<HTMLElement>(".resource-card");

			// Load-in reveal (doesn't alter final layout)
			gsap.from(cards, {
				y: 36,
				opacity: 0,
				duration: 0.6,
				ease: "power2.out",
				stagger: 0.07,
				clearProps: "transform,opacity",
			});

			// Only bind hover for devices that actually support hover
			const canHover = matchMedia("(hover: hover) and (pointer: fine)").matches;

			if (canHover) {
				cards.forEach((card) => {
					// Ensure a clean baseline so layout stays aligned
					gsap.set(card, {
						y: 0,
						scale: 1,
						boxShadow: "0 6px 20px rgba(0,0,0,0.08)",
						transformOrigin: "center",
					});

					const tl = gsap.timeline({
						paused: true,
						defaults: { duration: 0.2, ease: "power2.out" },
					});
					tl.to(card, {
						y: -8,
						scale: 1.02,
						boxShadow: "0 12px 40px rgba(0,0,0,0.12)",
					});

					const onEnter = () => tl.play();
					const onLeave = () => tl.reverse();

					card.addEventListener("mouseenter", onEnter);
					card.addEventListener("mouseleave", onLeave);

					cleanupFns.push(() => {
						card.removeEventListener("mouseenter", onEnter);
						card.removeEventListener("mouseleave", onLeave);
					});
				});
			}
		}, scope);

		return () => {
			cleanupFns.forEach((fn) => fn());
			ctx.revert();
		};
	}, []);

	return (
		<section className="section" ref={scope}>
			<div className="container">
				<SectionHeading
					title="Educational resources"
					subtitle="Clear, accessible health guidance."
				/>

				{/* Equal-height grid rows: auto-rows: 1fr + cards with h-full */}
				<div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 auto-rows-fr">
					{resources.map((r: Resource) => (
						<Card
							key={r.id}
							className={cn(
								"resource-card h-full rounded-3xl p-6",
								"bg-white text-slate-900",
								// No CSS hover transforms—GSAP controls hover entirely
								"transition-[box-shadow,transform] will-change-transform"
							)}
						>
							<a
								className="font-semibold hover:underline underline-offset-4"
								href={`/resource/${r.id}`}
							>
								{r.title}
							</a>
							<p className="text-sm text-slate-500 mt-2">Read more.</p>
						</Card>
					))}
				</div>
			</div>
		</section>
	);
}
