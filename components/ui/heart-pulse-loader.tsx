import * as React from "react";
import { cn } from "@/lib/utils";

interface HeartPulseLoaderProps extends React.SVGProps<SVGSVGElement> {
	duration?: number;
	color?: string;
}

export function HeartPulseLoader({
	className,
	duration = 1.5,
	color = "currentColor",
	...props
}: HeartPulseLoaderProps) {
	return (
		<svg
			aria-hidden="true"
			viewBox="0 0 100 24"
			fill="none"
			stroke={color}
			className={cn(className)}
			{...props}
		>
			<polyline
				points="0,12 20,12 25,6 30,18 35,12 50,12 55,0 60,24 65,12 80,12 100,12"
				strokeWidth="2"
				strokeLinecap="round"
				style={{
					strokeDasharray: 100,
					strokeDashoffset: 100,
					animation: `pulse-wave ${duration}s linear infinite, pulse-color 3s ease-in-out infinite`,
				}}
			/>
		</svg>
	);
}
