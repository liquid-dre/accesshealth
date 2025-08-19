// components/home/services-grid.tsx
import { SERVICES } from "@/lib/data";
import { SectionHeading } from "@/components/shared/section-heading";
import { StackedServiceCard } from "@/components/shared/stacked-service-card";

export function ServicesGrid() {
	return (
		<section className="section">
			<div className="container">
				<SectionHeading
					title="Services that meet you where you are"
					subtitle="From routine GP visits to ultrasound and chronic care, all under one roof."
				/>
				<div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
					{SERVICES.map((s, i) => (
						<StackedServiceCard
							key={s.slug}
							title={s.title}
							blurb={s.blurb}
							tone={i % 3}
						/>
					))}
				</div>
			</div>
		</section>
	);
}
