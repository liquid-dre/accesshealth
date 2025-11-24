import { mutation, query } from "./_generated/server";
import { v } from "convex/values";

export const createPractitioner = mutation({
	args: {
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
	},
	handler: async (ctx, args) => {
		return await ctx.db.insert("practitioners", {
			fullName: args.fullName,
			email: args.email,
			phone: args.phone,
			specialty: args.specialty,
			workingHours: args.workingHours,
			active: args.active,
		});
	},
});

export const updatePractitioner = mutation({
	args: {
		id: v.id("practitioners"),
		fullName: v.optional(v.string()),
		email: v.optional(v.string()),
		phone: v.optional(v.string()),
		specialty: v.optional(v.string()),
		workingHours: v.optional(
			v.object({
				monday: v.array(v.object({ start: v.string(), end: v.string() })),
				tuesday: v.array(v.object({ start: v.string(), end: v.string() })),
				wednesday: v.array(v.object({ start: v.string(), end: v.string() })),
				thursday: v.array(v.object({ start: v.string(), end: v.string() })),
				friday: v.array(v.object({ start: v.string(), end: v.string() })),
				saturday: v.array(v.object({ start: v.string(), end: v.string() })),
				sunday: v.array(v.object({ start: v.string(), end: v.string() })),
			})
		),
		active: v.optional(v.boolean()),
	},
	handler: async (ctx, args) => {
		const { id, ...updates } = args;
		const updateData: {
			fullName?: string;
			email?: string;
			phone?: string;
			specialty?: string;
			workingHours?: {
				monday: Array<{ start: string; end: string }>;
				tuesday: Array<{ start: string; end: string }>;
				wednesday: Array<{ start: string; end: string }>;
				thursday: Array<{ start: string; end: string }>;
				friday: Array<{ start: string; end: string }>;
				saturday: Array<{ start: string; end: string }>;
				sunday: Array<{ start: string; end: string }>;
			};
			active?: boolean;
		} = {};
		
		if (updates.fullName !== undefined) updateData.fullName = updates.fullName;
		if (updates.email !== undefined) updateData.email = updates.email;
		if (updates.phone !== undefined) updateData.phone = updates.phone;
		if (updates.specialty !== undefined) updateData.specialty = updates.specialty;
		if (updates.workingHours !== undefined) updateData.workingHours = updates.workingHours;
		if (updates.active !== undefined) updateData.active = updates.active;

		await ctx.db.patch(id, updateData);
		return id;
	},
});

export const listPractitioners = query({
	args: {
		activeOnly: v.optional(v.boolean()),
	},
	handler: async (ctx, args) => {
		if (args.activeOnly) {
			return await ctx.db
				.query("practitioners")
				.withIndex("by_active", (q) => q.eq("active", true))
				.collect();
		}
		return await ctx.db.query("practitioners").collect();
	},
});

export const getPractitioner = query({
	args: {
		id: v.id("practitioners"),
	},
	handler: async (ctx, args) => {
		return await ctx.db.get(args.id);
	},
});

