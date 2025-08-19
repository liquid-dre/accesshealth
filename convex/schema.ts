import { defineSchema, defineTable } from "convex/schema";
import { v } from "convex/values";

export default defineSchema({
	services: defineTable({
		title: v.string(),
		description: v.string(),
		imageId: v.id("_storage"), // references a stored file
	}),
});
