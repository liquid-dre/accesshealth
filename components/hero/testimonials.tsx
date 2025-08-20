// components/home/testimonials.tsx
import { TESTIMONIALS } from "@/lib/data";
import Autoplay from "embla-carousel-autoplay";
import {
	Carousel,
	CarouselContent,
	CarouselItem,
} from "@/components/shared/carousel";

export function Testimonials() {
	return (
		<section className="section">
			<div className="container">
				<div className="text-center mb-10">
					<h2 className="text-3xl md:text-4xl font-semibold">
						What patients say
					</h2>
					<p className="text-gray-600 mt-2">
						Real experiences from our community.
					</p>
				</div>
				<Carousel opts={{ loop: true }} plugins={[Autoplay({ delay: 4000 })]}>
					<CarouselContent>
						{TESTIMONIALS.map((t, i) => (
							<CarouselItem key={i}>
								<div className="card p-8 max-w-3xl mx-auto text-center">
									<p className="text-lg">“{t.text}”</p>
									<div className="mt-4 font-semibold text-[color:var(--brand-blue)]">
										{t.name}
									</div>
								</div>
							</CarouselItem>
						))}
					</CarouselContent>
				</Carousel>
			</div>
		</section>
	);
}
