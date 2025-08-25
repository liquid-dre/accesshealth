import { Card } from "@/components/ui/card";
import { cn } from "@/lib/utils";
import { ArrowRight } from "lucide-react";

interface ResourceCardProps {
	id: string;
	title: string;
	content?: { type: string; text?: string }[];
	className?: string;
	[key: string]: unknown;
}

export function ResourceCard({
	id,
	title,
	content,
	className,
}: ResourceCardProps) {
	const description = content?.find(
		(c) => c.type === "paragraph" && typeof c.text === "string"
	)?.text;

	return (
		<Card
			className={cn(
				"group rounded-3xl p-6 h-full flex flex-col justify-between",
				"bg-card text-card-foreground dark:bg-slate-800 dark:text-slate-100",
				"transition-[box-shadow,transform] will-change-transform",
				className
			)}
		>
			<div>
				<a
					className="font-semibold hover:underline underline-offset-4 flex items-center gap-2"
					href={`/resource/${id}`}
				>
					{title}
					<ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
				</a>
				{description && (
					<p className="mt-2 text-sm text-slate-500 dark:text-slate-400">
						{description}
					</p>
				)}
			</div>
		</Card>
	);
}
