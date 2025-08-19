import { Hero } from "@/components/hero/hero";
import { ServicesGrid } from "@/components/hero/services-grid";
import { Testimonials } from "@/components/hero/testimonials";
import { ContactCTA } from "@/components/hero/contact-cta";

export default function HomePage() {
	return (
		<>
			<Hero />
			<ServicesGrid />
			<Testimonials />
			<ContactCTA />
		</>
	);
}
