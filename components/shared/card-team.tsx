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
		<div className="group rounded-2xl border border-border bg-card p-6 transition transform hover:scale-[1.02] hover:bg-muted hover:shadow-lg">
			<div className="flex items-start gap-4">
				<div className="relative flex h-16 w-16 items-center justify-center overflow-hidden rounded-full bg-muted text-sm font-medium text-muted-foreground">
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
					<p className="mt-2 text-sm text-muted-foreground">{bio}</p>
					{links?.length ? (
						<div className="mt-4 flex gap-3">
							{links.map(({ href, label, icon: Icon }) => (
								<a
									key={href}
									href={href}
									aria-label={label}
									className="text-muted-foreground transition-colors hover:text-foreground"
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
