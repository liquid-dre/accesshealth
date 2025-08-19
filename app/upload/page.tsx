// "use client";

// import { useMutation } from "convex/react";
// import { useState } from "react";
// import { api } from "@/convex/_generated/api";

// export default function UploadService() {
// 	const addService = useMutation(api.services.addService);
// 	const [file, setFile] = useState<File | null>(null);

// 	const handleUpload = async () => {
// 		if (!file) return;

// 		// Step 1: get an upload URL
// 		const postUrl = await fetch("/api/convex/storageUrl").then((r) => r.text());

// 		// Step 2: upload the file to Convex storage
// 		const res = await fetch(postUrl, {
// 			method: "POST",
// 			body: file,
// 		});
// 		const { storageId } = await res.json();

// 		// Step 3: store service with file reference
// 		await addService({
// 			title: "GP Visit",
// 			blurb: "Routine checkups with trusted doctors.",
// 			slug: "gp-visit",
// 			file: storageId,
// 		});
// 	};

// 	return (
// 		<div>
// 			<input
// 				type="file"
// 				onChange={(e) => setFile(e.target.files?.[0] || null)}
// 			/>
// 			<button onClick={handleUpload}>Upload</button>
// 		</div>
// 	);
// }
