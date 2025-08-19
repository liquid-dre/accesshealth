// app/(site)/resources/page.tsx
import { SectionHeading } from "@/components/shared/section-heading";
import { Card } from "@/components/ui/card";

const resources = [
	{ title: "Managing Hypertension at Home", href: "#" },
	{ title: "Childhood Vaccination Schedule", href: "#" },
	{ title: "Understanding Ultrasound Scans", href: "#" },
];

export default function ResourcesPage() {
	return (
		<section className="section">
			<div className="container">
				<SectionHeading
					title="Educational resources"
					subtitle="Clear, accessible health guidance."
				/>
				<div className="grid md:grid-cols-2 gap-6">
					{resources.map((r) => (
						<Card
							key={r.title}
							className="rounded-3xl p-6 hover:shadow-lift transition"
						>
							<a className="font-semibold hover:underline" href={r.href}>
								{r.title}
							</a>
							<p className="text-sm text-gray-600 mt-2">Coming soon.</p>
						</Card>
					))}
				</div>
			</div>
		</section>
	);
}
