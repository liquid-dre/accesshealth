import { Card } from "@/components/ui/card";
import { cn } from "@/lib/utils";

interface ResourceCardProps {
	id: string;
	title: string;
	className?: string;
	[key: string]: unknown;
}

export function ResourceCard({ id, title, className }: ResourceCardProps) {
	return (
		<Card
			className={cn(
				"rounded-3xl p-6",
				"bg-card text-card-foreground dark:bg-slate-800 dark:text-slate-100",
				"transition-[box-shadow,transform] will-change-transform",
				className
			)}
		>
			<a
				className="font-semibold hover:underline underline-offset-4"
				href={`/resource/${id}`}
			>
				{title}
			</a>
			<p className="text-sm text-slate-500 dark:text-slate-400 mt-2">
				Read more.
			</p>
		</Card>
	);
}
