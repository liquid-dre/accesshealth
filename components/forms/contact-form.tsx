"use client";

import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { HeartPulseLoader } from "../ui/heart-pulse-loader";

export function ContactForm() {
	const [loading, setLoading] = useState(false);
	const [values, setValues] = useState({
		name: "",
		email: "",
		phone: "",
		message: "",
	});

	const submit = async (e: React.FormEvent) => {
		e.preventDefault();
		setLoading(true);
		try {
			await fetch("/api/contact", {
				method: "POST",
				headers: { "Content-Type": "application/json" },
				body: JSON.stringify(values),
			});
			window.location.href = "/thank-you";
		} catch {
			alert("Something went wrong. Please try again.");
		} finally {
			setLoading(false);
		}
	};

	return (
		<form
			onSubmit={submit}
			className="p-6 bg-white rounded-2xl border shadow-soft space-y-4"
		>
			<div className="grid md:grid-cols-2 gap-4">
				<div>
					<label className="text-sm">Full name</label>
					<Input
						required
						value={values.name}
						onChange={(e) => setValues((v) => ({ ...v, name: e.target.value }))}
						placeholder="Jane Doe"
					/>
				</div>
				<div>
					<label className="text-sm">Email</label>
					<Input
						required
						type="email"
						value={values.email}
						onChange={(e) =>
							setValues((v) => ({ ...v, email: e.target.value }))
						}
						placeholder="jane@email.com"
					/>
				</div>
			</div>
			<div>
				<label className="text-sm">Phone</label>
				<Input
					value={values.phone}
					onChange={(e) => setValues((v) => ({ ...v, phone: e.target.value }))}
					placeholder="+263..."
				/>
			</div>
			<div>
				<label className="text-sm">Message</label>
				<Textarea
					required
					value={values.message}
					onChange={(e) =>
						setValues((v) => ({ ...v, message: e.target.value }))
					}
					placeholder="How can we help?"
					rows={4}
				/>
			</div>
			<Button
				type="submit"
				disabled={loading}
				className="w-full bg-[color:var(--brand-red)] hover:bg-red-700"
			>
				{loading ? (
					<>
						<HeartPulseLoader aria-hidden="true" />
						<span className="sr-only">Sending...</span>
					</>
				) : (
					"Send message"
				)}
			</Button>
		</form>
	);
}
