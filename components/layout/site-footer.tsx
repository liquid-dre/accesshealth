import Link from "next/link";

export function SiteFooter() {
	return (
		<footer className="mt-16 border-t border-border bg-background text-foreground">
			<div className="container grid gap-8 py-12 md:grid-cols-3">
				<div>
					<div className="text-lg font-semibold">
						<span className="text-[color:var(--brand-blue)] dark:text-[#A2D8F5]">
							Access
						</span>{" "}
						<span className="text-[color:var(--brand-red)]">Health</span>
					</div>
					<p className="mt-3 text-sm text-muted-foreground">
						Warm, homely, and professional care for the whole family.
					</p>
				</div>

				<div>
					<h4 className="font-semibold">Contact</h4>
					<p className="mt-3 text-sm text-muted-foreground">
						Shop 22 Mini Mall, Hogerty Hill Centre,
						<br /> William Powlett Dr, Harare
						<br />
						+263 (0) 78 345 8985
						<br />
						accesshealthclinics@gmail.com
						<br />
						<strong>Hours:</strong> Mon–Sun 08:00–18:00
					</p>
				</div>

				<div>
					<h4 className="font-semibold">Quick Links</h4>
					<ul className="mt-3 space-y-2 text-sm text-muted-foreground">
						<li>
							<Link href="/services" className="hover:underline">
								Services
							</Link>
						</li>
						<li>
							<Link href="/team" className="hover:underline">
								Meet the Team
							</Link>
						</li>
						<li>
							<Link href="/resources" className="hover:underline">
								Resources
							</Link>
						</li>
						<li>
							<Link href="/contact" className="hover:underline">
								Book an Appointment
							</Link>
						</li>
					</ul>
				</div>
			</div>
			<div className="pb-8 text-center text-xs text-muted-foreground">
				© {new Date().getFullYear()} Access Health. All rights reserved.
			</div>
		</footer>
	);
}
