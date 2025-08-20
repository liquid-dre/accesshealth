// app/(site)/team/page.tsx
"use client";

import { useState } from "react";
import { SectionHeading } from "@/components/shared/section-heading";
import { CardTeam } from "@/components/shared/card-team";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { TEAM, SERVICES } from "@/lib/data";

export default function TeamPage() {
	const [selectedService, setSelectedService] = useState("");
	const [query, setQuery] = useState("");

	const filteredTeam = TEAM.filter((t) => {
		const serviceMatch = selectedService
			? t.serviceSlug === selectedService
			: true;
		const serviceTitle =
			SERVICES.find((s) => s.slug === t.serviceSlug)?.title || "";
		const queryMatch = query
			? t.name.toLowerCase().includes(query.toLowerCase()) ||
				serviceTitle.toLowerCase().includes(query.toLowerCase())
			: true;
		return serviceMatch && queryMatch;
	});

	const clearFilters = () => {
		setSelectedService("");
		setQuery("");
	};

	return (
		<section className="section">
			<div className="container">
				<SectionHeading
					title="Meet the team"
					subtitle="Professional profiles and friendly faces."
				/>
				<div className="mb-6 space-y-4">
					<div className="flex items-center gap-2">
						<Input
							value={query}
							onChange={(e) => setQuery(e.target.value)}
							placeholder="Search team..."
							className="max-w-sm"
						/>
						{(selectedService || query) && (
							<Button variant="outline" size="sm" onClick={clearFilters}>
								Clear
							</Button>
						)}
					</div>
					<Tabs value={selectedService} onValueChange={setSelectedService}>
						<TabsList className="flex flex-wrap">
							<TabsTrigger value="">All Services</TabsTrigger>
							{SERVICES.map((s) => (
								<TabsTrigger key={s.slug} value={s.slug}>
									{s.title}
								</TabsTrigger>
							))}
						</TabsList>
					</Tabs>
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
