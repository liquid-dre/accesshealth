"use client";

import Autoplay from "embla-carousel-autoplay";
import {
	Carousel,
	CarouselContent,
	CarouselItem,
} from "@/components/shared/carousel";
import { SERVICES } from "@/lib/data";
import { CardService } from "@/components/shared/card-service";

export function ServicesCarousel() {
	return (
		<Carousel
			className="w-full py-10"
			opts={{ loop: true }}
			plugins={[Autoplay({ delay: 2000 })]}
		>
			<CarouselContent>
				{SERVICES.map((s) => (
					<CarouselItem
						key={s.slug}
						className="basis-full md:basis-1/2 lg:basis-1/3"
					>
						<CardService {...s} />
					</CarouselItem>
				))}
			</CarouselContent>
		</Carousel>
	);
}
