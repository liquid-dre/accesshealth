import { ContactCTA } from "@/components/hero/contact-cta";
import { Hero } from "@/components/hero/hero";
import { Testimonials } from "@/components/hero/testimonials";
import { ServicesSection } from "@/components/sections/services-section";

export default function HomePage() {
	return (
		<>
			<Hero />
			<ServicesSection />
			<Testimonials />
			<ContactCTA />
		</>
	);
}
