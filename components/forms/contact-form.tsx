"use client";

import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { HeartPulseLoader } from "../ui/heart-pulse-loader";

export function ContactForm() {
	const [loading, setLoading] = useState(false);
	const [error, setError] = useState<string | null>(null);
	const [values, setValues] = useState({
		name: "",
		email: "",
		phone: "",
		message: "",
	});

	const submit = async (e: React.FormEvent) => {
		e.preventDefault();
		setLoading(true);
		setError(null);
		try {
			const res = await fetch("/api/contact", {
				method: "POST",
				headers: { "Content-Type": "application/json" },
				body: JSON.stringify(values),
			});
			if (!res.ok) {
				const body = await res.json().catch(() => ({}));
				setError(body.error || "Something went wrong. Please try again.");
				return;
			}
			window.location.href = "/thank-you";
		} catch {
			setError("Something went wrong. Please try again.");
		} finally {
			setLoading(false);
		}
	};

	return (
		<form
			onSubmit={submit}
			className="space-y-4 rounded-2xl border border-border bg-card p-6 shadow-soft text-foreground"
		>
			<div className="grid md:grid-cols-2 gap-4">
				<div>
					<label className="text-sm text-muted-foreground">Full name</label>
					<Input
						required
						value={values.name}
						onChange={(e) => setValues((v) => ({ ...v, name: e.target.value }))}
						placeholder="Jane Doe"
					/>
				</div>
				<div>
					<label className="text-sm text-muted-foreground">Email</label>
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
				<label className="text-sm text-muted-foreground">Phone</label>
				<Input
					value={values.phone}
					onChange={(e) => setValues((v) => ({ ...v, phone: e.target.value }))}
					placeholder="+263..."
				/>
			</div>
			<div>
				<label className="text-sm text-muted-foreground">Message</label>
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
			{error && (
				<p className="text-sm text-red-600" role="alert">
					{error}
				</p>
			)}
			<Button
				type="submit"
				disabled={loading}
				className="w-full bg-[color:var(--brand-red)] text-white hover:bg-[color:var(--brand-red)]/90"
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
