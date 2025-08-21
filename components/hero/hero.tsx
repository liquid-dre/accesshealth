// components/home/hero.tsx
"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Calendar, Mail } from "lucide-react";
import { ImageSlot } from "@/components/shared/image-slot";

export function Hero() {
	return (
		<section className="hero-spire section relative overflow-hidden">
			<div className="container grid md:grid-cols-2 gap-12 items-center">
				<div>
					<h1 className="text-4xl md:text-5xl font-semibold leading-tight">
						The sooner you&apos;re better, the better
					</h1>
					<p className="mt-4 text-lg">
						See an expert in as little as 48 hours.
					</p>
					<div className="mt-8 space-y-4">
						<div className="flex flex-col items-center gap-4 rounded-full border border-border bg-card p-5 shadow-sm text-muted-foreground sm:flex-row">
							<div className="flex items-start gap-3 flex-1">
								<div className="h-10 w-10 flex items-center justify-center rounded-full bg-[color:var(--primary)] text-white">
									<Calendar className="h-5 w-5" />
								</div>
								<div>
									<div className="font-semibold text-foreground">
										Book an appointment online
									</div>
									<p className="text-sm text-muted-foreground">
										Choose a consultant and a time to suit you
									</p>
								</div>
							</div>
							<Button
								asChild
								className="btn-pill rounded-full bg-[color:var(--primary)] text-white transition-all duration-200 hover:scale-120 hover:bg-[color:var(--primary)]/90 active:scale-95"
							>
								<Link href="#contact">Book online</Link>
							</Button>
						</div>

						<div className="flex flex-col items-center gap-4 rounded-full border border-border bg-card p-5 shadow-sm text-muted-foreground sm:flex-row">
							<div className="flex flex-1 items-start gap-3">
								<div className="h-10 w-10 flex items-center justify-center rounded-full bg-[color:var(--danger)] text-white">
									<Mail className="h-5 w-5" />
								</div>
								<div>
									<div className="font-semibold text-foreground">
										Have an enquiry?
									</div>
									<p className="text-sm text-muted-foreground">
										Send an enquiry and we will contact you
									</p>
								</div>
							</div>
							<Button
								asChild
								className="btn-pill rounded-full bg-[color:var(--primary)] text-white transition-all duration-200 hover:scale-120 hover:bg-[color:var(--primary)]/90 active:scale-95 sm:w-auto"
							>
								<Link href="#contact">Make an enquiry</Link>
							</Button>
						</div>
					</div>
				</div>
				<div>
					<div className="card grad-border p-3">
						<ImageSlot alt="Clinic reception" ratio="wide" />
					</div>
				</div>
			</div>
		</section>
	);
}
