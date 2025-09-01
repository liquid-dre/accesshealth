import Image from "next/image";
import { cn } from "@/lib/utils";

interface GalleryImage {
	src: string;
	alt: string;
	className: string;
}

const galleryImages: GalleryImage[] = [
	{
		src: "/images/bento-gallery/IMG_8557.JPG",
		alt: "Exterior view of the clinic entrance",
		className: "col-span-2 row-span-2 md:col-span-3 md:row-span-2",
	},
	{
		src: "/images/bento-gallery/IMG_8559.JPG",
		alt: "Nurse checking a patient’s vitals",
		className: "row-span-2 md:col-span-2",
	},
	{
		src: "/images/bento-gallery/IMG_8560.JPG",
		alt: "Closeup of medical equipment on a cart",
		className: "row-span-1",
	},
	{
		src: "/images/bento-gallery/IMG_8563.JPG",
		alt: "Comfortable seating area in the waiting room",
		className: "col-span-2 md:col-span-3",
	},
	{
		src: "/images/bento-gallery/IMG_8565.JPG",
		alt: "Doctor speaking with a patient",
		className: "col-span-2 row-span-2 md:col-span-2 md:row-span-3",
	},
	{
		src: "/images/bento-gallery/IMG_9294.JPEG",
		alt: "Staff reviewing medical records at the desk",
		className: "row-span-1",
	},
	{
		src: "/images/bento-gallery/IMG_9306.JPEG",
		alt: "Patient receiving care from clinician",
		className: "row-span-2",
	},
	{
		src: "/images/bento-gallery/IMG_9309.JPEG",
		alt: "Clinic team gathered together smiling",
		className: "col-span-2 md:col-span-3",
	},
];

export function BentoGallery() {
	return (
		<div className="mb-12">
			<h2 className="mb-8 text-3xl font-bold">Clinic Moments</h2>
			<div className="grid grid-cols-2 sm:grid-cols-4 md:grid-cols-6 gap-4 auto-rows-[150px] sm:auto-rows-[200px] md:auto-rows-[240px]">
				{galleryImages.map((image) => (
					<div
						key={image.src}
						className={cn(
							"relative overflow-hidden rounded-xl",
							image.className
						)}
					>
						<Image
							src={image.src}
							alt={image.alt}
							fill
							className="object-cover"
							sizes="(min-width: 1024px) 300px, (min-width: 640px) 200px, 100vw"
						/>
					</div>
				))}
			</div>
		</div>
	);
}

export default BentoGallery;
