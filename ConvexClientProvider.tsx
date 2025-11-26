"use client";

import { ConvexProvider, ConvexReactClient } from "convex/react";
import { ReactNode, useMemo } from "react";

export function ConvexClientProvider({ children }: { children: ReactNode }) {
	const convex = useMemo(() => {
		const url = process.env.NEXT_PUBLIC_CONVEX_URL;
		if (!url) {
			throw new Error(
				"Missing NEXT_PUBLIC_CONVEX_URL. Please set it in your .env.local file. " +
				"See https://docs.convex.dev/quickstart/nextjs for more information."
			);
		}
		return new ConvexReactClient(url);
	}, []);

	return <ConvexProvider client={convex}>{children}</ConvexProvider>;
}
