"use client";

import dynamic from "next/dynamic";
import { useEffect, useRef, useState } from "react";

const DynamicMap = dynamic(() => import("./google-map"), { ssr: false });

export default function Map() {
	const ref = useRef<HTMLDivElement | null>(null);
	const [showMap, setShowMap] = useState(false);

	useEffect(() => {
		if (!ref.current) return;

		const observer = new IntersectionObserver((entries) => {
			const entry = entries[0];
			if (entry.isIntersecting) {
				setShowMap(true);
				observer.disconnect();
			}
		});

		observer.observe(ref.current);

		return () => observer.disconnect();
	}, []);

	return (
		<div ref={ref} className="w-full h-[450px]">
			{showMap ? (
				<DynamicMap />
			) : (
				<div className="w-full h-full bg-gray-200 flex items-center justify-center text-gray-500">
					Loading map...
				</div>
			)}
		</div>
	);
}
