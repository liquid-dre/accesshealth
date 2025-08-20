// app/(site)/resources/page.tsx
import { SectionHeading } from "@/components/shared/section-heading";
import { Card } from "@/components/ui/card";
import resources from "@/lib/resourcedata/resources.json";

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
							key={r.id}
							className="rounded-3xl p-6 hover:shadow-lift transition"
						>
							<a
								className="font-semibold hover:underline"
								href={`/resource/${r.id}`}
							>
								{r.title}
							</a>
							<p className="text-sm text-gray-600 mt-2">Read more.</p>
						</Card>
					))}
				</div>
			</div>
		</section>
	);
}
