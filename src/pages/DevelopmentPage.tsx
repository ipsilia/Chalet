// src/pages/DevelopmentPage.tsx

import React from "react";

// Import the logo components you want to display
import AnimatedLogo from "../components/icons/AnimatedLogo";
import AnimatedLogoV2 from "../components/icons/AnimatedLogoV2";
import AnimatedLogoV3 from "../components/icons/AnimatedLogoV3";
import AnimatedLogoV4 from "../components/icons/AnimatedLogoV4";
import AnimatedLogoV5 from "../components/icons/AnimatedLogoV5";
import AnimatedLogoV6 from "../components/icons/AnimatedLogoV6";
import AnimatedLogoV7 from "../components/icons/AnimatedLogoV7";
import AnimatedLogoV8 from "../components/icons/AnimatedLogoV8";
import AnimatedLogoV11 from "../components/icons/AnimatedLogoV11";
import AnimatedLogoV12 from "../components/icons/AnimatedLogoV12";

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
					<LogoDisplayCard title="Animated Root Logo">
						<AnimatedLogo className="w-72 h-72 text-black" />
					</LogoDisplayCard>

					<LogoDisplayCard title="v2">
						<AnimatedLogoV2 className="w-72 h-72 text-black" />
					</LogoDisplayCard>

					<LogoDisplayCard title="v3">
						<AnimatedLogoV3 className="w-72 h-72 text-black" />
					</LogoDisplayCard>

					<LogoDisplayCard title="Animated Logo V4 - Color">
						{/* By default, it renders the colored version */}
						<AnimatedLogoV4 className="w-72 h-72" />
					</LogoDisplayCard>

					<LogoDisplayCard title="Animated Logo V4 - Monochrome">
						{/* Pass the 'mono' variant for the black and white version */}
						<AnimatedLogoV4 variant="mono" className="w-72 h-72 text-black" />
					</LogoDisplayCard>

					<LogoDisplayCard title="Animated Logo V5 - Color">
						{/* By default, it renders the colored version */}
						<AnimatedLogoV5 className="w-72 h-72" />
					</LogoDisplayCard>

					<LogoDisplayCard title="Animated Logo V5 - Monochrome">
						{/* Pass the 'mono' variant for the black and white version */}
						<AnimatedLogoV5 variant="mono" className="w-72 h-72 text-black" />
					</LogoDisplayCard>

					<LogoDisplayCard title="Animated Logo V6 - Color">
						{/* By default, it renders the colored version */}
						<AnimatedLogoV6 className="w-72 h-72" />
					</LogoDisplayCard>

					<LogoDisplayCard title="Animated Logo V6 - Monochrome">
						{/* Pass the 'mono' variant for the black and white version */}
						<AnimatedLogoV6 variant="mono" className="w-72 h-72 text-black" />
					</LogoDisplayCard>

					<LogoDisplayCard title="Animated Logo V7 - Color">
						{/* By default, it renders the colored version */}
						<AnimatedLogoV7 className="w-72 h-72" />
					</LogoDisplayCard>

					<LogoDisplayCard title="Animated Logo V7 - Monochrome">
						{/* Pass the 'mono' variant for the black and white version */}
						<AnimatedLogoV7 variant="mono" className="w-72 h-72 text-black" />
					</LogoDisplayCard>

					<LogoDisplayCard title="Animated Logo V8 - Color">
						{/* By default, it renders the colored version */}
						<AnimatedLogoV8 className="w-72 h-72" />
					</LogoDisplayCard>

					<LogoDisplayCard title="Animated Logo V8 - Monochrome">
						{/* Pass the 'mono' variant for the black and white version */}
						<AnimatedLogoV8 variant="mono" className="w-72 h-72 text-black" />
					</LogoDisplayCard>

					<LogoDisplayCard title="Animated Logo V11 - Color">
						{/* By default, it renders the colored version */}
						<AnimatedLogoV11 className="w-72 h-72" />
					</LogoDisplayCard>

					<LogoDisplayCard title="Animated Logo V11 - Monochrome">
						{/* Pass the 'mono' variant for the black and white version */}
						<AnimatedLogoV11 variant="mono" className="w-72 h-72 text-black" />
					</LogoDisplayCard>

                    					<LogoDisplayCard title="Animated Logo V12 - Color">
						{/* By default, it renders the colored version */}
						<AnimatedLogoV12 className="w-72 h-72" />
					</LogoDisplayCard>

					<LogoDisplayCard title="Animated Logo V12 - Monochrome">
						{/* Pass the 'mono' variant for the black and white version */}
						<AnimatedLogoV12 variant="mono" className="w-72 h-72 text-black" />
					</LogoDisplayCard>
				</main>
			</div>
		</div>
	);
};

export default DevelopmentPage;
