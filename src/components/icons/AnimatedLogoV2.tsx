// src/components/icons/AnimatedLogoV2.tsx
import { useRef } from 'react';
import { useGSAP } from '@gsap/react';
import gsap from 'gsap';

const AnimatedLogoV2 = ({ className }: { className?: string }) => {
    const container = useRef<SVGSVGElement>(null);

    useGSAP(() => {
        // --- 1. SETUP ---
        const rootPaths = gsap.utils.toArray<SVGPathElement>('.root-path-v2');
        const windowPath = container.current?.querySelector('.cabin-window-v2');
        const stars = gsap.utils.toArray<SVGPathElement>('.star-v2');
        
        if (rootPaths.length === 0 || !windowPath || stars.length === 0) return;

        // Set initial states
        gsap.set(rootPaths, {
            strokeDasharray: (_i, el) => el.getTotalLength(),
            strokeDashoffset: (_i, el) => el.getTotalLength(),
        });
        gsap.set(windowPath, { fill: 'transparent' });
        
        // --- 2. THE MASTER TIMELINE ---
        const masterTl = gsap.timeline({
            // -1 makes it repeat forever
            repeat: -1, 
            // Add a 2-second pause before each loop
            repeatDelay: 2, 
            // yoyo makes the animation reverse back to the start smoothly
            yoyo: true, 
        });

        masterTl
            // Draw roots in
            .to(rootPaths, {
                strokeDashoffset: 0,
                duration: 2,
                ease: 'power1.inOut',
                stagger: 0.3,
            })
            // Light up window and make it pulse
            .to(windowPath, {
                fill: '#fde047', // Warm yellow light
                scale: 1.1,
                transformOrigin: 'center center',
                yoyo: true,
                repeat: 3, // Pulse 3 times
                duration: 0.4,
                ease: 'power1.inOut',
            }, "-=0.5");

        // --- 3. INDEPENDENT LOOPING ANIMATIONS (MAGIC TOUCHES) ---

        // Twinkling stars animation
        gsap.to(stars, {
            opacity: () => gsap.utils.random(0.2, 1), // Random opacity
            duration: () => gsap.utils.random(0.5, 1.5),
            stagger: 0.2,
            repeat: -1,
            yoyo: true,
            ease: 'power1.inOut',
        });

        // Flowing creek animation
        gsap.to('.creek-flow-v2', {
            strokeDashoffset: -20, // Move the dashes along the path
            duration: 2,
            repeat: -1,
            ease: 'none', // A constant linear speed
        });

    }, { scope: container });

    return (
        <svg
            ref={container}
            className={className}
            viewBox="0 0 100 85"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            strokeLinecap="round"
            strokeLinejoin="round"
        >
            {/* The cabin structure */}
            <g stroke="currentColor" strokeWidth="2">
                <path d="M25 65 V 45 L 48 30 L 71 45 V 65" />
                <path d="M25 45 L 71 45" />
                <path d="M34 50 L 34 65" />
                <path d="M62 50 L 62 65" />
                {/* Window path has a unique class */}
                <path className="cabin-window-v2" d="M42 65 V 50 H 54 V 65 Z" />
            </g>

            {/* The roots */}
            <g stroke="#a86d5d" strokeWidth="2.5">
                <path className="root-path-v2" d="M2 70 C 10 75, 15 75, 25 65" />
                <path className="root-path-v2" d="M5 80 C 15 70, 20 60, 25 65" />
                <path className="root-path-v2" d="M8 65 C 15 68, 20 72, 25 65" />
            </g>
            
            {/* The night sky */}
            <g fill="#7a9aab" stroke="none">
                <path className="star-v2" d="M60 8 L 60.5 9 L 61 8 L 60.5 7 Z" />
                <path className="star-v2" d="M82 25 L 82.5 26 L 83 25 L 82.5 24 Z" />
                <path className="star-v2" d="M85 45 L 85.5 46 L 86 45 L 85.5 44 Z" />
            </g>

            {/* The creek */}
            <g stroke="#7a9aab" strokeWidth="2">
                <path d="M22 75 C 32 80, 42 80, 52 75 S 67 65, 77 70" />
                {/* This is a "hidden" overlay path that creates the flow effect */}
                <path 
                    className="creek-flow-v2"
                    d="M22 75 C 32 80, 42 80, 52 75 S 67 65, 77 70" 
                    stroke="white" 
                    strokeWidth="1"
                    strokeDasharray="1 10" // Small dash, long gap
                />
            </g>
        </svg>
    );
};

export default AnimatedLogoV2;