"use client";

import Link from "next/link";
import Image from "next/image";
import { useEffect, useState } from "react";

export function SiteFooter() {
	const [isDark, setIsDark] = useState(false);

	useEffect(() => {
		const update = () =>
			setIsDark(document.documentElement.classList.contains("dark"));
		update();
		const observer = new MutationObserver(update);
		observer.observe(document.documentElement, {
			attributes: true,
			attributeFilter: ["class"],
		});
		return () => observer.disconnect();
	}, []);

	return (
		<footer className="mt-16 border-t border-border bg-background text-foreground dark:bg-black">
			<div className="container grid gap-8 py-12 md:grid-cols-3">
				<div>
					<div className="text-lg font-semibold h-8 md:h-10">
						{!isDark ? (
							<Image
								src="/images/logo/Access%20Logo-2.png"
								alt="Access Health logo"
								width={160}
								height={40}
								className="h-8 md:h-10 w-auto hover:scale-115"
								priority
							/>
						) : (
							<Image
								src="/images/logo/Access-logo-dark%202.jpg"
								alt="Access Health logo"
								width={160}
								height={40}
								className="h-8 md:h-10 w-auto hover:scale-115"
								priority
							/>
						)}
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
						<strong>Hours:</strong> Mon–Sun 09:00–18:00
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
