import { ContactForm } from "@/components/forms/contact-form";

export function ContactCTA() {
	return (
		<section id="contact" className="section bg-white">
			<div className="container grid md:grid-cols-2 gap-10 items-start">
				<div>
					<h3 className="text-2xl font-semibold">Ready to visit?</h3>
					<p className="text-gray-700 mt-2">
						Call, email, or send us a message. We’ll confirm your booking
						shortly.
					</p>
					<div className="mt-6 p-6 bg-[color:var(--brand-stone)] rounded-2xl">
						<p>
							<strong>Address:</strong> 123 Clinic Road, Harare
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
				</div>
				<ContactForm />
			</div>
		</section>
	);
}
