import { SERVICES } from "@/lib/data";
import { SectionHeading } from "@/components/shared/section-heading";
import { CardService } from "@/components/shared/card-service";

export function ServicesGrid() {
	return (
		<section className="section bg-white">
			<div className="container">
				<SectionHeading
					title="Our Services"
					subtitle="Comprehensive care tailored to your family’s needs."
				/>
				<div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
					{SERVICES.map((s) => (
						<CardService key={s.slug} title={s.title} blurb={s.blurb} />
					))}
				</div>
			</div>
		</section>
	);
}
