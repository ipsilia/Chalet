// src/components/icons/AnimatedLogo.tsx
import { useRef } from 'react';
import { useGSAP } from '@gsap/react';
import gsap from 'gsap';

const AnimatedLogo = ({ className }: { className?: string }) => {
    const container = useRef<SVGSVGElement>(null);

    useGSAP(() => {
        // Find all the elements to animate
        const rootPaths = gsap.utils.toArray<SVGPathElement>('.root-path');
        const windowPath = container.current?.querySelector('.cabin-window');
        
        if (rootPaths.length === 0 || !windowPath) return;

        // Set the initial "un-drawn" state for the roots
        rootPaths.forEach(path => {
            const length = path.getTotalLength();
            gsap.set(path, {
                strokeDasharray: length,
                strokeDashoffset: length,
            });
        });

        // Set the initial "unlit" state for the window
        gsap.set(windowPath, { fill: 'transparent' });
        
        // Create the master timeline
        const tl = gsap.timeline({
            defaults: { ease: 'power2.inOut' }
        });

        // 1. Animate the roots drawing themselves in
        tl.to(rootPaths, {
            strokeDashoffset: 0,
            duration: 2.5,
            stagger: 0.5 // Each root draws 0.5s after the previous one
        });

        // 2. Animate the window lighting up
        tl.to(windowPath, {
            fill: '#fde047', // A warm, sunny yellow
            duration: 0.5,
        }, "-=0.5"); // Start this animation as the last root finishes

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
            {/* The Cabin Structure - Visible from the start */}
            <g stroke="currentColor" strokeWidth="2">
                <path d="M25 65 V 45 L 48 30 L 71 45 V 65" />
                <path d="M25 45 L 71 45" />
                <path d="M34 50 L 34 65" />
                <path d="M62 50 L 62 65" />
                 {/* The Window - this will light up */}
                <path className="cabin-window" d="M42 65 V 50 H 54 V 65 Z" />
            </g>

            {/* The Roots - These will be animated */}
            <g stroke="#a86d5d" strokeWidth="2.5">
                <path className="root-path" d="M2 70 C 10 75, 15 75, 25 65" />
                <path className="root-path" d="M5 80 C 15 70, 20 60, 25 65" />
                <path className="root-path" d="M8 65 C 15 68, 20 72, 25 65" />
            </g>
        </svg>
    );
};

export default AnimatedLogo;