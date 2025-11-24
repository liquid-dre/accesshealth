import { mutation, query } from "./_generated/server";
import { v } from "convex/values";
import { internal } from "./_generated/api";
import { Id } from "./_generated/dataModel";

export const createBooking = mutation({
	args: {
		patientName: v.string(),
		patientPhone: v.string(),
		patientEmail: v.optional(v.string()),
		practitionerId: v.id("practitioners"),
		reason: v.string(),
		date: v.string(), // YYYY-MM-DD
		timeSlot: v.string(), // HH:mm-HH:mm
	},
	handler: async (ctx, args) => {
		// Validate practitioner exists and is active
		const practitioner = await ctx.db.get(args.practitionerId);
		if (!practitioner) {
			throw new Error("Practitioner not found");
		}
		if (!practitioner.active) {
			throw new Error("Practitioner is not active");
		}

		// Validate date is not in the past
		const bookingDate = new Date(args.date);
		const today = new Date();
		today.setHours(0, 0, 0, 0);
		if (bookingDate < today) {
			throw new Error("Cannot book appointments in the past");
		}

		const bookingId = await ctx.db.insert("bookings", {
			patientName: args.patientName,
			patientPhone: args.patientPhone,
			patientEmail: args.patientEmail,
			practitionerId: args.practitionerId,
			reason: args.reason,
			date: args.date,
			timeSlot: args.timeSlot,
			status: "pending",
			createdAt: Date.now(),
		});

		// Send notification to admin
		await ctx.scheduler.runAfter(0, internal.notifications.sendAdminNotification, {
			bookingId,
		});

		return bookingId;
	},
});

export const listBookings = query({
	args: {
		status: v.optional(v.union(v.literal("pending"), v.literal("confirmed"), v.literal("rejected"))),
		practitionerId: v.optional(v.id("practitioners")),
		date: v.optional(v.string()),
	},
	handler: async (ctx, args) => {
		let bookings;

		if (args.status) {
			bookings = await ctx.db
				.query("bookings")
				.withIndex("by_status", (q) => q.eq("status", args.status!))
				.collect();
		} else if (args.practitionerId && args.date) {
			bookings = await ctx.db
				.query("bookings")
				.withIndex("by_practitioner_date", (q) =>
					q.eq("practitionerId", args.practitionerId!).eq("date", args.date!)
				)
				.collect();
		} else if (args.date) {
			bookings = await ctx.db
				.query("bookings")
				.withIndex("by_date", (q) => q.eq("date", args.date!))
				.collect();
		} else {
			bookings = await ctx.db.query("bookings").collect();
		}

		// Populate practitioner data
		return Promise.all(
			bookings.map(async (booking) => {
				const practitioner = await ctx.db.get(booking.practitionerId);
				return {
					...booking,
					practitioner,
				};
			})
		);
	},
});

export const getBooking = query({
	args: {
		id: v.id("bookings"),
	},
	handler: async (ctx, args) => {
		const booking = await ctx.db.get(args.id);
		if (!booking) return null;

		const practitioner = await ctx.db.get(booking.practitionerId);
		return {
			...booking,
			practitioner,
		};
	},
});

export const updateBooking = mutation({
	args: {
		id: v.id("bookings"),
		patientName: v.optional(v.string()),
		patientPhone: v.optional(v.string()),
		patientEmail: v.optional(v.string()),
		practitionerId: v.optional(v.id("practitioners")),
		reason: v.optional(v.string()),
		date: v.optional(v.string()),
		timeSlot: v.optional(v.string()),
	},
	handler: async (ctx, args) => {
		const booking = await ctx.db.get(args.id);
		if (!booking) {
			throw new Error("Booking not found");
		}

		const { id, ...updates } = args;
		const updateData: {
			patientName?: string;
			patientPhone?: string;
			patientEmail?: string;
			practitionerId?: Id<"practitioners">;
			reason?: string;
			date?: string;
			timeSlot?: string;
		} = {};

		// Validate practitioner if being updated
		if (updates.practitionerId !== undefined) {
			const practitioner = await ctx.db.get(updates.practitionerId);
			if (!practitioner) {
				throw new Error("Practitioner not found");
			}
			if (!practitioner.active) {
				throw new Error("Practitioner is not active");
			}
			updateData.practitionerId = updates.practitionerId;
		}

		// Validate date if being updated
		if (updates.date !== undefined) {
			const bookingDate = new Date(updates.date);
			const today = new Date();
			today.setHours(0, 0, 0, 0);
			if (bookingDate < today) {
				throw new Error("Cannot book appointments in the past");
			}
			updateData.date = updates.date;
		}

		if (updates.patientName !== undefined) updateData.patientName = updates.patientName;
		if (updates.patientPhone !== undefined) updateData.patientPhone = updates.patientPhone;
		if (updates.patientEmail !== undefined) updateData.patientEmail = updates.patientEmail;
		if (updates.reason !== undefined) updateData.reason = updates.reason;
		if (updates.timeSlot !== undefined) updateData.timeSlot = updates.timeSlot;

		await ctx.db.patch(id, updateData);
		return id;
	},
});

export const confirmBooking = mutation({
	args: {
		id: v.id("bookings"),
	},
	handler: async (ctx, args) => {
		const booking = await ctx.db.get(args.id);
		if (!booking) {
			throw new Error("Booking not found");
		}

		if (booking.status === "confirmed") {
			return booking._id;
		}

		// Check if slot is still available
		const confirmedBookings = await ctx.db
			.query("bookings")
			.withIndex("by_practitioner_date", (q) =>
				q.eq("practitionerId", booking.practitionerId).eq("date", booking.date)
			)
			.filter((q) =>
				q.and(
					q.eq(q.field("status"), "confirmed"),
					q.eq(q.field("timeSlot"), booking.timeSlot),
					q.neq(q.field("_id"), booking._id)
				)
			)
			.collect();

		if (confirmedBookings.length > 0) {
			throw new Error("Time slot is already booked");
		}

		await ctx.db.patch(args.id, {
			status: "confirmed",
			confirmedAt: Date.now(),
		});

		// Send confirmation email to patient
		await ctx.scheduler.runAfter(0, internal.notifications.sendPatientConfirmation, {
			bookingId: args.id,
		});

		return args.id;
	},
});

export const rejectBooking = mutation({
	args: {
		id: v.id("bookings"),
	},
	handler: async (ctx, args) => {
		const booking = await ctx.db.get(args.id);
		if (!booking) {
			throw new Error("Booking not found");
		}

		await ctx.db.patch(args.id, {
			status: "rejected",
		});
		return args.id;
	},
});

export const getBookingsForDate = query({
	args: {
		practitionerId: v.id("practitioners"),
		date: v.string(),
	},
	handler: async (ctx, args) => {
		return await ctx.db
			.query("bookings")
			.withIndex("by_practitioner_date", (q) =>
				q.eq("practitionerId", args.practitionerId).eq("date", args.date)
			)
			.collect();
	},
});

