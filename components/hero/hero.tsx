// components/home/hero.tsx
"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";

export function Hero() {
	return (
		<section className="section relative">
			{/* floating blobs */}
			<motion.div
				className="absolute -z-10 left-[-5%] top-[-6%] h-64 w-64 rounded-full blur-3xl"
				style={{
					background:
						"radial-gradient(120px 120px at 50% 50%, #dfe8ff, transparent)",
				}}
				animate={{ y: [0, -10, 0] }}
				transition={{ duration: 8, repeat: Infinity }}
			/>
			<motion.div
				className="absolute -z-10 right-[-4%] top-[20%] h-60 w-60 rounded-full blur-3xl"
				style={{
					background:
						"radial-gradient(120px 120px at 50% 50%, #ffd4d4, transparent)",
				}}
				animate={{ y: [0, 10, 0] }}
				transition={{ duration: 9, repeat: Infinity }}
			/>

			<div className="container grid md:grid-cols-12 gap-10 items-center">
				<div className="md:col-span-6">
					<p className="inline-flex items-center gap-2 text-sm bg-white rounded-pill px-3 py-1 border">
						New clinic • Family-focused care
					</p>
					<h1 className="mt-4 text-4xl md:text-6xl font-semibold leading-[1.1] tracking-tight">
						Feel better, live better —{" "}
						<span className="text-[color:var(--brand-blue)]">
							care that feels like home
						</span>
						.
					</h1>
					<p className="mt-4 text-lg text-gray-700">
						Access Health delivers compassionate GP and specialist services for
						families and seniors, with simple booking and attentive follow-up.
					</p>
					<div className="mt-8 flex flex-wrap gap-3">
						<Button
							asChild
							className="btn-pill bg-[color:var(--brand-blue)] hover:shadow-lift"
						>
							<Link href="#contact">Book an appointment</Link>
						</Button>
						<Button asChild variant="outline" className="btn-pill">
							<Link href="/services">Browse services</Link>
						</Button>
					</div>
					<ul className="mt-6 grid sm:grid-cols-3 gap-3 text-sm">
						{["GP consults", "Paediatrics", "Ultrasound"].map((t) => (
							<li
								key={t}
								className="bg-white border rounded-pill px-3 py-2 text-center"
							>
								{t}
							</li>
						))}
					</ul>
				</div>

				<div className="md:col-span-6">
					<div className="card grad-border p-3">
						<div className="aspect-[4/3] rounded-3xl bg-brand-stone relative overflow-hidden">
							{/* Placeholder illustration area; swap with ImageSlot later */}
							<div className="absolute inset-6 rounded-3xl bg-white/70 backdrop-blur flex items-center justify-center">
								<span className="text-gray-500">
									Clinic image / illustration
								</span>
							</div>
						</div>
					</div>
					<div className="mt-4 flex gap-2">
						<span className="text-xs bg-brand-blue100 text-[color:var(--brand-blue)] px-3 py-1 rounded-pill">
							Trusted care
						</span>
						<span className="text-xs bg-brand-red100 text-[color:var(--brand-red)] px-3 py-1 rounded-pill">
							Friendly team
						</span>
					</div>
				</div>
			</div>
		</section>
	);
}
