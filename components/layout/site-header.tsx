// components/layout/site-header.tsx
"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
// import { useRouter } from "next/router";
import { Button } from "@/components/ui/button";
import { Menu } from "lucide-react";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { HeartPulseLoader } from "../ui/heart-pulse-loader";
import { useRouter } from "next/router";

export function SiteHeader() {
	const [open, setOpen] = useState(false);
	const [loading, setLoading] = useState(false);
	const router = useRouter();

	useEffect(() => {
		const handleStart = () => setLoading(true);
		const handleStop = () => setLoading(false);

		router.events.on("routeChangeStart", handleStart);
		router.events.on("routeChangeComplete", handleStop);
		router.events.on("routeChangeError", handleStop);

		return () => {
			router.events.off("routeChangeStart", handleStart);
			router.events.off("routeChangeComplete", handleStop);
			router.events.off("routeChangeError", handleStop);
		};
	}, [router]);

	return (
		<header className="sticky top-0 z-50 backdrop-blur bg-white/10 border-b">
			<div className="container h-16 flex items-center  justify-between">
				<div className="flex items-center gap-2">
					<Link href="/" className="font-semibold tracking-tight text-4xl">
						<span className="text-[color:var(--brand-blue)]">Access</span>{" "}
						<span className="text-[color:var(--brand-red)]">Health</span>
					</Link>
					{loading && (
						<HeartPulseLoader className="h-4 w-16 text-[color:var(--brand-red)]" />
					)}
				</div>

				<nav className="hidden md:flex gap-6 items-center text-[15px]">
					<Link href="/services" className="hover:opacity-80">
						Services
					</Link>
					<Link href="/team" className="hover:opacity-80">
						Team
					</Link>
					<Link href="/resources" className="hover:opacity-80">
						Resources
					</Link>
					<a href="#contact" className="hover:opacity-80">
						Contact
					</a>
				</nav>

				<div className="hidden md:block">
					<Button
						asChild
						className="btn-pill bg-[color:var(--brand-blue)] hover:shadow-lift hover:-translate-y-0.5 transition"
					>
						<Link href="#contact">Book an appointment</Link>
					</Button>
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
							<Link href="/" onClick={() => setOpen(false)}>
								Home
							</Link>
							<Link href="/services" onClick={() => setOpen(false)}>
								Services
							</Link>
							<Link href="/team" onClick={() => setOpen(false)}>
								Team
							</Link>
							<Link href="/resources" onClick={() => setOpen(false)}>
								Resources
							</Link>
							<a href="#contact" onClick={() => setOpen(false)}>
								Contact
							</a>
							<Button asChild className="btn-pill bg-[color:var(--brand-blue)]">
								<a href="#contact">Book</a>
							</Button>
						</div>
					</SheetContent>
				</Sheet>
			</div>
		</header>
	);
}
