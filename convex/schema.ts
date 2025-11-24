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

	practitioners: defineTable({
		fullName: v.string(),
		email: v.string(),
		phone: v.string(),
		specialty: v.optional(v.string()),
		workingHours: v.object({
			monday: v.array(v.object({ start: v.string(), end: v.string() })),
			tuesday: v.array(v.object({ start: v.string(), end: v.string() })),
			wednesday: v.array(v.object({ start: v.string(), end: v.string() })),
			thursday: v.array(v.object({ start: v.string(), end: v.string() })),
			friday: v.array(v.object({ start: v.string(), end: v.string() })),
			saturday: v.array(v.object({ start: v.string(), end: v.string() })),
			sunday: v.array(v.object({ start: v.string(), end: v.string() })),
		}),
		active: v.boolean(),
	}).index("by_active", ["active"]),

	bookings: defineTable({
		patientName: v.string(),
		patientPhone: v.string(),
		patientEmail: v.optional(v.string()),
		practitionerId: v.id("practitioners"),
		reason: v.string(),
		date: v.string(), // YYYY-MM-DD
		timeSlot: v.string(), // HH:mm-HH:mm
		status: v.union(v.literal("pending"), v.literal("confirmed"), v.literal("rejected")),
		createdAt: v.number(),
		confirmedAt: v.optional(v.number()),
	})
		.index("by_practitioner_date", ["practitionerId", "date"])
		.index("by_status", ["status"])
		.index("by_date", ["date"]),
});
