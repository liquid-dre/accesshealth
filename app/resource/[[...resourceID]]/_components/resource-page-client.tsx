"use client";

import { useState } from "react";

interface ResourcePageClientProps {
	resourceId: string[];
}

export default function ResourcePageClient({
	resourceId,
}: ResourcePageClientProps) {
	const [count, setCount] = useState(0);

	return (
		<div className="space-y-4">
			<div>Resource: {resourceId.join("/") || "none"}</div>
			<button
				className="px-4 py-2 rounded bg-blue-500 text-white"
				onClick={() => setCount((c) => c + 1)}
			>
				Clicked {count} times
			</button>
		</div>
	);
}
