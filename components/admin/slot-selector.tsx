"use client";

import { useQuery } from "convex/react";
import { api } from "@/convex/_generated/api";
import { Id } from "@/convex/_generated/dataModel";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { Loader2 } from "lucide-react";

interface SlotSelectorProps {
	practitionerId: Id<"practitioners"> | null;
	date: string;
	selectedSlot: string | null;
	onSelectSlot: (slot: string) => void;
}

export function SlotSelector({
	practitionerId,
	date,
	selectedSlot,
	onSelectSlot,
}: SlotSelectorProps) {
	const availableSlots = useQuery(
		api.slots.getAvailableSlots,
		practitionerId && date
			? {
					practitionerId,
					date,
			  }
			: "skip"
	);

	if (!practitionerId || !date) {
		return (
			<div className="text-sm text-muted-foreground">
				Please select a practitioner and date first
			</div>
		);
	}

	if (availableSlots === undefined) {
		return (
			<div className="flex items-center gap-2 text-sm text-muted-foreground">
				<Loader2 className="h-4 w-4 animate-spin" />
				Loading available slots...
			</div>
		);
	}

	if (availableSlots.length === 0) {
		return (
			<div className="text-sm text-muted-foreground">
				No available slots for this date
			</div>
		);
	}

	return (
		<div className="grid grid-cols-3 gap-2">
			{availableSlots.map((slot) => {
				const parts = slot.split("-");
				const start = parts[0] || slot; // Fallback if format is unexpected
				const isSelected = selectedSlot === slot;
				return (
					<Button
						key={slot}
						type="button"
						variant={isSelected ? "default" : "outline"}
						className={cn(
							"h-10",
							isSelected && "bg-[#007966] hover:bg-[#007966]/90"
						)}
						onClick={() => onSelectSlot(slot)}
					>
						{start}
					</Button>
				);
			})}
		</div>
	);
}

