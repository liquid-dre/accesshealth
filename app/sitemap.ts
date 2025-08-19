import { MetadataRoute } from "next";

export default function sitemap(): MetadataRoute.Sitemap {
	const base = "https://accesshealth.co.zw";
	return [
		{ url: `${base}/`, lastModified: new Date() },
		{ url: `${base}/services`, lastModified: new Date() },
		{ url: `${base}/team`, lastModified: new Date() },
		{ url: `${base}/resources`, lastModified: new Date() },
		{ url: `${base}/contact`, lastModified: new Date() },
	];
}
