import { ContactCTA } from "@/components/hero/contact-cta";
import { Hero } from "@/components/hero/hero";
import { Testimonials } from "@/components/hero/testimonials";
import { ServicesSection } from "@/components/sections/services-section";
import { SectionHeading } from "@/components/shared/section-heading";
import { EducationalHighlight } from "@/components/resources/EducationalHighlight";
import { featured } from "@/lib/resourcedata/featured";

export default function HomePage() {
	return (
		<>
			<Hero />
			<ServicesSection />
			<section className="section">
				<div className="container">
					<SectionHeading title="Monthly Educational Highlight" />
					{featured && (
						<EducationalHighlight resource={featured} theme={featured.theme} />
					)}
				</div>
			</section>
			<Testimonials />
			<ContactCTA />
		</>
	);
}
