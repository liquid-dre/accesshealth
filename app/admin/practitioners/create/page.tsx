"use client";

import { AdminGuard } from "@/components/admin/admin-guard";
import { useState } from "react";
import { useMutation } from "convex/react";
import { api } from "@/convex/_generated/api";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { WorkingHoursForm } from "@/components/admin/working-hours-form";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";

const defaultWorkingHours = {
	monday: [{ start: "09:00", end: "17:00" }],
	tuesday: [{ start: "09:00", end: "17:00" }],
	wednesday: [{ start: "09:00", end: "17:00" }],
	thursday: [{ start: "09:00", end: "17:00" }],
	friday: [{ start: "09:00", end: "17:00" }],
	saturday: [],
	sunday: [],
};

export default function CreatePractitionerPage() {
	const router = useRouter();
	const [fullName, setFullName] = useState("");
	const [email, setEmail] = useState("");
	const [phone, setPhone] = useState("");
	const [specialty, setSpecialty] = useState("");
	const [workingHours, setWorkingHours] = useState(defaultWorkingHours);
	const [active, setActive] = useState(true);

	const createPractitioner = useMutation(api.practitioners.createPractitioner);

	const handleSubmit = async (e: React.FormEvent) => {
		e.preventDefault();

		try {
			await createPractitioner({
				fullName,
				email,
				phone,
				specialty: specialty || undefined,
				workingHours,
				active,
			});
			toast.success("Practitioner created successfully");
			router.push("/admin/practitioners");
		} catch (error) {
			toast.error("Failed to create practitioner");
			console.error(error);
		}
	};

	return (
		<AdminGuard>
			<div className="container mx-auto p-6 max-w-4xl">
				<Button asChild variant="ghost" className="mb-4">
					<Link href="/admin/practitioners">
						<ArrowLeft className="h-4 w-4 mr-2" />
						Back to Practitioners
					</Link>
				</Button>
				<Card>
					<CardHeader>
						<CardTitle>Create New Practitioner</CardTitle>
						<CardDescription>
							Add a new practitioner and set their working hours
						</CardDescription>
					</CardHeader>
					<CardContent>
						<form onSubmit={handleSubmit} className="space-y-6">
							<div className="grid md:grid-cols-2 gap-4">
								<div className="space-y-2">
									<Label htmlFor="fullName">Full Name *</Label>
									<Input
										id="fullName"
										value={fullName}
										onChange={(e) => setFullName(e.target.value)}
										required
									/>
								</div>
								<div className="space-y-2">
									<Label htmlFor="email">Email *</Label>
									<Input
										id="email"
										type="email"
										value={email}
										onChange={(e) => setEmail(e.target.value)}
										required
									/>
								</div>
								<div className="space-y-2">
									<Label htmlFor="phone">Phone *</Label>
									<Input
										id="phone"
										type="tel"
										value={phone}
										onChange={(e) => setPhone(e.target.value)}
										required
									/>
								</div>
								<div className="space-y-2">
									<Label htmlFor="specialty">Specialty</Label>
									<Input
										id="specialty"
										value={specialty}
										onChange={(e) => setSpecialty(e.target.value)}
										placeholder="e.g., General Practitioner"
									/>
								</div>
							</div>

							<div className="space-y-2">
								<Label>Working Hours *</Label>
								<WorkingHoursForm
									value={workingHours}
									onChange={setWorkingHours}
								/>
							</div>

							<div className="flex items-center space-x-2">
								<input
									type="checkbox"
									id="active"
									checked={active}
									onChange={(e) => setActive(e.target.checked)}
									className="rounded"
								/>
								<Label htmlFor="active">Active</Label>
							</div>

							<Button
								type="submit"
								className="w-full bg-[#007966] hover:bg-[#007966]/90"
							>
								Create Practitioner
							</Button>
						</form>
					</CardContent>
				</Card>
			</div>
		</AdminGuard>
	);
}

