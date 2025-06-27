import React from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";

import heroImage from "../../assets/images/hero.png";

// SVG Icon Components (remain the same)
const ChevronLeftIcon = ({ className }: { className?: string }) => (
	<svg
		className={className}
		xmlns="http://www.w3.org/2000/svg"
		viewBox="0 0 24 24"
		fill="none"
		stroke="currentColor"
		strokeWidth="2"
		strokeLinecap="round"
		strokeLinejoin="round"
	>
		<polyline points="15 18 9 12 15 6" />
	</svg>
);

const ChevronRightIcon = ({ className }: { className?: string }) => (
	<svg
		className={className}
		xmlns="http://www.w3.org/2000/svg"
		viewBox="0 0 24 24"
		fill="none"
		stroke="currentColor"
		strokeWidth="2"
		strokeLinecap="round"
		strokeLinejoin="round"
	>
		<polyline points="9 18 15 12 9 6" />
	</svg>
);

const CalendarIcon = ({ className }: { className?: string }) => (
	<svg
		className={className}
		xmlns="http://www.w3.org/2000/svg"
		viewBox="0 0 24 24"
		fill="none"
		stroke="currentColor"
		strokeWidth="2"
		strokeLinecap="round"
		strokeLinejoin="round"
	>
		<rect x="3" y="4" width="18" height="18" rx="2" ry="2" />
		<line x1="16" y1="2" x2="16" y2="6" />
		<line x1="8" y1="2" x2="8" y2="6" />
		<line x1="3" y1="10" x2="21" y2="10" />
	</svg>
);

// Reusable component for label/value pairs
const InfoField = ({ label, value }: { label: string; value: string }) => (
    <div className="flex-1">
        <p className="text-sm font-light text-white/70">{label}</p>
        <p className="text-xl font-medium text-white">{value}</p>
    </div>
);


const Hero = () => {
	useGSAP(() => {
		const tl = gsap.timeline({ defaults: { ease: "power3.out", duration: 1.2 } });
		// Animate the whole content block for a smoother entrance
		tl.from(".hero-content-block", { opacity: 0, y: 50 });
	}, []);

	return (
		<section className="relative w-full h-screen overflow-hidden font-sans">
			{/* Background Image */}
			<div
				className="absolute inset-0 bg-cover bg-left md:bg-center z-0"
				style={{ backgroundImage: `url(${heroImage})` }}
			>
				{/* Gradient Overlay */}
				<div className="absolute inset-0 bg-gradient-to-bl from-black/20 to-transparent"></div>
			</div>

			{/* Hero Content Wrapper */}
			<div className="relative z-10 h-full container mx-auto flex justify-center items-start lg:justify-end lg:items-center px-4">
                
                {/* --- This is the new layout container using CSS Grid --- */}
                <div className="hero-content-block w-full max-w-6xl lg:grid lg:grid-cols-[1fr,auto] lg:gap-x-8 lg:justify-end">
                    
                    {/* Text content container (Grid column 1) */}
                    <div className="text-center lg:text-left mb-8 lg:mb-0">
						<h1 className="font-display text-5xl md:text-6xl lg:text-6xl font-normal text-white leading-tight">
							Unique, Enchanting, Unforgettable.
						</h1>
						<p className="font-subtitle mt-4 text-lg md:text-xl text-white/80 max-w-md mx-auto lg:mx-0">
							modern cabins in breathtaking locations.
						</p>
					</div>

                    {/* Booking Card container (Grid column 2) */}
					<div className="booking-card w-full max-w-md mx-auto lg:mx-0 lg:justify-self-end">
						<div className="p-8 rounded-3xl bg-gradient-to-br from-white/30 to-white/10 backdrop-blur-lg border border-white/20 shadow-2xl">
							<div className="flex flex-col gap-6">
								{/* Card Header */}
								<div className="flex items-center justify-between gap-4">
									<button className="p-2 rounded-full bg-white/20 hover:bg-white/30 transition-colors">
										<ChevronLeftIcon className="w-6 h-6 text-white" />
									</button>
									<h3 className="text-2xl font-semibold text-white text-center">
										Nesum Chelet
									</h3>
									<button className="p-2 rounded-full bg-white/20 hover:bg-white/30 transition-colors">
										<ChevronRightIcon className="w-6 h-6 text-white" />
									</button>
								</div>

								{/* Dates Section */}
								<div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
									<div className="p-4 rounded-xl bg-white/20 flex items-center gap-3">
										<CalendarIcon className="w-6 h-6 text-white/80" />
										<InfoField label="From" value="March 22" />
									</div>
									<div className="p-4 rounded-xl bg-white/20 flex items-center gap-3">
										<CalendarIcon className="w-6 h-6 text-white/80" />
										<InfoField label="Till" value="March 27" />
									</div>
								</div>

								{/* Times Section */}
								<div className="p-4 rounded-xl bg-white/20 flex items-center gap-4">
									<InfoField label="Check-in" value="After 11:00 AM" />
									<div className="w-px h-10 bg-white/40"></div>
									<InfoField label="Check-out" value="Until 3:00 PM" />
								</div>

								{/* Details & Price Section */}
								<div className="flex justify-between items-center">
									<p className="text-lg text-white/70">1-5 guests</p>
									<p className="text-white">
										<span className="text-3xl font-bold">$149</span>
										<span className="text-white/70">/night</span>
									</p>
								</div>

								{/* Reserve Button */}
								<button className="w-full mt-2 py-4 rounded-2xl bg-white text-gray-900 font-bold text-xl transition-all hover:bg-gray-200 shadow-lg">
									Reserve
								</button>
							</div>
						</div>
					</div>
                </div>

			</div>
		</section>
	);
};

export default Hero;