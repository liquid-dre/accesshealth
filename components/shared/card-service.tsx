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
		<Card className="rounded-3xl border-none bg-transparent shadow-lg hover:shadow-2xl transition-all duration-300 ease-in-out transform hover:-translate-y-2 cursor-pointer">
			<CardHeader className="p-0">
				<div className="relative overflow-hidden bg-transparent aspect-[16/9]">
					<Image
						src={image}
						alt={title}
						fill
						className="object-cover transform transition-transform duration-300 ease-in-out group-hover:scale-120 rounded-t-xl"
						sizes="(min-width: 768px) 400px, 100vw"
					/>
				</div>
			</CardHeader>
			<CardContent className="space-y-3 p-6">
				<CardTitle className="text-xl font-bold tracking-tight text-foreground">
					{title}
				</CardTitle>
				<p className="text-base leading-relaxed text-muted-foreground">
					{blurb}
				</p>
			</CardContent>
		</Card>
	);
}
