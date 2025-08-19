import { Button } from "@/components/ui/button";
import Link from "next/link";

export function Hero() {
	return (
		<section className="section">
			<div className="container grid md:grid-cols-2 gap-10 items-center">
				<div>
					<h1 className="text-4xl md:text-5xl font-semibold leading-tight">
						Care that feels like{" "}
						<span className="text-[color:var(--brand-blue)]">home</span>,
						delivered with{" "}
						<span className="text-[color:var(--brand-red)]">
							professionalism
						</span>
						.
					</h1>
					<p className="mt-4 text-gray-700">
						Access Health provides family-centered, friendly, and expert care
						for all ages.
					</p>
					<div className="mt-6 flex gap-3">
						<Button
							asChild
							className="bg-[color:var(--brand-blue)] hover:bg-blue-700"
						>
							<Link href="#contact">Book an Appointment</Link>
						</Button>
						<Button asChild variant="outline">
							<Link href="/services">Explore Services</Link>
						</Button>
					</div>
					<ul className="mt-6 text-sm text-gray-600 list-disc list-inside">
						<li>Families & elderly patients are our focus</li>
						<li>Simple booking, compassionate care</li>
						<li>On-site ultrasound & minor procedures</li>
					</ul>
				</div>
				<div className="rounded-2xl bg-white p-4 shadow-soft border">
					{/* hero illustration placeholder */}
					<div className="aspect-[4/3] rounded-xl bg-[color:var(--brand-stone)]" />
				</div>
			</div>
		</section>
	);
}
