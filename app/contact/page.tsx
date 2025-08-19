import { ContactCTA } from "@/components/hero/contact-cta";

export default function ContactPage() {
	return (
		<>
			<ContactCTA />
			<section className="section">
				<div className="container">
					<div className="card grad-border p-3">
						<iframe
							src="https://maps.google.com/maps?q=Harare%20Zimbabwe&t=&z=15&ie=UTF8&iwloc=&output=embed"
							className="w-full h-[450px] border-0"
							loading="lazy"
							allowFullScreen
							referrerPolicy="no-referrer-when-downgrade"
						/>
					</div>
				</div>
			</section>
		</>
	);
}
