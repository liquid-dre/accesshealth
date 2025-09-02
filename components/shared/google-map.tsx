"use client";

export default function GoogleMap() {
	return (
		<iframe
			src="https://maps.google.com/maps?q=74X8%2BP2X%2C%20William%20Powlett%20Dr%2C%20Harare&output=embed"
			className="w-full h-full border-0"
			loading="lazy"
			allowFullScreen
			referrerPolicy="no-referrer-when-downgrade"
			aria-label="Location on Google Maps"
		/>
	);
}
