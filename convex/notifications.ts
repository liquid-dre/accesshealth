import { internalAction } from "./_generated/server";
import { internal } from "./_generated/api";
import { api } from "./_generated/api";
import { v } from "convex/values";

export const sendAdminNotification = internalAction({
	args: {
		bookingId: v.id("bookings"),
	},
	handler: async (ctx, args) => {
		const booking = await ctx.runQuery(api.bookings.getBooking, {
			id: args.bookingId,
		});

		if (!booking) return;

		const practitioner = booking.practitioner;
		if (!practitioner) return;

		// Send email to admin using Resend
		const resendApiKey = process.env.RESEND_API_KEY;
		if (!resendApiKey) {
			console.error("RESEND_API_KEY not configured");
			return;
		}

		const adminEmail = process.env.ADMIN_EMAIL || "admin@accesshealth.com";

		try {
			const response = await fetch("https://api.resend.com/emails", {
				method: "POST",
				headers: {
					"Content-Type": "application/json",
					Authorization: `Bearer ${resendApiKey}`,
				},
				body: JSON.stringify({
					from: "Access Health <noreply@accesshealth.com>",
					to: [adminEmail],
					subject: `New Booking Request: ${booking.patientName}`,
					html: `
						<h2>New Booking Request</h2>
						<p><strong>Patient:</strong> ${booking.patientName}</p>
						<p><strong>Phone:</strong> ${booking.patientPhone}</p>
						<p><strong>Practitioner:</strong> ${practitioner.fullName}</p>
						<p><strong>Date:</strong> ${booking.date}</p>
						<p><strong>Time:</strong> ${booking.timeSlot}</p>
						<p><strong>Reason:</strong> ${booking.reason}</p>
						<p><strong>Status:</strong> ${booking.status}</p>
					`,
				}),
			});

			if (!response.ok) {
				const error = await response.text();
				console.error("Failed to send admin notification:", error);
			}
		} catch (error) {
			console.error("Error sending admin notification:", error);
		}
	},
});

export const sendPatientConfirmation = internalAction({
	args: {
		bookingId: v.id("bookings"),
	},
	handler: async (ctx, args) => {
		const booking = await ctx.runQuery(api.bookings.getBooking, {
			id: args.bookingId,
		});

		if (!booking) return;

		const practitioner = booking.practitioner;
		if (!practitioner) return;

		// Send confirmation email to patient
		const resendApiKey = process.env.RESEND_API_KEY;
		if (!resendApiKey) {
			console.error("RESEND_API_KEY not configured");
			return;
		}

		// Use patient email from booking if available, otherwise skip email
		const patientEmail = booking.patientEmail;
		if (!patientEmail) {
			console.log("No patient email provided, skipping confirmation email");
			return;
		}

		try {
			const response = await fetch("https://api.resend.com/emails", {
				method: "POST",
				headers: {
					"Content-Type": "application/json",
					Authorization: `Bearer ${resendApiKey}`,
				},
				body: JSON.stringify({
					from: "Access Health <noreply@accesshealth.com>",
					to: [patientEmail],
					subject: `Booking Confirmed: ${booking.date} at ${booking.timeSlot}`,
					html: `
						<h2>Your Booking is Confirmed</h2>
						<p>Dear ${booking.patientName},</p>
						<p>Your appointment has been confirmed:</p>
						<ul>
							<li><strong>Practitioner:</strong> ${practitioner.fullName}</li>
							<li><strong>Date:</strong> ${booking.date}</li>
							<li><strong>Time:</strong> ${booking.timeSlot}</li>
							<li><strong>Reason:</strong> ${booking.reason}</li>
						</ul>
						<p>Please arrive 10 minutes before your scheduled time.</p>
						<p>If you need to reschedule or cancel, please contact us.</p>
					`,
				}),
			});

			if (!response.ok) {
				const error = await response.text();
				console.error("Failed to send patient confirmation:", error);
			}
		} catch (error) {
			console.error("Error sending patient confirmation:", error);
		}
	},
});

