import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
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
}

export function EducationalHighlight({
	resource,
	theme,
}: EducationalHighlightProps) {
	const Icon = theme.icon;

	return (
		<div className="max-w-md mx-auto md:max-w-xl space-y-4">
			<Card className={cn("rounded-3xl p-6", theme.background, theme.text)}>
				<a
					href={`/resource/${resource.id}`}
					className="flex items-center gap-4 font-semibold hover:underline underline-offset-4"
				>
					{Icon && <Icon className="h-6 w-6" />}
					{resource.title}
				</a>
			</Card>
			<Button asChild>
				<a href="/resources">View All Resources</a>
			</Button>
		</div>
	);
}

export default EducationalHighlight;
