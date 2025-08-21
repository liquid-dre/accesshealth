import { CheckCircle } from "lucide-react";

export default function ThankYou() {
	return (
		<div className="relative h-screen">
			<div className="absolute inset-0 z-20 flex flex-col items-center justify-center bg-white bg-opacity-90">
				<CheckCircle size={64} className="text-green-500 mb-4" />
				<p className="text-2xl font-bold text-green-700">
					Thanks for reaching out!
				</p>
			</div>
		</div>
	);
}
