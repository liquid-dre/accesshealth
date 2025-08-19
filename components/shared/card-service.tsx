import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import Image from "next/image";

export function CardService({
	title,
	blurb,
	image,
}: {
	title: string;
	blurb: string;
	image: string;
}) {
	return (
		<Card className="rounded-2xl border-gray-200 hover:shadow-soft transition">
			<CardHeader>
				<CardTitle className="text-lg">{title}</CardTitle>
			</CardHeader>
			<CardContent className="space-y-4">
				<div className="relative overflow-hidden rounded-xl bg-white shadow-soft aspect-[16/9]">
					<Image
						src={image}
						alt={title}
						fill
						className="object-cover"
						sizes="(min-width: 768px) 400px, 100vw"
					/>
				</div>
				<p className="text-sm text-gray-600">{blurb}</p>
			</CardContent>
		</Card>
	);
}
