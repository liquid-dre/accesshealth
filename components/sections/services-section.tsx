import { SectionHeading } from "@/components/shared/section-heading";
import { ServicesCarousel } from "./services-carousel";

export function ServicesSection() {
	return (
		<section className="section">
			<div className="container">
				<SectionHeading
					title="Services that meet you where you are"
					subtitle="From routine GP visits to ultrasound and chronic care, all under one roof."
				/>
				<ServicesCarousel />
			</div>
		</section>
	);
}
