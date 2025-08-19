"use client"

import React from "react";

const page = () => {
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
