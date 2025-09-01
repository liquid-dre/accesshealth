import Image from "next/image";

export function ImageSlot({
	alt,
	src,
	className,
	fallbackSrc = "/hero.jpg",
	ratio = "square",
	priority,
	placeholder = "blur",
	blurDataURL,
}: {
	alt: string;
	src?: string;
	fallbackSrc?: string;
	className?: string;
	ratio?: "square" | "wide" | "tall";
	priority?: boolean;
	placeholder?: "blur" | "empty";
	blurDataURL?: string;
}) {
	const aspect =
		ratio === "wide"
			? "aspect-[16/9]"
			: ratio === "tall"
				? "aspect-[3/4]"
				: "aspect-square";
	const placeholderImage = fallbackSrc;

	return (
		<div
			className={`relative overflow-hidden rounded-xl bg-white shadow-soft ${aspect} ${
				className ?? ""
			}`}
		>
			<Image
				src={src || placeholderImage}
				alt={alt}
				fill
				className="object-cover"
				sizes="(min-width: 768px) 400px, 100vw"
				priority={priority}
				placeholder={placeholder}
				blurDataURL={blurDataURL}
			/>
		</div>
	);
}
