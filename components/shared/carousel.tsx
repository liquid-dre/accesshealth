"use client";

// (Embla wrapper for testimonials)
import * as React from "react";
import useEmblaCarousel from "embla-carousel-react";
import type { EmblaOptionsType, EmblaPluginType } from "embla-carousel";
import { cn } from "@/lib/utils";

type CarouselProps = React.PropsWithChildren<{
	className?: string;
	opts?: EmblaOptionsType;
	plugins?: EmblaPluginType[];
}>;

export function Carousel({
	className,
	opts,
	plugins,
	children,
}: CarouselProps) {
	const [emblaRef] = useEmblaCarousel(opts, plugins);
	return (
		<div ref={emblaRef} className={cn("overflow-hidden", className)}>
			{children}
		</div>
	);
}

export function CarouselContent({
	className,
	children,
}: React.PropsWithChildren<{ className?: string }>) {
	return <div className={cn("flex", className)}>{children}</div>;
}

export function CarouselItem({
	className,
	children,
}: React.PropsWithChildren<{ className?: string }>) {
	return (
		<div className={cn("min-w-0 flex-[0_0_100%] px-2", className)}>
			{children}
		</div>
	);
}
