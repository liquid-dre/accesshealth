"use client";

import { SERVICES } from "@/lib/data";
import { SectionHeading } from "@/components/shared/section-heading";
import { motion } from "framer-motion";

export function ServicesSection() {
	return (
		<section className="section">
			<div className="container">
				<SectionHeading
					title="Services that meet you where you are"
					subtitle="From routine GP visits to ultrasound and chronic care, all under one roof."
				/>
				<div className="space-y-20">
					{SERVICES.map((s, i) => (
						<motion.div
							key={s.slug}
							className="grid md:grid-cols-2 gap-12"
							initial={{ opacity: 0, y: 24 }}
							whileInView={{ opacity: 1, y: 0 }}
							viewport={{ once: true, amount: 0.4 }}
							transition={{ duration: 0.5 }}
						>
							<div className={`${i % 2 === 1 ? "md:col-start-2" : ""}`}>
								<div className="p-8 rounded-3xl border border-gray-300 bg-gradient-to-br from-brand-blue50 to-brand-mint hover:scale-105 transition-transform">
									<h3 className="text-xl font-semibold">{s.title}</h3>
									<p className="mt-2 text-gray-700">{s.blurb}</p>
								</div>
							</div>
						</motion.div>
					))}
				</div>
			</div>
		</section>
	);
}
