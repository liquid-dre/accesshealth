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
					title="Educational Resources"
					subtitle="Trusted information to support your health journey."
				/>
				<div className="grid md:grid-cols-2 gap-6">
					{resources.map((r) => (
						<Card
							key={r.title}
							className="p-6 bg-white rounded-2xl border hover:shadow-soft transition"
						>
							<a href={r.href} className="font-semibold hover:underline">
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
