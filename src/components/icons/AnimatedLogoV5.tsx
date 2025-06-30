// src/components/icons/AnimatedLogoV5.tsx
import { useRef } from 'react';
import { useGSAP } from '@gsap/react';
import gsap from 'gsap';

const AnimatedLogoV5 = ({ 
    className, 
    variant = 'color' 
}: { 
    className?: string;
    variant?: 'color' | 'mono';
}) => {
    const container = useRef<SVGSVGElement>(null);

    const colors = {
        ground: variant === 'color' ? '#6b7280' : 'currentColor',
        chalet: variant === 'color' ? '#a86d5d' : 'currentColor',
        roots: variant === 'color' ? '#3a5a40' : 'currentColor',
        light: '#fde047',
        particles: variant === 'color' ? '#fde047' : 'white'
    };

    useGSAP(() => {
        const ground = container.current?.querySelector('.ground-v5');
        const chalet = container.current?.querySelector('.chalet-v5');
        const window = container.current?.querySelector('.window-v5');
        const roots = gsap.utils.toArray<SVGPathElement>('.root-v5');
        const particles = gsap.utils.toArray<SVGCircleElement>('.particle-v5');

        if (!ground || !chalet || !window || !roots.length) return;

        // Set initial states
        gsap.set([ground, chalet, ...roots], {
            strokeDasharray: (_i, el) => el.getTotalLength(),
            strokeDashoffset: (_i, el) => el.getTotalLength(),
        });
        gsap.set(window, { opacity: 0, scale: 0.5, transformOrigin: 'center' });
        gsap.set(particles, { attr: { r: 0 } }); // Start particles with zero radius

        // Main animation timeline
        const masterTl = gsap.timeline({
            repeat: -1,
            repeatDelay: 2,
            yoyo: true,
            defaults: { ease: 'power2.inOut' }
        });

        masterTl
            // 1. Draw the ground
            .to(ground, { strokeDashoffset: 0, duration: 1 })
            // 2. Draw the roots organically
            .to(roots, { strokeDashoffset: 0, duration: 1.5, stagger: 0.2 }, "-=0.5")
            // 3. Draw the chalet structure
            .to(chalet, { strokeDashoffset: 0, duration: 1.5 }, "-=1")
            // 4. Light up the window with a pop and glow
            .to(window, { 
                opacity: 1, 
                scale: 1, 
                fill: colors.light, 
                boxShadow: `0 0 20px 8px ${colors.light}`,
                duration: 0.5 
            }, "-=0.5")
            // 5. Add a continuous pulse to the lit window
            .to(window, { 
                scale: 1.1, 
                opacity: 0.8,
                duration: 1, 
                yoyo: true, 
                repeat: -1,
                ease: 'sine.inOut'
            }, "<");

        // Animate particles along each root path
        roots.forEach((root, i) => {
            masterTl.to(particles[i], {
                duration: 1.5,
                motionPath: {
                    path: root,
                    align: root,
                    alignOrigin: [0.5, 0.5],
                    autoRotate: true,
                    start: 0,
                    end: 1
                },
                attr: { r: 1.5 }, // Particle appears
                repeat: -1,
                yoyo: true,
                repeatDelay: 2,
                ease: 'power1.inOut'
            }, 0.5 + i * 0.2); // Sync with root drawing
        });

    }, { scope: container, dependencies: [variant] });

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
            {/* The Ground Line */}
            <path className="ground-v5" d="M10 85 H 90" stroke={colors.ground} strokeWidth="2" />

            {/* The A-Frame Chalet */}
            <g>
                <path className="chalet-v5" d="M25 85 L 50 35 L 75 85 Z" stroke={colors.chalet} strokeWidth="2" />
                <rect className="window-v5" x="45" y="65" width="10" height="10" rx="1" fill="none" />
            </g>

            {/* The Roots and Particles */}
            <g>
                <path className="root-v5" d="M30 95 C 30 90, 20 90, 25 85" stroke={colors.roots} strokeWidth="2.5" />
                <path className="root-v5" d="M50 95 C 50 90, 50 90, 50 85" stroke={colors.roots} strokeWidth="2.5" />
                <path className="root-v5" d="M70 95 C 70 90, 80 90, 75 85" stroke={colors.roots} strokeWidth="2.5" />
                
                {/* Particles that will travel the roots */}
                <circle className="particle-v5" fill={colors.particles} r="0" />
                <circle className="particle-v5" fill={colors.particles} r="0" />
                <circle className="particle-v5" fill={colors.particles} r="0" />
            </g>
        </svg>
    );
};

export default AnimatedLogoV5;