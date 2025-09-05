// components/layout/site-header.tsx
"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Menu, Sun, Moon, MoonStar } from "lucide-react";
import {
	Sheet,
	SheetContent,
	SheetTrigger,
	SheetTitle,
} from "@/components/ui/sheet";
import { HeartPulseLoader } from "../ui/heart-pulse-loader";
import { usePathname } from "next/navigation";
import Image from "next/image";

export function SiteHeader() {
	const [open, setOpen] = useState(false);
	const [, setLoading] = useState(false);
	const [isDark, setIsDark] = useState(false);
	const pathname = usePathname();

	useEffect(() => setLoading(false), [pathname]);

	useEffect(() => setLoading(false), [pathname]);

	useEffect(() => {
		const stored = localStorage.getItem("isDark");
		if (stored !== null) {
			setIsDark(stored === "true");
		} else {
			setIsDark(window.matchMedia("(prefers-color-scheme: dark)").matches);
		}
	}, []);

	useEffect(() => {
		document.documentElement.classList.toggle("dark", isDark);
		localStorage.setItem("isDark", String(isDark));
	}, [isDark]);

	return (
		<header className="sticky top-0 z-50 backdrop-blur bg-white/10 border-b">
			<div className="container h-14 md:h-16 px-4 sm:px-6 flex items-center justify-between">
				<div className="flex items-center gap-2">
					<Link href="/" onClick={() => setLoading(true)}>
						<Image
							src="/images/logo/Access%20Logo-2.png"
							alt="Access Health logo"
							width={160}
							height={40}
							className="h-8 md:h-10 w-auto hover:scale-115"
							priority
						/>
					</Link>
					<HeartPulseLoader className="h-4 w-16" />
				</div>

				<nav className="hidden md:flex gap-6 items-center text-[15px]">
					<Link
						href="/"
						className="hover:opacity-80"
						onClick={() => setLoading(true)}
					>
						Home
					</Link>
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
					<Button
						variant="ghost"
						size="icon"
						onClick={() => setIsDark((prev) => !prev)}
						aria-label="Toggle theme"
					>
						{isDark ? (
							<Sun className="size-6 text-yellow-500" />
						) : (
							<MoonStar className="size-6 text-indigo-300" />
						)}
					</Button>
				</nav>

				<div className="hidden md:block">
					<Button
						asChild
						className="relative overflow-hidden btn-pill bg-[color:var(--brand-blue)] hover:shadow-lift transition hover-heartbeat-red text-white"
					>
						<Link href="/contact" onClick={() => setLoading(true)}>
							Book an appointment
						</Link>
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
						<SheetTitle className="sr-only">Main Navigation</SheetTitle>
						<div className="flex flex-col items-center text-center gap-5 text-lg">
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
							<Button
								asChild
								className="btn-pill bg-[color:var(--brand-blue)] text-white"
							>
								<Link
									href="/contact"
									onClick={() => {
										setOpen(false);
										setLoading(true);
									}}
								>
									Book
								</Link>
							</Button>
							<Button
								variant="ghost"
								size="icon"
								onClick={() => setIsDark((prev) => !prev)}
								aria-label="Toggle theme"
							>
								{isDark ? (
									<Sun className="size-4" />
								) : (
									<Moon className="size-4" />
								)}
							</Button>
						</div>
					</SheetContent>
				</Sheet>
			</div>
		</header>
	);
}
