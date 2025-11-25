"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { Loader2 } from "lucide-react";

export function AdminGuard({ children }: { children: React.ReactNode }) {
	const router = useRouter();
	const [isChecking, setIsChecking] = useState(true);
	const [isAuthenticated, setIsAuthenticated] = useState(false);

	useEffect(() => {
		const checkAuth = async () => {
			try {
				const response = await fetch("/api/admin/check");
				const data = await response.json();
				if (data.authenticated) {
					setIsAuthenticated(true);
				} else {
					router.push("/admin/login");
				}
			} catch {
				router.push("/admin/login");
			} finally {
				setIsChecking(false);
			}
		};

		checkAuth();
	}, [router]);

	if (isChecking) {
		return (
			<div className="flex items-center justify-center min-h-screen">
				<Loader2 className="h-8 w-8 animate-spin" />
			</div>
		);
	}

	if (!isAuthenticated) {
		return null;
	}

	return <>{children}</>;
}

