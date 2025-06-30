// src/pages/DevelopmentPage.tsx

import React from "react";

// Import the logo components you want to display

// --- FIX APPLIED HERE ---
// The component now accepts the className prop and passes it to the SVG element.

// A reusable card to display each logo neatly
const LogoDisplayCard = ({
	title,
	children,
}: {
	title: string;
	children: React.ReactNode;
}) => (
	<div className="rounded-2xl border border-slate-700 bg-slate-800/50 overflow-hidden">
		<h3 className="p-4 text-lg font-semibold text-white border-b border-slate-700">
			{title}
		</h3>
		<div className="grid grid-cols-1 sm:grid-cols-2">
			<div className="p-8 flex items-center justify-center bg-white">
				{children}
			</div>
			<div className="p-8 flex items-center justify-center bg-[#05182b] text-white">
				{children}
			</div>
		</div>
	</div>
);

const DevelopmentPage = () => {
	return (
		// This container uses the same background color as your app for consistency
		<div className="relative w-full min-h-screen bg-[var(--color-background)] text-white font-sans">
			<div className="container mx-auto px-4 py-28">
				<header className="text-center mb-12">
					<h1 className="text-5xl font-bold font-display">Logo Showcase</h1>
					<p className="text-xl text-slate-400 mt-2">For Client Review</p>
				</header>

				<main className="grid grid-cols-1 gap-8">
                    <h1 className="text-5xl font-bold font-display">Back To Sketching</h1>
				</main>
			</div>
		</div>
	);
};

export default DevelopmentPage;
