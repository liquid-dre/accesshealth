"use client";

import { ContactForm } from "@/components/forms/contact-form";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
import { Reveal } from "@/components/shared/Reveal";

export function ContactCTA() {
	return (
		<Reveal as="section" className="section">
			<div className="container">
				<div className="card grad-border p-10">
					<div className="grid items-start gap-10 md:grid-cols-2">
						<div>
							<p className="inline-block rounded-pill border border-border bg-card px-3 py-1 text-sm text-muted-foreground">
								We’ll get back within 1 business day
							</p>
							<h3 className="mt-3 text-3xl font-semibold">Ready to visit?</h3>
							<p className="mt-2 text-muted-foreground">
								Call, email, or send a message — we’ll confirm your booking
								shortly.
							</p>
							<div className="mt-6 space-y-2 text-sm text-muted-foreground">
								<p>
									<strong>Address:</strong> Shop 22 Mini Mall, Hogerty Hill
									Centre, William Powlett Dr, Harare
								</p>
								<p>
									<strong>Phone:</strong> +263 (0) 78 345 8985
								</p>
								<p>
									<strong>Email:</strong> accesshealthclinics@gmail.com
								</p>
								<p>
									<strong>Hours:</strong> Mon–Fri 08:00–18:00, Sat 09:00–13:00
								</p>
							</div>
							<div className="mt-6">
								<Button className="btn-pill bg-[color:var(--brand-blue)] text-white hover:bg-[color:var(--brand-blue)]/90">
									Call now
									<ArrowRight />
								</Button>
							</div>
						</div>
						<ContactForm />
					</div>
				</div>
			</div>
		</Reveal>
	);
}
