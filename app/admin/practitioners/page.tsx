"use client";

import { AdminGuard } from "@/components/admin/admin-guard";
import { useQuery } from "convex/react";
import { api } from "@/convex/_generated/api";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import Link from "next/link";
import { Plus } from "lucide-react";

export default function PractitionersPage() {
	const practitioners = useQuery(api.practitioners.listPractitioners);

	return (
		<AdminGuard>
			<div className="container mx-auto p-6 space-y-6">
				<div className="flex items-center justify-between">
					<h1 className="text-3xl font-bold">Practitioners</h1>
					<Button asChild className="bg-[#007966] hover:bg-[#007966]/90">
						<Link href="/admin/practitioners/create">
							<Plus className="h-4 w-4 mr-2" />
							Add Practitioner
						</Link>
					</Button>
				</div>

				<Card>
					<CardHeader>
						<CardTitle>All Practitioners</CardTitle>
						<CardDescription>Manage practitioner profiles and schedules</CardDescription>
					</CardHeader>
					<CardContent>
						{practitioners === undefined ? (
							<div>Loading...</div>
						) : practitioners.length === 0 ? (
							<div className="text-muted-foreground">
								No practitioners found. Create one to get started.
							</div>
						) : (
							<Table>
								<TableHeader>
									<TableRow>
										<TableHead>Name</TableHead>
										<TableHead>Email</TableHead>
										<TableHead>Phone</TableHead>
										<TableHead>Specialty</TableHead>
										<TableHead>Status</TableHead>
									</TableRow>
								</TableHeader>
								<TableBody>
									{practitioners.map((practitioner) => (
										<TableRow key={practitioner._id}>
											<TableCell className="font-medium">
												{practitioner.fullName}
											</TableCell>
											<TableCell>{practitioner.email}</TableCell>
											<TableCell>{practitioner.phone}</TableCell>
											<TableCell>
												{practitioner.specialty || "N/A"}
											</TableCell>
											<TableCell>
												<Badge
													className={
														practitioner.active
															? "bg-green-500"
															: "bg-gray-500"
													}
												>
													{practitioner.active ? "Active" : "Inactive"}
												</Badge>
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

