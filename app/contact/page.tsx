import { ContactCTA } from "@/components/hero/contact-cta";

export default function ContactPage() {
	return (
		<>
			<ContactCTA />
			<section className="section">
				<div className="container">
					<div className="card grad-border p-3">
						<div className="grid md:grid-cols-2 gap-6">
							<iframe
								src="https://maps.google.com/maps?q=569%20Campbell%20Road%20Pomona%20Harare%20Zimbabwe&t=&z=15&ie=UTF8&iwloc=&output=embed"
								className="w-full h-[450px] border-0"
								loading="lazy"
								allowFullScreen
								referrerPolicy="no-referrer-when-downgrade"
							/>
							<div className="space-y-2 text-sm">
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
						</div>
					</div>
				</div>
			</section>
		</>
	);
}
