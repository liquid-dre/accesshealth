import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ImageSlot } from "./image-slot";

export function CardService({
	title,
	blurb,
}: {
	title: string;
	blurb: string;
}) {
	return (
		<Card className="rounded-2xl border-gray-200 hover:shadow-soft transition">
			<CardHeader>
				<CardTitle className="text-lg">{title}</CardTitle>
			</CardHeader>
			<CardContent className="space-y-4">
				<ImageSlot alt={title} ratio="wide" />
				<p className="text-sm text-gray-600">{blurb}</p>
			</CardContent>
		</Card>
	);
}
