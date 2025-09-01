"use client";

import { SectionHeading } from "@/components/shared/section-heading";
import resourcesData from "@/lib/resourcedata/resources.json";
import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ResourceCard } from "@/components/resources/ResourceCard";
import { EducationalHighlight } from "@/components/resources/EducationalHighlight";
import { Ribbon, type LucideIcon } from "lucide-react";
import { BentoGallery } from "@/components/resources/BentoGallery";

type ResourceContent =
	| { type: "heading"; text: string }
	| { type: "paragraph"; text: string }
	| { type: "image"; src: string; alt: string; caption?: string }
	| { type: "list" | "orderedList"; items: string[] }
	| { type: "blockquote"; text: string }
	| { type: "link"; href: string; text: string };

interface Resource {
	id: string;
	title: string;
	content: ResourceContent[];
	featured?: boolean;
	theme?: { background: string; text: string; icon?: string };
	[key: string]: unknown;
}

const resources = resourcesData as Resource[];
const iconMap: Record<string, LucideIcon> = { ribbon: Ribbon };
const featured = resources.find((r) => r.featured)!;
const others = resources.filter((r) => !r.featured);
const featuredTheme = featured.theme
	? {
			background: featured.theme.background,
			text: featured.theme.text,
			icon: featured.theme.icon ? iconMap[featured.theme.icon] : undefined,
		}
	: { background: "", text: "" };

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
					const isDarkMode =
						document.documentElement.classList.contains("dark");
					const baseShadow = isDarkMode
						? "0 6px 20px rgba(0,0,0,0.3)"
						: "0 6px 20px rgba(0,0,0,0.08)";
					const hoverShadow = isDarkMode
						? "0 12px 40px rgba(0,0,0,0.4)"
						: "0 12px 40px rgba(0,0,0,0.12)";
					gsap.set(card, {
						y: 0,
						scale: 1,
						boxShadow: baseShadow,
						transformOrigin: "center",
					});

					const tl = gsap
						.timeline({
							paused: true,
							defaults: {
								duration: 0.1,
								ease: "power4.out",
							},
						})
						.to(card, {
							y: 8,
							scale: 1.02,
							boxShadow: hoverShadow,
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
		<section className="section bg-muted/50" ref={scope}>
			<div className="container">
				<BentoGallery />
				<SectionHeading
					title="Educational resources"
					subtitle="Clear, accessible health guidance."
				/>

				<EducationalHighlight
					resource={featured}
					theme={featuredTheme}
					badge="Monthly Featured Resource"
					showViewAll={false}
				/>

				{/* Equal-height grid rows: auto-rows: 1fr + cards with h-full */}
				<div className="mt-12 grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3 auto-rows-fr">
					{others.map((r: Resource) => (
						<ResourceCard key={r.id} {...r} className="resource-card h-full" />
					))}
				</div>
			</div>
		</section>
	);
}
