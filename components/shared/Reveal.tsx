"use client";

import { motion, MotionProps } from "framer-motion";
import { ElementType, ReactNode } from "react";

interface RevealProps extends MotionProps {
	as?: ElementType;
	className?: string;
	children: ReactNode;
}

export function Reveal({
	as: Tag = "div",
	className,
	children,
	transition,
	viewport,
	...rest
}: RevealProps) {
	const MotionTag = motion(Tag);

	return (
		<MotionTag
			className={className}
			initial={{ opacity: 0, y: 40, filter: "blur(4px)" }}
			whileInView={{ opacity: 1, y: 0, filter: "blur(0)" }}
			transition={{
				duration: 1.0,
				ease: [0.25, 0.1, 0.25, 1],
				...(transition ?? {}),
			}}
			viewport={{ once: true, amount: 0.3, ...(viewport ?? {}) }}
			{...rest}
		>
			{children}
		</MotionTag>
	);
}
