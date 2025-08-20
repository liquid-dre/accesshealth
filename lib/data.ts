import type { LucideIcon } from "lucide-react";

export const SERVICES = [
	{
		slug: "gp-consultation",
		title: "GP Consultation",
		blurb: "General practitioner consults for all ages.",
		// image: "/services/gp-consultation.jpg",
		image: "/gp-consultation-service.jpg",
	},
	{
		slug: "paediatric-clinic",
		title: "Paediatric Clinic",
		blurb: "Child-focused care with a gentle touch.",
		image: "/pediatrician-service.jpg",
	},
	{
		slug: "prescriptions",
		title: "Prescriptions",
		blurb: "Fast, accurate prescriptions and refills.",
		image: "/prescriptions-service.jpg",
	},
	{
		slug: "specialist-physician",
		title: "Specialist Physician Clinic",
		blurb: "Access to specialist consultations.",
		image: "/specialist-service.webp",
	},
	{
		slug: "minor-surgical",
		title: "Minor Surgical Procedures",
		blurb: "Safe minor procedures with proper follow-up.",
		image: "/minor-surgery-service.avif",
	},
	{
		slug: "family-health",
		title: "Family Health Practice",
		blurb: "Comprehensive, family-oriented care.",
		image: "/family-health-service.jpg",
	},
	{
		slug: "ultrasound-scans",
		title: "Ultrasound Scans",
		blurb: "On-site diagnostic ultrasound imaging.",
		image: "/ultrasound-service.jpg",
	},
	{
		slug: "medical-examinations",
		title: "Medical Examinations",
		blurb: "Checkups, employment & insurance medicals.",
		image: "/medical-exams.jpg",
	},
	{
		slug: "chronic-disease",
		title: "Chronic Disease Management",
		blurb: "Ongoing support for long-term conditions.",
		image: "/chronic-disease-service.webp",
	},
];

export const TESTIMONIALS = [
	{
		name: "Esther M.",
		text: "Warm staff and excellent doctors. It feels like family.",
	},
	{
		name: "Peter N.",
		text: "Booking was easy, care was professional and compassionate.",
	},
	{
		name: "Rudo K.",
		text: "They took time to explain everything to me and my mum.",
	},
];

export interface TeamMember {
	name: string;
	bio: string;
	serviceSlug: string;
	photoUrl?: string;
	links?: { href: string; label: string; icon: LucideIcon }[];
}

export const TEAM: TeamMember[] = [
	{
		serviceSlug: "gp-consultation",
		name: "Dr. Alice N.",
		bio: "Gentle, thorough, and family-focused.",
		photoUrl: "/gp-consultation-service.jpg",
	},
	{
		serviceSlug: "paediatric-clinic",
		name: "Dr. Brian K.",
		bio: "Compassionate care for children and parents.",
		photoUrl: "/pediatrician1.jpg",
	},
	{
		serviceSlug: "specialist-physician",
		name: "Dr. Chipo T.",
		bio: "Evidence-based specialist care.",
		photoUrl: "/specialist-service.webp",
	},
	{
		serviceSlug: "minor-surgical",
		name: "Dr. David M.",
		bio: "Precise surgical care with quick recovery.",
		photoUrl: "/minor-surgery-service.avif",
	},
	{
		serviceSlug: "family-health",
		name: "Nurse Evelyn P.",
		bio: "Supporting families through every stage of life.",
	},
	{
		serviceSlug: "prescriptions",
		name: "Pharmacist Farai G.",
		bio: "Ensures safe and accurate prescriptions.",
	},
	{
		name: "Nurse Emily R.",
		bio: "Supportive care across family health services.",
		serviceSlug: "family-health",
	},
];
