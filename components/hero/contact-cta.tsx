// components/home/contact-cta.tsx
import { ContactForm } from "@/components/forms/contact-form";
import { Button } from "@/components/ui/button";

export function ContactCTA() {
	return (
		<section id="contact" className="section">
			<div className="container">
				<div className="card grad-border p-10">
					<div className="grid md:grid-cols-2 gap-10 items-start">
						<div>
							<p className="inline-block text-sm bg-white border rounded-pill px-3 py-1">
								We’ll get back within 1 business day
							</p>
							<h3 className="mt-3 text-3xl font-semibold">Ready to visit?</h3>
							<p className="text-gray-700 mt-2">
								Call, email, or send a message — we’ll confirm your booking
								shortly.
							</p>
							<div className="mt-6 space-y-2 text-sm">
								<p>
									<strong>Address:</strong> 569 Campbell Road, Pomona, Harare,
									Zimbabwe
								</p>
								<p>
									<strong>Phone:</strong> +263 (0) 77 000 0000
								</p>
								<p>
									<strong>Email:</strong> hello@accesshealth.co.zw
								</p>
								<p>
									<strong>Hours:</strong> Mon–Fri 08:00–18:00, Sat 09:00–13:00
								</p>
							</div>
							<div className="mt-6">
								<Button className="btn-pill bg-[color:var(--brand-blue)]">
									Call now
								</Button>
							</div>
						</div>
						<ContactForm />
					</div>
				</div>
			</div>
		</section>
	);
}
