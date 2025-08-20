// app/(site)/team/page.tsx
"use client";

import { useState } from "react";
import { SectionHeading } from "@/components/shared/section-heading";
import { CardTeam } from "@/components/shared/card-team";
import { TEAM, SERVICES } from "@/lib/data";

export default function TeamPage() {
	const [selectedService, setSelectedService] = useState("");
	const filteredTeam = selectedService
		? TEAM.filter((t) => t.serviceSlug === selectedService)
		: TEAM;

	return (
		<section className="section">
			<div className="container">
				<SectionHeading
					title="Meet the team"
					subtitle="Professional profiles and friendly faces."
				/>
				<div className="mb-6">
					<select
						value={selectedService}
						onChange={(e) => setSelectedService(e.target.value)}
						className="border rounded-md p-2"
					>
						<option value="">All Services</option>
						{SERVICES.map((s) => (
							<option key={s.slug} value={s.slug}>
								{s.title}
							</option>
						))}
					</select>
				</div>
				<div className="grid md:grid-cols-2 gap-6">
					{filteredTeam.map((t) => {
						const service = SERVICES.find((s) => s.slug === t.serviceSlug);
						return (
							<CardTeam
								key={t.name}
								name={t.name}
								role={service?.title || t.serviceSlug}
								bio={t.bio}
								photoUrl={t.photoUrl}
								links={t.links}
							/>
						);
					})}
				</div>
			</div>
		</section>
	);
}
