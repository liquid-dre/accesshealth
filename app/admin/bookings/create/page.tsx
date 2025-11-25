"use client";

import { AdminGuard } from "@/components/admin/admin-guard";
import { BookingForm } from "@/components/admin/booking-form";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";

export default function CreateBookingPage() {
	return (
		<AdminGuard>
			<div className="container mx-auto p-6 max-w-2xl">
				<Button asChild variant="ghost" className="mb-4">
					<Link href="/admin/dashboard">
						<ArrowLeft className="h-4 w-4 mr-2" />
						Back to Dashboard
					</Link>
				</Button>
				<Card>
					<CardHeader>
						<CardTitle>Create New Booking</CardTitle>
						<CardDescription>Book an appointment for a patient</CardDescription>
					</CardHeader>
					<CardContent>
						<BookingForm />
					</CardContent>
				</Card>
			</div>
		</AdminGuard>
	);
}

