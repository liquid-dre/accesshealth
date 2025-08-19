"use client";

import { api } from "@/convex/_generated/api";
import { useMutation, useQuery } from "convex/react";
import React from "react";

const page = () => {
	const uploadServiceInfo = useMutation(api.services.addService);
	const serviceInfo = useQuery(api.services.getServices);

	return (
		<>
			<div>page</div>
			<form
				onSubmit={(e) => {
					e.preventDefault();
					// Call mutation to upload the images
				}}
			></form>
		</>
	);
};

export default page;
