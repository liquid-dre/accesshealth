"use client";

import { AdminGuard } from "@/components/admin/admin-guard";
import { useQuery, useMutation } from "convex/react";
import { api } from "@/convex/_generated/api";
import { Id } from "@/convex/_generated/dataModel";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { BookingForm } from "@/components/admin/booking-form";
import {
	Dialog,
	DialogContent,
	DialogDescription,
	DialogHeader,
	DialogTitle,
	DialogTrigger,
} from "@/components/ui/dialog";
import Link from "next/link";
import { ArrowLeft, CheckCircle, XCircle, Edit } from "lucide-react";
import { toast } from "sonner";
import { useState } from "react";
import { useParams } from "next/navigation";

export default function BookingDetailPage() {
	const params = useParams();
	const bookingId = params.id as string;
	const [isEditOpen, setIsEditOpen] = useState(false);
	const booking = useQuery(api.bookings.getBooking, {
		id: bookingId as Id<"bookings">,
	});

	const confirmBooking = useMutation(api.bookings.confirmBooking);
	const rejectBooking = useMutation(api.bookings.rejectBooking);

	const handleConfirm = async () => {
		try {
			await confirmBooking({ id: bookingId as Id<"bookings"> });
			toast.success("Booking confirmed");
		} catch (error) {
			const message = error instanceof Error ? error.message : "Failed to confirm booking";
			toast.error(message);
		}
	};

	const handleReject = async () => {
		try {
			await rejectBooking({ id: bookingId as Id<"bookings"> });
			toast.success("Booking rejected");
		} catch (error) {
			const message = error instanceof Error ? error.message : "Failed to reject booking";
			toast.error(message);
		}
	};

	if (booking === undefined) {
		return (
			<AdminGuard>
				<div className="container mx-auto p-6">Loading...</div>
			</AdminGuard>
		);
	}

	if (!booking) {
		return (
			<AdminGuard>
				<div className="container mx-auto p-6">Booking not found</div>
			</AdminGuard>
		);
	}

	const statusColors = {
		pending: "bg-yellow-500",
		confirmed: "bg-green-500",
		rejected: "bg-red-500",
	};

	return (
		<AdminGuard>
			<div className="container mx-auto p-6 max-w-4xl space-y-6">
				<Button asChild variant="ghost">
					<Link href="/admin/dashboard">
						<ArrowLeft className="h-4 w-4 mr-2" />
						Back to Dashboard
					</Link>
				</Button>

				<Card>
					<CardHeader>
						<div className="flex items-center justify-between">
							<div>
								<CardTitle>Booking Details</CardTitle>
								<CardDescription>Booking ID: {booking._id}</CardDescription>
							</div>
							<Badge className={statusColors[booking.status]}>
								{booking.status.toUpperCase()}
							</Badge>
						</div>
					</CardHeader>
					<CardContent className="space-y-4">
						<div className="grid md:grid-cols-2 gap-4">
							<div>
								<strong>Patient Name:</strong> {booking.patientName}
							</div>
							<div>
								<strong>Patient Phone:</strong> {booking.patientPhone}
							</div>
							{booking.patientEmail && (
								<div>
									<strong>Patient Email:</strong> {booking.patientEmail}
								</div>
							)}
							<div>
								<strong>Practitioner:</strong>{" "}
								{booking.practitioner?.fullName || "N/A"}
							</div>
							<div>
								<strong>Date:</strong> {booking.date}
							</div>
							<div>
								<strong>Time Slot:</strong> {booking.timeSlot}
							</div>
							<div>
								<strong>Status:</strong> {booking.status}
							</div>
						</div>
						<div>
							<strong>Reason:</strong>
							<p className="mt-1 text-muted-foreground">{booking.reason}</p>
						</div>
						<div className="flex gap-2 pt-4">
							{booking.status === "pending" && (
								<>
									<Button
										className="bg-green-600 hover:bg-green-700"
										onClick={handleConfirm}
									>
										<CheckCircle className="h-4 w-4 mr-2" />
										Confirm
									</Button>
									<Button variant="destructive" onClick={handleReject}>
										<XCircle className="h-4 w-4 mr-2" />
										Reject
									</Button>
								</>
							)}
							<Dialog open={isEditOpen} onOpenChange={setIsEditOpen}>
								<DialogTrigger asChild>
									<Button variant="outline">
										<Edit className="h-4 w-4 mr-2" />
										Edit
									</Button>
								</DialogTrigger>
								<DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
									<DialogHeader>
										<DialogTitle>Edit Booking</DialogTitle>
										<DialogDescription>
											Update booking details and reschedule if needed
										</DialogDescription>
									</DialogHeader>
									<BookingForm
										initialData={{
											id: booking._id,
											patientName: booking.patientName,
											patientPhone: booking.patientPhone,
											patientEmail: booking.patientEmail,
											practitionerId: booking.practitionerId,
											reason: booking.reason,
											date: booking.date,
											timeSlot: booking.timeSlot,
										}}
										onSuccess={() => setIsEditOpen(false)}
									/>
								</DialogContent>
							</Dialog>
						</div>
					</CardContent>
				</Card>
			</div>
		</AdminGuard>
	);
}

