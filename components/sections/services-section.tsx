"use client";

import { SERVICES } from "@/lib/data";
import { SectionHeading } from "@/components/shared/section-heading";
import { motion } from "framer-motion";
import { CardService } from "../shared/card-service";

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
								<CardService {...s} />
							</div>
						</motion.div>
					))}
				</div>
			</div>
		</section>
	);
}
