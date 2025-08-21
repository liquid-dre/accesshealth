// components/layout/site-header.tsx
"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Menu } from "lucide-react";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { HeartPulseLoader } from "../ui/heart-pulse-loader";
import { useRouter, usePathname } from "next/navigation";
import { PulsingRippleButton } from "@/components/shared/pulsing-ripple-button";

export function SiteHeader() {
	const [open, setOpen] = useState(false);
	const [loading, setLoading] = useState(false);
	const router = useRouter();
	const pathname = usePathname();

	useEffect(() => setLoading(false), [pathname]);

	useEffect(() => {
		router.prefetch("/services");
		router.prefetch("/team");
		router.prefetch("/resources");
		router.prefetch("/contact");
	}, [router]);

	return (
		<header className="sticky top-0 z-50 backdrop-blur bg-white/10 border-b">
			<div className="container h-16 flex items-center  justify-between">
				<div className="flex items-center gap-2">
					<Link
						href="/"
						className="font-semibold tracking-tight text-4xl"
						onClick={() => setLoading(true)}
					>
						<span className="text-[color:var(--brand-blue)]">Access</span>{" "}
						<span className="text-[color:var(--brand-red)]">Health</span>
					</Link>
					{/* {loading && ( */}
					<HeartPulseLoader className="h-4 w-16" />
					{/* )} */}
				</div>

				<nav className="hidden md:flex gap-6 items-center text-[15px]">
					<Link
						href="/services"
						className="hover:opacity-80"
						onClick={() => setLoading(true)}
					>
						Services
					</Link>
					<Link
						href="/team"
						className="hover:opacity-80"
						onClick={() => setLoading(true)}
					>
						Team
					</Link>
					<Link
						href="/resources"
						className="hover:opacity-80"
						onClick={() => setLoading(true)}
					>
						Resources
					</Link>
					<Link
						href="/contact"
						className="hover:opacity-80"
						onClick={() => setLoading(true)}
					>
						Contact
					</Link>
				</nav>

				<div className="hidden md:block">
					<PulsingRippleButton onClick={() => setLoading(true)} />
				</div>

				{/* Mobile */}
				<Sheet open={open} onOpenChange={setOpen}>
					<SheetTrigger asChild className="md:hidden">
						<Button variant="ghost" size="icon" aria-label="Open menu">
							<Menu />
						</Button>
					</SheetTrigger>
					<SheetContent side="right" className="pt-12">
						<div className="flex flex-col gap-5 text-lg">
							<Link
								href="/"
								onClick={() => {
									setOpen(false);
									setLoading(true);
								}}
							>
								Home
							</Link>
							<Link
								href="/services"
								onClick={() => {
									setOpen(false);
									setLoading(true);
								}}
							>
								Services
							</Link>
							<Link
								href="/team"
								onClick={() => {
									setOpen(false);
									setLoading(true);
								}}
							>
								Team
							</Link>
							<Link
								href="/resources"
								onClick={() => {
									setOpen(false);
									setLoading(true);
								}}
							>
								Resources
							</Link>
							<Link
								href="/contact"
								onClick={() => {
									setOpen(false);
									setLoading(true);
								}}
							>
								Contact
							</Link>
							<PulsingRippleButton onClick={() => setLoading(true)} />
						</div>
					</SheetContent>
				</Sheet>
			</div>
		</header>
	);
}
