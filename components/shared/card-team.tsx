import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

export function CardTeam({
	name,
	role,
	bio,
	photoUrl,
}: {
	name: string;
	role: string;
	bio: string;
	photoUrl?: string;
}) {
	const initials = name
		.split(" ")
		.map((n) => n[0])
		.slice(0, 2)
		.join("")
		.toUpperCase();
	return (
		<div className="p-6 bg-white rounded-2xl border hover:shadow-soft transition grid grid-cols-[64px_1fr] gap-4">
			<Avatar className="h-16 w-16">
				<AvatarImage src={photoUrl} alt={name} />
				<AvatarFallback>{initials}</AvatarFallback>
			</Avatar>
			<div>
				<div className="font-semibold">{name}</div>
				<div className="text-sm text-[color:var(--brand-blue)]">{role}</div>
				<p className="text-sm text-gray-600 mt-2">{bio}</p>
			</div>
		</div>
	);
}
