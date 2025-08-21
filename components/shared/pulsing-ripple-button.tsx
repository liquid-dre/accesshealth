"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { cn } from "@/lib/utils";

interface PulsingRippleButtonProps {
	onClick?: () => void;
	className?: string;
}

export function PulsingRippleButton({
	onClick,
	className,
}: PulsingRippleButtonProps) {
	const [ripple, setRipple] = useState(false);
	const router = useRouter();

	const handleClick = () => {
		onClick?.();
		setRipple(true);
	};

	const handleAnimationEnd = () => {
		setRipple(false);
		router.push("/contact");
	};

	return (
		<button
			type="button"
			onClick={handleClick}
			className={cn(
				"relative overflow-hidden btn-pill bg-[color:var(--brand-blue)] text-white hover:shadow-lift transition group",
				className
			)}
		>
			<span className="relative z-10 block px-6 py-2 animate-pulse-slow group-hover:animate-heartbeat">
				Book an appointment
			</span>
			{ripple && (
				<span
					className="pointer-events-none absolute inset-0 rounded-full bg-white/40 animate-ripple"
					onAnimationEnd={handleAnimationEnd}
				/>
			)}
		</button>
	);
}
