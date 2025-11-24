"use client";

import { AdminGuard } from "@/components/admin/admin-guard";
import { useQuery, useMutation } from "convex/react";
import { api } from "@/convex/_generated/api";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { format } from "date-fns";
import Link from "next/link";
import { Plus, Calendar, Users, CheckCircle, XCircle, LogOut } from "lucide-react";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import { Id } from "@/convex/_generated/dataModel";

export default function AdminDashboard() {
	const router = useRouter();
	const pendingBookings = useQuery(api.bookings.listBookings, { status: "pending" });
	const todayBookings = useQuery(api.bookings.listBookings, {
		date: format(new Date(), "yyyy-MM-dd"),
	});
	const practitioners = useQuery(api.practitioners.listPractitioners, { activeOnly: true });

	const confirmBooking = useMutation(api.bookings.confirmBooking);
	const rejectBooking = useMutation(api.bookings.rejectBooking);

	const handleConfirm = async (id: string) => {
		try {
			await confirmBooking({ id: id as Id<"bookings"> });
			toast.success("Booking confirmed");
		} catch {
			toast.error("Failed to confirm booking");
		}
	};

	const handleReject = async (id: string) => {
		try {
			await rejectBooking({ id: id as Id<"bookings"> });
			toast.success("Booking rejected");
		} catch {
			toast.error("Failed to reject booking");
		}
	};

	const handleLogout = async () => {
		try {
			await fetch("/api/admin/logout", { method: "POST" });
			router.push("/admin/login");
		} catch {
			toast.error("Failed to logout");
		}
	};

	const stats = {
		pending: pendingBookings?.length || 0,
		today: todayBookings?.filter((b) => b.status === "confirmed").length || 0,
		practitioners: practitioners?.length || 0,
	};

	return (
		<AdminGuard>
			<div className="container mx-auto p-6 space-y-6">
				<div className="flex items-center justify-between">
					<h1 className="text-3xl font-bold">Admin Dashboard</h1>
					<div className="flex gap-2">
						<Button asChild variant="outline">
							<Link href="/admin/practitioners">
								<Users className="h-4 w-4 mr-2" />
								Practitioners
							</Link>
						</Button>
						<Button asChild className="bg-[#007966] hover:bg-[#007966]/90">
							<Link href="/admin/bookings/create">
								<Plus className="h-4 w-4 mr-2" />
								New Booking
							</Link>
						</Button>
						<Button variant="ghost" onClick={handleLogout}>
							<LogOut className="h-4 w-4 mr-2" />
							Logout
						</Button>
					</div>
				</div>

				<div className="grid gap-4 md:grid-cols-3">
					<Card>
						<CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
							<CardTitle className="text-sm font-medium">Pending Bookings</CardTitle>
							<Calendar className="h-4 w-4 text-muted-foreground" />
						</CardHeader>
						<CardContent>
							<div className="text-2xl font-bold">{stats.pending}</div>
						</CardContent>
					</Card>
					<Card>
						<CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
							<CardTitle className="text-sm font-medium">Today&apos;s Confirmed</CardTitle>
							<CheckCircle className="h-4 w-4 text-muted-foreground" />
						</CardHeader>
						<CardContent>
							<div className="text-2xl font-bold">{stats.today}</div>
						</CardContent>
					</Card>
					<Card>
						<CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
							<CardTitle className="text-sm font-medium">Active Practitioners</CardTitle>
							<Users className="h-4 w-4 text-muted-foreground" />
						</CardHeader>
						<CardContent>
							<div className="text-2xl font-bold">{stats.practitioners}</div>
						</CardContent>
					</Card>
				</div>

				<Card>
					<CardHeader>
						<CardTitle>Pending Bookings</CardTitle>
						<CardDescription>Bookings awaiting confirmation</CardDescription>
					</CardHeader>
					<CardContent>
						{pendingBookings === undefined ? (
							<div>Loading...</div>
						) : pendingBookings.length === 0 ? (
							<div className="text-muted-foreground">No pending bookings</div>
						) : (
							<Table>
								<TableHeader>
									<TableRow>
										<TableHead>Patient</TableHead>
										<TableHead>Practitioner</TableHead>
										<TableHead>Date</TableHead>
										<TableHead>Time</TableHead>
										<TableHead>Reason</TableHead>
										<TableHead>Actions</TableHead>
									</TableRow>
								</TableHeader>
								<TableBody>
									{pendingBookings.map((booking) => (
										<TableRow key={booking._id}>
											<TableCell>{booking.patientName}</TableCell>
											<TableCell>
												{booking.practitioner?.fullName || "N/A"}
											</TableCell>
											<TableCell>{booking.date}</TableCell>
											<TableCell>{booking.timeSlot}</TableCell>
											<TableCell className="max-w-xs truncate">
												{booking.reason}
											</TableCell>
											<TableCell>
												<div className="flex gap-2">
													<Button
														size="sm"
														variant="outline"
														onClick={() => router.push(`/admin/bookings/${booking._id}`)}
													>
														View
													</Button>
													<Button
														size="sm"
														className="bg-green-600 hover:bg-green-700"
														onClick={() => handleConfirm(booking._id)}
													>
														<CheckCircle className="h-4 w-4" />
													</Button>
													<Button
														size="sm"
														variant="destructive"
														onClick={() => handleReject(booking._id)}
													>
														<XCircle className="h-4 w-4" />
													</Button>
												</div>
											</TableCell>
										</TableRow>
									))}
								</TableBody>
							</Table>
						)}
					</CardContent>
				</Card>
			</div>
		</AdminGuard>
	);
}

