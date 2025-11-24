import { query } from "./_generated/server";
import { v } from "convex/values";

type TimeSlot = {
	start: string;
	end: string;
};

function parseTime(time: string): number {
	const [hours, minutes] = time.split(":").map(Number);
	return hours * 60 + minutes;
}

function formatTime(minutes: number): string {
	const hours = Math.floor(minutes / 60);
	const mins = minutes % 60;
	return `${hours.toString().padStart(2, "0")}:${mins.toString().padStart(2, "0")}`;
}

function generateSlotsFromRange(start: string, end: string, slotLength: number = 30): TimeSlot[] {
	const slots: TimeSlot[] = [];
	const startMinutes = parseTime(start);
	const endMinutes = parseTime(end);
	
	let current = startMinutes;
	while (current + slotLength <= endMinutes) {
		slots.push({
			start: formatTime(current),
			end: formatTime(current + slotLength),
		});
		current += slotLength;
	}
	
	return slots;
}

function getDayName(date: string): string {
	const dayNames = ["sunday", "monday", "tuesday", "wednesday", "thursday", "friday", "saturday"];
	const d = new Date(date);
	return dayNames[d.getDay()];
}

export const generateSlotsForDate = query({
	args: {
		practitionerId: v.id("practitioners"),
		date: v.string(), // YYYY-MM-DD
	},
	handler: async (ctx, args) => {
		const practitioner = await ctx.db.get(args.practitionerId);
		if (!practitioner || !practitioner.active) {
			return [];
		}

		const dayName = getDayName(args.date);
		const workingHours = practitioner.workingHours[dayName as keyof typeof practitioner.workingHours];
		
		if (!workingHours || workingHours.length === 0) {
			return [];
		}

		const allSlots: TimeSlot[] = [];
		for (const range of workingHours) {
			const slots = generateSlotsFromRange(range.start, range.end);
			allSlots.push(...slots);
		}

		return allSlots.map((slot) => `${slot.start}-${slot.end}`);
	},
});

export const getAvailableSlots = query({
	args: {
		practitionerId: v.id("practitioners"),
		date: v.string(), // YYYY-MM-DD
	},
	handler: async (ctx, args) => {
		// Get all generated slots by calling the same function recursively
		const practitioner = await ctx.db.get(args.practitionerId);
		if (!practitioner || !practitioner.active) {
			return [];
		}

		const dayNames = ["sunday", "monday", "tuesday", "wednesday", "thursday", "friday", "saturday"];
		const d = new Date(args.date);
		const dayName = dayNames[d.getDay()];
		const workingHours = practitioner.workingHours[dayName as keyof typeof practitioner.workingHours];
		
		if (!workingHours || workingHours.length === 0) {
			return [];
		}

		function parseTime(time: string): number {
			const [hours, minutes] = time.split(":").map(Number);
			return hours * 60 + minutes;
		}

		function formatTime(minutes: number): string {
			const hours = Math.floor(minutes / 60);
			const mins = minutes % 60;
			return `${hours.toString().padStart(2, "0")}:${mins.toString().padStart(2, "0")}`;
		}

		function generateSlotsFromRange(start: string, end: string, slotLength: number = 30): TimeSlot[] {
			const slots: TimeSlot[] = [];
			const startMinutes = parseTime(start);
			const endMinutes = parseTime(end);
			
			let current = startMinutes;
			while (current + slotLength <= endMinutes) {
				slots.push({
					start: formatTime(current),
					end: formatTime(current + slotLength),
				});
				current += slotLength;
			}
			
			return slots;
		}

		const allSlots: TimeSlot[] = [];
		for (const range of workingHours) {
			const slots = generateSlotsFromRange(range.start, range.end);
			allSlots.push(...slots);
		}

		const allSlotsFormatted = allSlots.map((slot) => `${slot.start}-${slot.end}`);

		// Get confirmed bookings for this practitioner and date
		const confirmedBookings = await ctx.db
			.query("bookings")
			.withIndex("by_practitioner_date", (q) =>
				q.eq("practitionerId", args.practitionerId).eq("date", args.date)
			)
			.filter((q) => q.eq(q.field("status"), "confirmed"))
			.collect();

		// Extract booked time slots
		const bookedSlots = new Set(confirmedBookings.map((booking) => booking.timeSlot));

		// Filter out booked slots
		return allSlotsFormatted.filter((slot) => !bookedSlots.has(slot));
	},
});

