"use client";

import { useState } from "react";
import { useMutation, useQuery } from "convex/react";
import { api } from "@/convex/_generated/api";
import { Id } from "@/convex/_generated/dataModel";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from "@/components/ui/select";
import { SlotSelector } from "./slot-selector";
import { format } from "date-fns";
import { toast } from "sonner";
import { useRouter } from "next/navigation";

interface BookingFormProps {
	initialData?: {
		id: Id<"bookings">;
		patientName: string;
		patientPhone: string;
		patientEmail?: string;
		practitionerId: Id<"practitioners">;
		reason: string;
		date: string;
		timeSlot: string;
	};
	onSuccess?: () => void;
}

export function BookingForm({ initialData, onSuccess }: BookingFormProps) {
	const router = useRouter();
	const [patientName, setPatientName] = useState(initialData?.patientName || "");
	const [patientPhone, setPatientPhone] = useState(
		initialData?.patientPhone || ""
	);
	const [patientEmail, setPatientEmail] = useState(
		initialData?.patientEmail || ""
	);
	const [practitionerId, setPractitionerId] = useState<Id<"practitioners"> | null>(
		initialData?.practitionerId || null
	);
	const [reason, setReason] = useState(initialData?.reason || "");
	const [date, setDate] = useState(
		initialData?.date || format(new Date(), "yyyy-MM-dd")
	);
	const [timeSlot, setTimeSlot] = useState<string | null>(
		initialData?.timeSlot || null
	);

	const practitioners = useQuery(api.practitioners.listPractitioners, {
		activeOnly: true,
	});

	const createBooking = useMutation(api.bookings.createBooking);
	const updateBooking = useMutation(api.bookings.updateBooking);
	const [isSubmitting, setIsSubmitting] = useState(false);

	const handleSubmit = async (e: React.FormEvent) => {
		e.preventDefault();

		if (!practitionerId || !timeSlot) {
			toast.error("Please select a practitioner and time slot");
			return;
		}

		setIsSubmitting(true);
		try {
			if (initialData) {
				await updateBooking({
					id: initialData.id,
					patientName,
					patientPhone,
					patientEmail: patientEmail || undefined,
					practitionerId,
					reason,
					date,
					timeSlot,
				});
				toast.success("Booking updated successfully");
			} else {
				await createBooking({
					patientName,
					patientPhone,
					patientEmail: patientEmail || undefined,
					practitionerId,
					reason,
					date,
					timeSlot,
				});
				toast.success("Booking created successfully");
			}
			onSuccess?.();
			if (!onSuccess) {
				router.push("/admin/dashboard");
			}
		} catch (error) {
			const message = error instanceof Error ? error.message : "Failed to save booking";
			toast.error(message);
		} finally {
			setIsSubmitting(false);
		}
	};

	return (
		<form onSubmit={handleSubmit} className="space-y-6">
			<div className="space-y-2">
				<Label htmlFor="practitioner">Practitioner *</Label>
				<Select
					value={practitionerId || undefined}
					onValueChange={(value) =>
						setPractitionerId(value as Id<"practitioners">)
					}
				>
					<SelectTrigger>
						<SelectValue placeholder="Select a practitioner" />
					</SelectTrigger>
					<SelectContent>
						{practitioners?.map((practitioner) => (
							<SelectItem key={practitioner._id} value={practitioner._id}>
								{practitioner.fullName}
								{practitioner.specialty && ` - ${practitioner.specialty}`}
							</SelectItem>
						))}
					</SelectContent>
				</Select>
			</div>

			<div className="space-y-2">
				<Label htmlFor="date">Date *</Label>
				<Input
					id="date"
					type="date"
					value={date}
					onChange={(e) => setDate(e.target.value)}
					min={format(new Date(), "yyyy-MM-dd")}
					required
				/>
			</div>

			<div className="space-y-2">
				<Label>Time Slot *</Label>
				<SlotSelector
					practitionerId={practitionerId}
					date={date}
					selectedSlot={timeSlot}
					onSelectSlot={setTimeSlot}
				/>
			</div>

			<div className="space-y-2">
				<Label htmlFor="patientName">Patient Name *</Label>
				<Input
					id="patientName"
					value={patientName}
					onChange={(e) => setPatientName(e.target.value)}
					required
				/>
			</div>

			<div className="space-y-2">
				<Label htmlFor="patientPhone">Patient Phone *</Label>
				<Input
					id="patientPhone"
					type="tel"
					value={patientPhone}
					onChange={(e) => setPatientPhone(e.target.value)}
					required
				/>
			</div>

			<div className="space-y-2">
				<Label htmlFor="patientEmail">Patient Email (optional)</Label>
				<Input
					id="patientEmail"
					type="email"
					value={patientEmail}
					onChange={(e) => setPatientEmail(e.target.value)}
					placeholder="For confirmation emails"
				/>
			</div>

			<div className="space-y-2">
				<Label htmlFor="reason">Reason for Visit *</Label>
				<Textarea
					id="reason"
					value={reason}
					onChange={(e) => setReason(e.target.value)}
					required
					rows={3}
				/>
			</div>

			<Button 
				type="submit" 
				className="w-full bg-[#007966] hover:bg-[#007966]/90"
				disabled={isSubmitting}
			>
				{isSubmitting ? "Saving..." : initialData ? "Update Booking" : "Create Booking"}
			</Button>
		</form>
	);
}

