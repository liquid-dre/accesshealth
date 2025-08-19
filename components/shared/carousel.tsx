"use client";

// (Embla wrapper for testimonials)

import useEmblaCarousel from "embla-carousel-react";
import { useEffect, useState } from "react";

export function Carousel({ children }: { children: React.ReactNode }) {
	const [emblaRef, emblaApi] = useEmblaCarousel({ loop: true });
	const [intervalId, setIntervalId] = useState<NodeJS.Timeout | null>(null);

	useEffect(() => {
		if (!emblaApi) return;
		const id = setInterval(() => emblaApi.scrollNext(), 4000);
		setIntervalId(id);
		return () => id && clearInterval(id);
	}, [emblaApi]);

	return (
		<div className="overflow-hidden" ref={emblaRef}>
			<div className="flex">{children}</div>
		</div>
	);
}

export function CarouselItem({ children }: { children: React.ReactNode }) {
	return <div className="min-w-0 flex-[0_0_100%] px-2">{children}</div>;
}
