import { z } from "zod";

export const practitionerSchema = z.object({
	fullName: z.string().min(1, "Full name is required"),
	email: z.string().email("Invalid email address"),
	phone: z.string().min(1, "Phone number is required"),
	specialty: z.string().optional(),
	workingHours: z.object({
		monday: z.array(z.object({ start: z.string(), end: z.string() })),
		tuesday: z.array(z.object({ start: z.string(), end: z.string() })),
		wednesday: z.array(z.object({ start: z.string(), end: z.string() })),
		thursday: z.array(z.object({ start: z.string(), end: z.string() })),
		friday: z.array(z.object({ start: z.string(), end: z.string() })),
		saturday: z.array(z.object({ start: z.string(), end: z.string() })),
		sunday: z.array(z.object({ start: z.string(), end: z.string() })),
	}),
	active: z.boolean(),
});

export const bookingSchema = z.object({
	patientName: z.string().min(1, "Patient name is required"),
	patientPhone: z.string().min(1, "Phone number is required"),
	patientEmail: z.string().email("Invalid email address").optional().or(z.literal("")),
	practitionerId: z.string().min(1, "Practitioner is required"),
	reason: z.string().min(1, "Reason is required"),
	date: z.string().regex(/^\d{4}-\d{2}-\d{2}$/, "Date must be in YYYY-MM-DD format"),
	timeSlot: z.string().regex(/^\d{2}:\d{2}-\d{2}:\d{2}$/, "Time slot must be in HH:mm-HH:mm format"),
});

export const loginSchema = z.object({
	email: z.string().email("Invalid email address"),
	password: z.string().min(1, "Password is required"),
});

export type PractitionerFormData = z.infer<typeof practitionerSchema>;
export type BookingFormData = z.infer<typeof bookingSchema>;
export type LoginFormData = z.infer<typeof loginSchema>;

