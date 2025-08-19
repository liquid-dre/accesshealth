import { ContactCTA } from "@/components/hero/contact-cta";
import { Clock, Mail, MapPin, Phone } from "lucide-react";

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
								<iframe
									src="https://maps.google.com/maps?q=74X8%2BP2X%2C%20William%20Powlett%20Dr%2C%20Harare&output=embed"
									className="w-full h-[450px] border-0"
									loading="lazy"
									allowFullScreen
									referrerPolicy="no-referrer-when-downgrade"
									aria-label="Location on Google Maps"
								></iframe>
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
												74X8+P2X, William Powlett Dr, Harare
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
												+263 (0) 77 000 0000
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
												hello@accesshealth.co.zw
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
												Mon–Fri 08:00–18:00, Sat 09:00–13:00
											</p>
										</div>
									</div>
								</div>

								{/* Social Media Icons */}
								<div className="flex justify-center md:justify-start space-x-4 mt-8 pt-4 border-t border-gray-300">
									<a
										href="#"
										aria-label="Follow us on Facebook"
										className="h-10 w-10 bg-white rounded-full flex items-center justify-center shadow-md hover:bg-gray-100 transition-colors duration-200"
									>
										<svg
											className="h-6 w-6 text-gray-600 hover:text-blue-600 transition-colors duration-200"
											fill="currentColor"
											viewBox="0 0 24 24"
											aria-hidden="true"
										>
											<path
												fillRule="evenodd"
												d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.873V14.89h-2.54V12h2.54V9.799c0-2.502 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.983C18.343 21.128 22 16.991 22 12z"
												clipRule="evenodd"
											/>
										</svg>
									</a>
									<a
										href="#"
										aria-label="Follow us on Instagram"
										className="h-10 w-10 bg-white rounded-full flex items-center justify-center shadow-md hover:bg-gray-100 transition-colors duration-200"
									>
										<svg
											className="h-6 w-6 text-gray-600 hover:text-pink-500 transition-colors duration-200"
											fill="currentColor"
											viewBox="0 0 24 24"
											aria-hidden="true"
										>
											<path
												fillRule="evenodd"
												d="M12.315 2c2.43 0 2.784.01 3.71.056 2.71.144 3.998 1.411 4.14 4.14.045.926.056 1.28.056 3.71s-.01 2.784-.056 3.71c-.142 2.729-1.42 4.007-4.14 4.149-.926.045-1.28.056-3.71.056s-2.784-.01-3.71-.056c-2.729-.142-4.007-1.42-4.149-4.14-.045-.926-.056-1.28-.056-3.71s.01-2.784.056-3.71c.142-2.729 1.42-4.007 4.14-4.149.926-.045 1.28-.056 3.71-.056zm0 2.163c-2.32 0-2.583.008-3.49.052-2.115.111-2.903 1.057-3.013 3.013-.044.907-.052 1.17-.052 3.49s.008 2.583.052 3.49c.11 2.115 1.056 2.903 3.013 3.013.907.044 1.17.052 3.49.052s2.583-.008 3.49-.052c2.115-.11 2.903-1.056 3.013-3.013.044-.907.052-1.17.052-3.49s-.008-2.583-.052-3.49c-.11-2.115-1.056-2.903-3.013-3.013-.907-.044-1.17-.052-3.49-.052zM7.17 9.5c0-1.28.8-2.163 2.163-2.163s2.163.883 2.163 2.163c0 1.28-.883 2.163-2.163 2.163S7.17 10.78 7.17 9.5z"
												clipRule="evenodd"
											/>
										</svg>
									</a>
									<a
										href="#"
										aria-label="Follow us on X (formerly Twitter)"
										className="h-10 w-10 bg-white rounded-full flex items-center justify-center shadow-md hover:bg-gray-100 transition-colors duration-200"
									>
										<svg
											className="h-6 w-6 text-gray-600 hover:text-black transition-colors duration-200"
											fill="currentColor"
											viewBox="0 0 24 24"
											aria-hidden="true"
										>
											<path d="M18.82 4.41c.64-.19 1.28.19 1.47.83l.87 2.94c.19.64-.19 1.28-.83 1.47l-2.94.87c-.64.19-1.28-.19-1.47-.83l-.87-2.94c-.19-.64.19-1.28.83-1.47zM12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm4.33 13.56c-.52.26-1.17.15-1.63-.26-.46-.41-.57-1.06-.31-1.58.26-.52.91-.63 1.37-.22.46.41.57 1.06.31 1.58zm1.96-3.88c-.69-.4-1.55-.22-2.02.47-.47.69-.29 1.55.4 2.02.69.4 1.55.22 2.02-.47.47-.69.29-1.55-.4-2.02z" />
										</svg>
									</a>
								</div>
							</div>
						</div>
					</div>
				</div>
			</section>
		</>
	);
}
