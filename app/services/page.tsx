import { SERVICES } from "@/lib/data";
import { SectionHeading } from "@/components/shared/section-heading";
import { CardService } from "@/components/shared/card-service";

export default function ServicesPage() {
	return (
		<section className="section">
			<div className="container">
				<SectionHeading
					title="All Services"
					subtitle="Clear, informative descriptions to help you choose the right care."
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
