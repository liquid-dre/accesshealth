import Image from "next/image";
import { LucideIcon } from "lucide-react";

export function CardTeam({
	name,
	role,
	bio,
	photoUrl,
	links,
}: {
	name: string;
	role: string;
	bio: string;
	photoUrl?: string;
	links?: { href: string; label: string; icon: LucideIcon }[];
}) {
	const initials = name
		.split(" ")
		.map((n) => n[0])
		.slice(0, 2)
		.join("")
		.toUpperCase();

	return (
		<div className="group p-6 bg-white rounded-2xl border transition transform hover:shadow-lg hover:scale-[1.02] hover:bg-gray-50">
			<div className="flex items-start gap-4">
				<div className="relative h-16 w-16 rounded-full overflow-hidden bg-gray-100 flex items-center justify-center text-sm font-medium text-gray-600">
					{photoUrl ? (
						<Image
							src={photoUrl}
							alt={name}
							fill
							className="object-cover"
							sizes="64px"
						/>
					) : (
						initials
					)}
				</div>
				<div className="flex-1">
					<div className="font-semibold">{name}</div>
					<div className="text-sm text-[color:var(--brand-blue)]">{role}</div>
					<p className="text-sm text-gray-600 mt-2">{bio}</p>
					{links?.length ? (
						<div className="flex gap-3 mt-4">
							{links.map(({ href, label, icon: Icon }) => (
								<a
									key={href}
									href={href}
									aria-label={label}
									className="text-gray-500 hover:text-gray-900 transition-colors"
								>
									<Icon className="h-4 w-4" />
								</a>
							))}
						</div>
					) : null}
				</div>
			</div>
		</div>
	);
}
