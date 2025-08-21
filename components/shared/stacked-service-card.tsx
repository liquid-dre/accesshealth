// components/shared/stacked-service-card.tsx
import { Card } from "@/components/ui/card";

type Tone = 0 | 1 | 2;

const tones = [
	{ bg: "bg-brand-blue50", dot: "bg-[color:var(--brand-blue)]" },
	{ bg: "bg-brand-red50", dot: "bg-[color:var(--brand-red)]" },
	{ bg: "bg-brand-mint", dot: "bg-emerald-500" },
];

export function StackedServiceCard({
	title,
	blurb,
	tone = 0,
}: {
	title: string;
	blurb: string;
	tone?: Tone;
}) {
	const t = tones[tone];
	return (
		<Card className="rounded-3xl hover:shadow-lift transition p-6">
			<div className={`h-12 w-12 rounded-2xl ${t.bg} grid place-items-center`}>
				<span className={`h-2 w-2 rounded-full ${t.dot}`} />
			</div>
			<h3 className="mt-4 text-xl font-semibold">{title}</h3>
			<p className="mt-2 text-muted-foreground">{blurb}</p>
		</Card>
	);
}
