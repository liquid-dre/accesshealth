import type { LucideIcon } from "lucide-react";
import { Ribbon } from "lucide-react";
import resources from "./resources.json";

interface Resource {
	id: string;
	title: string;
	[key: string]: unknown;
}

export interface Theme {
	background: string;
	text: string;
	icon?: LucideIcon;
}

const iconMap: Record<string, LucideIcon> = {
	ribbon: Ribbon,
};

const list = resources as (Resource & {
	featured?: boolean;
	theme?: { background: string; text: string; icon?: string };
})[];
const rawFeatured = list.find((r) => r.featured);

export interface FeaturedResource extends Resource {
	theme: Theme;
}

export const featured: FeaturedResource | undefined =
	rawFeatured && rawFeatured.theme
		? {
				...rawFeatured,
				theme: {
					background: rawFeatured.theme.background,
					text: rawFeatured.theme.text,
					icon: rawFeatured.theme.icon
						? iconMap[rawFeatured.theme.icon]
						: undefined,
				},
			}
		: undefined;
