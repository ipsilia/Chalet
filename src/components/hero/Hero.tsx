// src/components/hero/Hero.tsx

import { useGSAP } from "@gsap/react";
import gsap from "gsap";

import heroImage from "../../assets/images/hero.png";
import ChevronLeftIcon from "../icons/ChevronLeftIcon";
import ChevronRightIcon from "../icons/ChevronRightIcon";
import CalendarIcon from "../icons/CalendarIcon";

// ... (InfoField component remains the same)
const InfoField = ({ label, value }: { label: string; value: string }) => (
    <div className="flex-1">
        <p className="text-sm font-light text-white/70">{label}</p>
        <p className="text-lg sm:text-xl font-medium text-white">{value}</p>
    </div>
);


// 1. Accept the isLoaded prop
const Hero = ({ isLoaded }: { isLoaded: boolean }) => {

    // 2. Use the isLoaded prop in the useGSAP hook's dependency array
    useGSAP(() => {
        // 3. Only run the animation if isLoaded is true
        if (isLoaded) {
            const tl = gsap.timeline({ 
                defaults: { 
                    ease: "power3.out", 
                    duration: 1 
                } 
            });

            tl.from(".hero-title", { opacity: 0, y: 50 })
              .from(".hero-subtitle", { opacity: 0, y: 40 }, "-=0.8")
              .from(".booking-card", { opacity: 0, y: 50 }, "-=0.8")
              .from(".card-element", { opacity: 0, y: 30, stagger: 0.1 }, "-=0.7");
        }
    }, [isLoaded]); // <-- The dependency array is key

    return (
        <section className="relative w-full min-h-screen font-sans">
           {/* ... rest of your Hero JSX remains exactly the same ... */}
           {/* Background Image */}
            <div
                className="absolute inset-0 bg-cover bg-[16%_50%] md:bg-left lg:bg-center z-0"
                style={{ backgroundImage: `url(${heroImage})` }}
            >
                {/* Gradient Overlay */}
                <div className="absolute inset-0 bg-gradient-to-bl from-black/20 to-transparent"></div>
            </div>

            {/* Hero Content Wrapper */}
            <div className="relative z-10 h-full container mx-auto flex justify-center items-start lg:justify-end lg:items-center px-8 lg:px-4 pt-21 lg:pt-70">
                
                <div className="hero-content-block w-full max-w-6xl lg:grid lg:grid-cols-[1fr,auto] lg:gap-x-8 lg:justify-end">
                    
                    {/* Text content container */}
                    <div className="text-center lg:text-left mb-8 lg:mb-0">
                        {/* Added hero-title class */}
                        <h1 className="hero-title font-display text-5xl md:text-6xl lg:text-6xl font-normal text-white leading-tight">
                            Unique, Enchanting, Unforgettable.
                        </h1>
                        {/* Added hero-subtitle class */}
                        <p className="hero-subtitle font-subtitle mt-4 text-lg md:text-xl text-white/80 max-w-md mx-auto lg:mx-0">
                            swiss cabins in breathtaking locations.
                        </p>
                    </div>

                    {/* Booking Card container */}
                    <div className="booking-card w-full max-w-md mx-auto lg:mx-0 lg:justify-self-end">
                        <div className="p-6 sm:p-8 rounded-3xl bg-gradient-to-br from-white/30 to-white/10 backdrop-blur-xs lg:backdrop-blur-lg border border-white/20 shadow-2xl">
                            <div className="flex flex-col gap-4 sm:gap-6">
                                {/* Card Header - Added card-element class */}
                                <div className="card-element flex items-center justify-between gap-4">
                                    <button className="p-2 rounded-full bg-white/20 hover:bg-white/30 transition-colors">
                                        <ChevronLeftIcon className="w-5 h-5 sm:w-6 sm:h-6 text-white" />
                                    </button>
                                    <h3 className="text-xl sm:text-2xl font-semibold text-white text-center">
                                        Nesum Chalet
                                    </h3>
                                    <button className="p-2 rounded-full bg-white/20 hover:bg-white/30 transition-colors">
                                        <ChevronRightIcon className="w-5 h-5 sm:w-6 sm:h-6 text-white" />
                                    </button>
                                </div>

                                {/* Dates Section - Added card-element class */}
                                <div className="card-element grid grid-cols-1 sm:grid-cols-2 gap-4">
                                    <div className="p-3 sm:p-4 rounded-xl bg-white/20 flex items-center gap-3">
                                        <CalendarIcon className="w-5 h-5 sm:w-6 sm:h-6 text-white/80" />
                                        <InfoField label="From" value="March 22" />
                                    </div>
                                    <div className="p-3 sm:p-4 rounded-xl bg-white/20 flex items-center gap-3">
                                        <CalendarIcon className="w-5 h-5 sm:w-6 sm:h-6 text-white/80" />
                                        <InfoField label="Till" value="March 27" />
                                    </div>
                                </div>

                                {/* Times Section - Added card-element class */}
                                <div className="card-element p-3 sm:p-4 rounded-xl bg-white/20 flex items-center gap-4">
                                    <InfoField label="Check-in" value="After 11:00 AM" />
                                    <div className="w-px h-10 bg-white/40"></div>
                                    <InfoField label="Check-out" value="Until 03:00 PM" />
                                </div>

                                {/* Details & Price Section - Added card-element class */}
                                <div className="card-element flex justify-between items-center">
                                    <p className="text-base sm:text-lg text-white/70">1-5 guests</p>
                                    <p className="text-white">
                                        <span className="text-2xl sm:text-3xl font-bold">$149</span>
                                        <span className="text-white/70">/night</span>
                                    </p>
                                </div>

                                {/* Reserve Button - Added card-element class */}
                                <button className="card-element w-full mt-2 py-3 sm:py-4 rounded-2xl bg-white text-gray-900 font-bold text-lg sm:text-xl transition-colors hover:bg-gray-200 shadow-lg">
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