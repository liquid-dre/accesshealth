import { ContactCTA } from "@/components/hero/contact-cta";
import {
	Clock,
	Facebook,
	Instagram,
	LucideIcon,
	Mail,
	MapPin,
	Music2,
	Phone,
	Twitter,
} from "lucide-react";
import Map from "@/components/shared/map";

const socialLinks: {
	href: string;
	label: string;
	icon: LucideIcon;
	className: string;
}[] = [
	{
		href: "https://www.facebook.com/share/1CeJVCTvRe/?mibextid=wwXIfr",
		label: "Facebook",
		icon: Facebook,
		className: "bg-blue-100 text-blue-600 hover:bg-blue-600 hover:text-white",
	},
	{
		href: "https://www.instagram.com/accesshealthzw?igsh=OWdnNTV5ZnVydnZ3&utm_source=qr",
		label: "Instagram",
		icon: Instagram,
		className: "bg-pink-100 text-pink-600 hover:bg-pink-600 hover:text-white",
	},
	{
		href: "https://x.com/accesshealthzw?s=21",
		label: "X",
		icon: Twitter,
		className: "bg-gray-100 text-gray-800 hover:bg-black hover:text-white",
	},
	{
		href: "https://www.tiktok.com/@accesshealthclinic?_t=ZM-8zDt6WnSs8E&_r=1",
		label: "TikTok",
		icon: Music2,
		className: "bg-gray-100 text-gray-800 hover:bg-black hover:text-white",
	},
];

export default function ContactPage() {
	return (
		<>
			<ContactCTA />
			<section className="section py-10">
				<div className="container mx-auto px-4">
					<div className="card grad-border p-6 shadow-xl rounded-lg">
						<div className="grid md:grid-cols-3 gap-8 items-center">
							{/* Left Section: Map */}
							<div className="md:col-span-2 rounded-lg overflow-hidden shadow-md">
								<Map />
							</div>

							{/* Right Section: Contact Information */}
							<div className="md:col-span-1 bg-gray-50 p-6 rounded-lg space-y-6">
								<h2 className="text-2xl font-bold text-gray-700 mb-6">
									Get In Touch
								</h2>

								<div className="space-y-4 text-gray-700">
									<div className="flex items-start space-x-3">
										<MapPin className="h-5 w-5 mt-1 text-gray-600" />
										<div>
											<p className="text-sm font-semibold uppercase tracking-wide">
												Address
											</p>
											<p className="text-lg text-gray-900 font-medium mt-1">
												Shop 22 Mini Mall, Hogerty Hill Centre, William Powlett
												Dr, Harare
											</p>
										</div>
									</div>
									<div className="flex items-start space-x-3">
										<Phone className="h-5 w-5 mt-1 text-gray-600" />
										<div>
											<p className="text-sm font-semibold uppercase tracking-wide">
												Phone
											</p>
											<p className="text-lg text-gray-900 font-medium mt-1">
												+263 (0) 78 345 8985
											</p>
										</div>
									</div>
									<div className="flex items-start space-x-3">
										<Mail className="h-5 w-5 mt-1 text-gray-600" />
										<div>
											<p className="text-sm font-semibold uppercase tracking-wide">
												Email
											</p>
											<p className="text-lg text-gray-900 font-medium mt-1">
												accesshealthclinics@gmail.com
											</p>
										</div>
									</div>
									<div className="flex items-start space-x-3">
										<Clock className="h-5 w-5 mt-1 text-gray-600" />
										<div>
											<p className="text-sm font-semibold uppercase tracking-wide">
												Hours
											</p>
											<p className="text-lg text-gray-900 font-medium mt-1">
												Mon–Sun 09:00–18:00
											</p>
										</div>
									</div>
								</div>

								{/* Social Media Icons */}
								<div className="flex justify-center  space-x-4 mt-8 pt-4 border-t border-gray-300">
									{socialLinks.map(({ href, label, icon: Icon, className }) => (
										<a
											key={label}
											href={href}
											aria-label={`Follow us on ${label}`}
											target="_blank"
											rel="noopener noreferrer"
											className={`h-10 w-10 rounded-full flex items-center justify-center shadow-md transition-colors duration-200 ${className}`}
										>
											<Icon className="h-6 w-6" />
										</a>
									))}
								</div>
							</div>
						</div>
					</div>
				</div>
			</section>
		</>
	);
}
