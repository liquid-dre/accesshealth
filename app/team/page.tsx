import { SectionHeading } from "@/components/shared/section-heading";
import { CardTeam } from "@/components/shared/card-team";

const team = [
	{
		name: "Dr. Alice N.",
		role: "General Practitioner",
		bio: "Gentle, thorough, and family-focused.",
	},
	{
		name: "Dr. Brian K.",
		role: "Paediatrician",
		bio: "Compassionate care for children and parents.",
	},
	{
		name: "Dr. Chipo T.",
		role: "Specialist Physician",
		bio: "Evidence-based specialist care.",
	},
];

export default function TeamPage() {
	return (
		<section className="section">
			<div className="container">
				<SectionHeading
					title="Meet the Team"
					subtitle="Professional profiles and friendly faces."
				/>
				<div className="grid md:grid-cols-2 gap-6">
					{team.map((t) => (
						<CardTeam key={t.name} {...t} />
					))}
				</div>
			</div>
		</section>
	);
}
