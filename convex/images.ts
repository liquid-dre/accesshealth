import { mutation } from "./_generated/server";
import { v } from "convex/values";

export const upload = mutation({
	args: { file: v.file() },
	handler: async (ctx, { file }) => {
		const storageId = await ctx.storage.store(file);
		const url = await ctx.storage.getUrl(storageId);
		return { storageId, url };
	},
});
