import { ConvexClientProvider } from "@/ConvexClientProvider";

export default function AdminLayout({
	children,
}: {
	children: React.ReactNode;
}) {
	return (
		<ConvexClientProvider>
			<div className="min-h-screen bg-background">{children}</div>
		</ConvexClientProvider>
	);
}

