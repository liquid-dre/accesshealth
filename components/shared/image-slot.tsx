"use client";

import Image from "next/image";
import { useState } from "react";
import { Button } from "@/components/ui/button";

/**
 * ImageSlot
 * - Now: displays a placeholder or provided src
 * - Later: swap <Button> with your uploader (UploadThing/Supabase/Cloudinary)
 */
export function ImageSlot({
	alt,
	src,
	className,
	fallbackSrc = "/pediatrician.jpg",
	ratio = "square",
}: {
	alt: string;
	src?: string;
	fallbackSrc?: string;
	className?: string;
	ratio?: "square" | "wide" | "tall";
}) {
	const [curSrc] = useState(src);

	const aspect =
		ratio === "wide"
			? "aspect-[16/9]"
			: ratio === "tall"
			? "aspect-[3/4]"
			: "aspect-square";
	const placeholder = fallbackSrc;

	return (
		<div
			className={`relative overflow-hidden rounded-xl bg-white shadow-soft ${aspect} ${
				className ?? ""
			}`}
		>
			<Image
				src={curSrc || placeholder}
				alt={alt}
				fill
				className="object-cover"
				sizes="(min-width: 768px) 400px, 100vw"
			/>
			{/* Replace this with your future uploader trigger */}
			{!curSrc && (
				<div className="absolute inset-0 bg-black/10 flex items-end justify-end p-2">
					<Button size="sm" variant="secondary" className="bg-white">
						Upload (soon)
					</Button>
				</div>
			)}
		</div>
	);
}
