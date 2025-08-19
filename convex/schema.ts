import { defineSchema, defineTable } from "convex/server";
import { v } from "convex/values";

export default defineSchema({
	services: defineTable({
		title: v.string(),
		blurb: v.string(),
		slug: v.string(),
		imageUrl: v.string(), // will store image file URL
	}),
    
	files: defineTable({
		name: v.string(),
		contentType: v.string(),
		storageId: v.string(),
	}),
});
