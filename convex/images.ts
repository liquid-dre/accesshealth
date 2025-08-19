// convex/images.ts
import { mutation } from "./_generated/server";
import { v } from "convex/values";

export const upload = mutation({
	args: { file: v.any() },
	handler: async (ctx, { file }) => {
		if (!(file instanceof File)) throw new Error("Expected a File");
		const storageId = await ctx.storage.store(file);
		const url = await ctx.storage.getUrl(storageId);
		return { storageId, url };
	},
});
