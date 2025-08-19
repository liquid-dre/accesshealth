// app/(site)/layout.tsx
import type { Metadata } from "next";
import "./globals.css";
import { SiteHeader } from "@/components/layout/site-header";
import { SiteFooter } from "@/components/layout/site-footer";
import { Plus_Jakarta_Sans } from "next/font/google";

const plus = Plus_Jakarta_Sans({
	subsets: ["latin"],
	variable: "--font-plusjakarta",
});

export const metadata: Metadata = {
	title: "Access Health Clinic",
	description:
		"Warm, homely, and professional healthcare for families and seniors.",
};

export default function SiteLayout({
	children,
}: {
	children: React.ReactNode;
}) {
	return (
		<html lang="en">
			<body
				className={`${plus.variable} font-sans text-gray-800 antialiased bg-[var(--brand-sand)]`}
			>
				{/* soft hero-wide gradient like Unmind */}
				<div className="pointer-events-none fixed inset-0 -z-10">
					<div
						className="absolute -top-40 -left-32 h-[50vh] w-[60vw] rounded-full blur-3xl opacity-50"
						style={{
							background:
								"radial-gradient(800px 400px at 30% 20%, #dfe8ff 0%, transparent 60%)",
						}}
					/>
					<div
						className="absolute top-20 right-0 h-[45vh] w-[45vw] rounded-full blur-3xl opacity-40"
						style={{
							background:
								"radial-gradient(600px 320px at 70% 10%, #ffd4d4 0%, transparent 60%)",
						}}
					/>
				</div>

				<SiteHeader />
				<main>{children}</main>
				<SiteFooter />
			</body>
		</html>
	);
}
