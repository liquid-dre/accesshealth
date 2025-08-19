import { HeartPulse } from "lucide-react";
import { cn } from "@/lib/utils";

export function HeartPulseLoader({
	className,
	...props
}: React.SVGProps<SVGSVGElement>) {
	return (
		<HeartPulse
			aria-hidden="true"
			className={cn("animate-pulse", className)}
			{...props}
		/>
	);
}
