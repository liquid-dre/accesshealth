// components/home/hero.tsx
"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Calendar, Mail } from "lucide-react";
import { ImageSlot } from "@/components/shared/image-slot";

export function Hero() {
	return (
		<section className="section relative overflow-hidden">
			<div className="container grid md:grid-cols-2 gap-12 items-center">
				<div>
					<h1 className="text-4xl md:text-5xl font-semibold leading-tight">
						The sooner you're better, the better
					</h1>
					<p className="mt-4 text-lg text-gray-700">
						See an expert in as little as 48 hours.
					</p>
					<div className="mt-8 space-y-4">
						<div className="flex flex-col sm:flex-row items-center gap-4 bg-white border rounded-2xl p-5 shadow-sm">
							<div className="flex items-start gap-3 flex-1">
								<div className="h-10 w-10 flex items-center justify-center rounded-full bg-brand-blue100 text-[color:var(--brand-blue)]">
									<Calendar className="h-5 w-5" />
								</div>
								<div>
									<div className="font-semibold">
										Book an appointment online
									</div>
									<p className="text-sm text-gray-600">
										Choose a consultant and a time to suit you
									</p>
								</div>
							</div>
							<Button asChild className="btn-pill bg-[color:var(--brand-blue)]">
								<Link href="#contact">Book online</Link>
							</Button>
						</div>
						<div className="flex flex-col sm:flex-row items-center gap-4 bg-white border rounded-2xl p-5 shadow-sm">
							<div className="flex items-start gap-3 flex-1">
								<div className="h-10 w-10 flex items-center justify-center rounded-full bg-brand-red100 text-[color:var(--brand-red)]">
									<Mail className="h-5 w-5" />
								</div>
								<div>
									<div className="font-semibold">Have an enquiry?</div>
									<p className="text-sm text-gray-600">
										Send an enquiry and we will contact you
									</p>
								</div>
							</div>
							<Button asChild className="btn-pill bg-[color:var(--brand-blue)]">
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
