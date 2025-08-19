import { FormEvent, useRef, useState } from "react";
import { useMutation } from "convex/react";
import { api } from "@/convex/_generated/api";

export default function App() {
	const generateUploadUrl = useMutation(api.services.generateUploadUrl);
	const sendImage = useMutation(api.services.sendImage);

	const imageInput = useRef<HTMLInputElement>(null);
	const [selectedImage, setSelectedImage] = useState<File | null>(null);

	const convexSiteUrl = import.meta.env.VITE_CONVEX_SITE_URL;

	const [name] = useState(() => "User " + Math.floor(Math.random() * 10000));
	async function handleSendImage(event: FormEvent) {
		event.preventDefault();

		// e.g. https://happy-animal-123.convex.site/sendImage?author=User+123
		const sendImageUrl = new URL(`${convexSiteUrl}/sendImage`);
		sendImageUrl.searchParams.set("author", "Jack Smith");

		await fetch(sendImageUrl, {
			method: "POST",
			headers: { "Content-Type": selectedImage!.type },
			body: selectedImage,
		});

		setSelectedImage(null);
		imageInput.current!.value = "";
	}
	return (
		<form onSubmit={handleSendImage}>
			<input
				type="file"
				accept="image/*"
				ref={imageInput}
				onChange={(event) => setSelectedImage(event.target.files![0])}
				disabled={selectedImage !== null}
			/>
			<input
				type="submit"
				value="Send Image"
				disabled={selectedImage === null}
			/>
		</form>
	);
}
