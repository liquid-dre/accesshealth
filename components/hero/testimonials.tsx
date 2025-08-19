import { TESTIMONIALS } from "@/lib/data";
import { SectionHeading } from "@/components/shared/section-heading";
import { Carousel, CarouselItem } from "@/components/shared/carousel";

export function Testimonials() {
	return (
		<section className="section">
			<div className="container">
				<SectionHeading
					title="What Patients Say"
					subtitle="A welcoming environment and attentive care."
				/>
				<Carousel>
					{TESTIMONIALS.map((t, i) => (
						<CarouselItem key={i}>
							<div className="max-w-3xl mx-auto p-8 bg-white rounded-2xl border shadow-soft">
								<p className="text-lg text-gray-800">“{t.text}”</p>
								<div className="mt-4 font-semibold text-[color:var(--brand-blue)]">
									{t.name}
								</div>
							</div>
						</CarouselItem>
					))}
				</Carousel>
			</div>
		</section>
	);
}
