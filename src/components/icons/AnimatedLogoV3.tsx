// src/components/icons/AnimatedLogoV3.tsx
import { useRef } from 'react';
import { useGSAP } from '@gsap/react';
import gsap from 'gsap';

const AnimatedLogoV3 = ({ className }: { className?: string }) => {
    const container = useRef<SVGSVGElement>(null);

    useGSAP(() => {
        const rootPaths = gsap.utils.toArray<SVGPathElement>('.root-path-v3');
        const windowPath = container.current?.querySelector('.cabin-window-v3');
        const stars = gsap.utils.toArray<SVGPathElement>('.star-v3');
        
        if (rootPaths.length === 0 || !windowPath || stars.length === 0) return;

        gsap.set(rootPaths, {
            strokeDasharray: (_i, el) => el.getTotalLength(),
            strokeDashoffset: (_i, el) => el.getTotalLength(),
        });
        gsap.set(windowPath, { fill: 'transparent' });
        
        const masterTl = gsap.timeline({
            repeat: -1, 
            repeatDelay: 2, 
            yoyo: true, 
        });

        masterTl
            .to(rootPaths, {
                strokeDashoffset: 0,
                duration: 2.5,
                ease: 'power1.inOut',
                stagger: 0.4,
            })
            .to(windowPath, {
                fill: '#fde047',
                boxShadow: '0 0 15px 5px #fde047', // Add a glow effect
                duration: 0.5,
                ease: 'power1.inOut',
            }, "-=0.5");

        gsap.to(stars, {
            opacity: () => gsap.utils.random(0.5, 1), // Make them more opaque
            scale: () => gsap.utils.random(0.8, 1.2), // Add a subtle size change
            transformOrigin: 'center center',
            duration: () => gsap.utils.random(0.8, 2),
            stagger: 0.3,
            repeat: -1,
            yoyo: true,
            ease: 'power1.inOut',
        });

    }, { scope: container });

    return (
        <svg
            ref={container}
            className={className}
            viewBox="0 0 100 100" // Adjusted viewBox for the new design
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            strokeLinecap="round"
            strokeLinejoin="round"
        >
            {/* --- 1. MORE VISIBLE STARS --- */}
            <g fill="#f1f5f9" stroke="none">
                {/* Larger 4-point star paths */}
                <path className="star-v3" d="M20 15 l2 5 l5 -2 l-2 5 l2 5 l-5 -2 l-2 5 l-2 -5 l-5 2 l2 -5 l-2 -5 l5 2 Z" transform="scale(0.3) translate(50 20)" />
                <path className="star-v3" d="M20 15 l2 5 l5 -2 l-2 5 l2 5 l-5 -2 l-2 5 l-2 -5 l-5 2 l2 -5 l-2 -5 l5 2 Z" transform="scale(0.25) translate(350 80)" />
                <path className="star-v3" d="M20 15 l2 5 l5 -2 l-2 5 l2 5 l-5 -2 l-2 5 l-2 -5 l-5 2 l2 -5 l-2 -5 l5 2 Z" transform="scale(0.2) translate(50 150)" />
            </g>

            {/* --- 2. MORE "CHALET-LIKE" CABIN --- */}
            <g stroke="currentColor" strokeWidth="2">
                {/* Main Roof and Walls */}
                <path d="M15 85 V 55 L 50 25 L 85 55 V 85" />
                {/* Chimney */}
                <path d="M70 42 L 70 32 L 78 32 L 78 47" />
                {/* Lower Roof / Overhang */}
                <path d="M10 65 L 90 65" />
                {/* Window (will be lit) */}
                <path className="cabin-window-v3" d="M42 85 V 70 H 58 V 85 Z" />
            </g>

            {/* --- 3. ROOTS FROM BOTTOM CENTER --- */}
            <g stroke="#a86d5d" strokeWidth="2.5">
                <path className="root-path-v3" d="M50 98 C 45 90, 35 90, 25 85" />
                <path className="root-path-v3" d="M50 98 C 50 90, 50 90, 50 85" />
                <path className="root-path-v3" d="M50 98 C 55 90, 65 90, 75 85" />
            </g>
        </svg>
    );
};

export default AnimatedLogoV3;