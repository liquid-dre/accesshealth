"use client";

import Image from "next/image";
import { useState } from "react";

interface GalleryImage {
	src: string;
	alt: string;
}

const galleryImages: GalleryImage[] = [
	{
		src: "/images/bento-gallery/IMG_8557.JPG",
		alt: "Exterior view of the clinic entrance",
	},
	{
		src: "/images/bento-gallery/IMG_8559.JPG",
		alt: "Nurse checking a patient’s vitals",
	},
	{
		src: "/images/bento-gallery/IMG_8560.JPG",
		alt: "Closeup of medical equipment on a cart",
	},
	{
		src: "/images/bento-gallery/IMG_8563.JPG",
		alt: "Comfortable seating area in the waiting room",
	},
	{
		src: "/images/bento-gallery/IMG_8565.JPG",
		alt: "Doctor speaking with a patient",
	},
	{
		src: "/images/bento-gallery/IMG_9294.JPEG",
		alt: "Staff reviewing medical records at the desk",
	},
	{
		src: "/images/bento-gallery/IMG_9306.JPEG",
		alt: "Patient receiving care from clinician",
	},
	{
		src: "/images/bento-gallery/IMG_9309.JPEG",
		alt: "Clinic team gathered together smiling",
	},
];

export function ImageShowcase() {
	const [selectedImage, setSelectedImage] = useState<GalleryImage | null>(null);

	return (
		<div className="mb-12">
			<h2 className="flex justify-center mb-8 text-3xl font-bold">Clinic Moments</h2>
			<div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
				{galleryImages.map((image) => (
					<button
						key={image.src}
						className="relative overflow-hidden rounded-xl aspect-[4/3]"
						onClick={() => setSelectedImage(image)}
						aria-label={`View larger image: ${image.alt}`}
					>
						<Image
							src={image.src}
							alt={image.alt}
							fill
							className="object-cover w-full h-full"
							sizes="(min-width: 768px) 25vw, 50vw"
						/>
					</button>
				))}
			</div>

			{selectedImage && (
				<div
					className="fixed inset-0 z-50 flex items-center justify-center bg-black/75"
					onClick={() => setSelectedImage(null)}
				>
					<div
						className="relative w-11/12 max-w-3xl aspect-[4/3]"
						onClick={(e) => e.stopPropagation()}
					>
						<Image
							src={selectedImage.src}
							alt={selectedImage.alt}
							fill
							className="object-cover w-full h-full"
						/>
					</div>
				</div>
			)}
		</div>
	);
}

export default ImageShowcase;
