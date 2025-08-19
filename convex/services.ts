import { mutation, query } from "./_generated/server";
import { v } from "convex/values";

export const addService = mutation({
	args: {
		title: v.string(),
		blurb: v.string(),
		slug: v.string(),
		file: v.string(), // storageId of uploaded file
	},
	handler: async (ctx, args) => {
		// store the file reference
		const fileUrl = await ctx.storage.getUrl(args.file);

		return await ctx.db.insert("services", {
			title: args.title,
			blurb: args.blurb,
			slug: args.slug,
			imageUrl: fileUrl!,
		});
	},
});

export const getServices = query({
	args: {},
	handler: async (ctx) => {
		return await ctx.db.query("services").collect();
	},
});
