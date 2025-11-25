"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Plus, X } from "lucide-react";

type TimeRange = { start: string; end: string };

type WorkingHours = {
	monday: TimeRange[];
	tuesday: TimeRange[];
	wednesday: TimeRange[];
	thursday: TimeRange[];
	friday: TimeRange[];
	saturday: TimeRange[];
	sunday: TimeRange[];
};

interface WorkingHoursFormProps {
	value: WorkingHours;
	onChange: (hours: WorkingHours) => void;
}

const DAYS = [
	{ key: "monday", label: "Monday" },
	{ key: "tuesday", label: "Tuesday" },
	{ key: "wednesday", label: "Wednesday" },
	{ key: "thursday", label: "Thursday" },
	{ key: "friday", label: "Friday" },
	{ key: "saturday", label: "Saturday" },
	{ key: "sunday", label: "Sunday" },
] as const;

export function WorkingHoursForm({ value, onChange }: WorkingHoursFormProps) {
	const addTimeRange = (day: keyof WorkingHours) => {
		const newHours = { ...value };
		newHours[day] = [...newHours[day], { start: "09:00", end: "17:00" }];
		onChange(newHours);
	};

	const removeTimeRange = (day: keyof WorkingHours, index: number) => {
		const newHours = { ...value };
		newHours[day] = newHours[day].filter((_, i) => i !== index);
		onChange(newHours);
	};

	const updateTimeRange = (
		day: keyof WorkingHours,
		index: number,
		field: "start" | "end",
		time: string
	) => {
		const newHours = { ...value };
		newHours[day][index][field] = time;
		onChange(newHours);
	};

	return (
		<div className="space-y-4">
			{DAYS.map((day) => (
				<div key={day.key} className="space-y-2">
					<Label className="font-semibold">{day.label}</Label>
					<div className="space-y-2">
						{value[day.key].map((range, index) => (
							<div key={index} className="flex items-center gap-2">
								<Input
									type="time"
									value={range.start}
									onChange={(e) =>
										updateTimeRange(day.key, index, "start", e.target.value)
									}
									className="w-32"
								/>
								<span className="text-muted-foreground">to</span>
								<Input
									type="time"
									value={range.end}
									onChange={(e) =>
										updateTimeRange(day.key, index, "end", e.target.value)
									}
									className="w-32"
								/>
								{value[day.key].length > 0 && (
									<Button
										type="button"
										variant="ghost"
										size="icon"
										onClick={() => removeTimeRange(day.key, index)}
									>
										<X className="h-4 w-4" />
									</Button>
								)}
							</div>
						))}
						<Button
							type="button"
							variant="outline"
							size="sm"
							onClick={() => addTimeRange(day.key)}
							className="w-full"
						>
							<Plus className="h-4 w-4 mr-2" />
							Add time range
						</Button>
					</div>
				</div>
			))}
		</div>
	);
}

