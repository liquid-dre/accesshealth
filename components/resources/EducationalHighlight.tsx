import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";
import type { Theme } from "@/lib/resourcedata/featured";

interface Resource {
	id: string;
	title: string;
	[key: string]: unknown;
}

interface EducationalHighlightProps {
	resource: Resource;
	theme: Theme;
	badge?: string;
	showViewAll?: boolean;
}

export function EducationalHighlight({
	resource,
	theme,
	badge,
	showViewAll = true,
}: EducationalHighlightProps) {
	const Icon = theme.icon;

	return (
		<div className="max-w-md mx-auto md:max-w-xl space-y-4">
			<Card
				className={cn("relative rounded-3xl p-6", theme.background, theme.text)}
			>
				{badge && <Badge className="absolute top-4 right-4">{badge}</Badge>}
				<a
					href={`/resource/${resource.id}`}
					className="flex items-center gap-4 font-semibold hover:underline underline-offset-4"
				>
					{Icon && <Icon className="h-6 w-6" />}
					{resource.title}
				</a>
			</Card>
			{showViewAll && (
				<Button asChild className="hover:scale-115 hover:bg-red-600 dark:hover:text-white dark:bg-[#A2D8F5] dark:hover:bg-red-600">
					<a href="/resources">View All Resources</a>
				</Button>
			)}
		</div>
	);
}

export default EducationalHighlight;
