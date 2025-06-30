// src/components/icons/AnimatedLogoV4.tsx
import { useRef } from 'react';
import { useGSAP } from '@gsap/react';
import gsap from 'gsap';

// The component now accepts a 'variant' prop to switch between color and monochrome
const AnimatedLogoV4 = ({ 
    className, 
    variant = 'color' 
}: { 
    className?: string;
    variant?: 'color' | 'mono';
}) => {
    const container = useRef<SVGSVGElement>(null);

    // Define colors based on the selected variant
    const colors = {
        sky: variant === 'color' ? '#7a9aab' : 'currentColor',
        chalet: variant === 'color' ? '#a86d5d' : 'currentColor',
        tree: variant === 'color' ? '#3a5a40' : 'currentColor',
        light: '#fde047'
    };

    useGSAP(() => {
        const auroraPaths = gsap.utils.toArray<SVGPathElement>('.aurora-path');
        const chaletPath = container.current?.querySelector('.chalet-path');
        const windowPath = container.current?.querySelector('.chalet-window');
        
        if (!chaletPath || !windowPath || auroraPaths.length === 0) return;

        // Set initial states
        gsap.set([auroraPaths, chaletPath], {
            strokeDasharray: (_i, el) => el.getTotalLength(),
            strokeDashoffset: (_i, el) => el.getTotalLength(),
        });
        gsap.set(windowPath, { fill: 'transparent', opacity: 0 });
        
        // Master timeline for the main sequence
        const masterTl = gsap.timeline({
            repeat: -1, 
            repeatDelay: 1.5, 
            yoyo: true, 
        });

        // 1. Draw the aurora down from the sky
        masterTl.to(auroraPaths, {
            strokeDashoffset: 0,
            duration: 2,
            ease: 'power2.inOut',
            stagger: 0.2,
        });

        // 2. Draw the chalet as the aurora "lands"
        masterTl.to(chaletPath, {
            strokeDashoffset: 0,
            duration: 1.5,
            ease: 'power2.inOut',
        }, "-=1.5"); // Overlap with the aurora animation

        // 3. Light up the window with a warm pulse
        masterTl.to(windowPath, {
            opacity: 1,
            fill: colors.light,
            boxShadow: `0 0 15px 5px ${colors.light}`,
            scale: 1.1,
            transformOrigin: 'center center',
            yoyo: true,
            repeat: 1,
            duration: 0.6,
            ease: 'power1.inOut',
        }, "-=0.5");

        // Independent, continuous animation for the aurora's shimmer
        gsap.to(auroraPaths, {
            opacity: () => gsap.utils.random(0.4, 1),
            duration: () => gsap.utils.random(1, 2),
            repeat: -1,
            yoyo: true,
            ease: 'power1.inOut'
        });

    }, { scope: container, dependencies: [variant] }); // Re-run if the variant changes

    return (
        <svg
            ref={container}
            className={className}
            viewBox="0 0 100 100"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            strokeLinecap="round"
            strokeLinejoin="round"
        >
            {/* The Aurora Borealis (Northern Lights) */}
            <g strokeWidth="2.5" stroke={colors.sky}>
                <path className="aurora-path" d="M10 5 C 20 25, 40 25, 50 5" />
                <path className="aurora-path" d="M50 5 C 60 25, 80 25, 90 5" />
                <path className="aurora-path" d="M30 5 C 40 35, 60 35, 70 5" />
            </g>

            {/* The Chalet - drawn as a single, continuous path for a smoother effect */}
            <g strokeWidth="2" stroke={colors.chalet}>
                <path className="chalet-path" d="M15 85 V 55 L 50 25 L 85 55 V 85 H 15 Z M 42 85 V 70 H 58 V 85 M 10 65 H 90 M 70 42 V 32 H 78 V 47" />
                 {/* The window is a separate element to control its fill */}
                <path className="chalet-window" d="M42 85 V 70 H 58 V 85 Z" />
            </g>
        </svg>
    );
};

export default AnimatedLogoV4;