import type { LucideIcon } from "lucide-react";
import { Ribbon } from "lucide-react";
import resources from "./resources.json";

interface Resource {
	id: string;
	title: string;
	[key: string]: unknown;
}

const iconMap: Record<string, LucideIcon> = {
	ribbon: Ribbon,
};

const list = resources as (Resource & {
	featured?: boolean;
	theme?: { background: string; text: string; icon?: string };
})[];
const rawFeatured = list.find((r) => r.featured);

export const featured = rawFeatured
	? {
			...rawFeatured,
			theme: {
				...rawFeatured.theme,
				icon:
					rawFeatured.theme && rawFeatured.theme.icon
						? iconMap[rawFeatured.theme.icon]
						: undefined,
			},
		}
	: undefined;
