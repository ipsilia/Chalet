// src/components/icons/AnimatedLogoFinal.tsx
import { useRef } from 'react';
import { useGSAP } from '@gsap/react';
import gsap from 'gsap';
import { MorphSVGPlugin } from 'gsap/MorphSVGPlugin';

// Register the plugin at the top level of your project
gsap.registerPlugin(MorphSVGPlugin);

const AnimatedLogoFinal = ({
    className,
    variant = 'color'
}: {
    className?: string;
    variant?: 'color' | 'mono';
}) => {
    const container = useRef<SVGSVGElement>(null);
    const morphingPathRef = useRef<SVGPathElement>(null);
    const crossbarPathRef = useRef<SVGPathElement>(null);

    const colors = {
        stroke: variant === 'color'? '#166534' : 'currentColor',
    };

    useGSAP(() => {
        // Guard clause for type safety
        if (!morphingPathRef.current ||!crossbarPathRef.current) {
            return;
        }

        const morphingPath = morphingPathRef.current;
        const crossbarPath = crossbarPathRef.current;

        // --- 1. INITIAL STATE ---
        // Set the morphing path to be invisible initially by making its dash offset equal to its length.
        gsap.set(morphingPath, {
            strokeDasharray: morphingPath.getTotalLength(),
            strokeDashoffset: morphingPath.getTotalLength(),
        });
        // Do the same for the crossbar.
        gsap.set(crossbarPath, {
            strokeDasharray: crossbarPath.getTotalLength(),
            strokeDashoffset: crossbarPath.getTotalLength(),
            autoAlpha: 0, // Also hide it completely until it's needed.
        });

        // --- 2. THE MAIN ANIMATION TIMELINE ---
        const tl = gsap.timeline({
            defaults: { ease: 'power2.inOut' },
            // onComplete, start the subtle "alive" animation.
            onComplete: () => {
                gsap.to(container.current, {
                    strokeWidth: 2.2,
                    duration: 3,
                    ease: 'sine.inOut',
                    repeat: -1,
                    yoyo: true,
                });
            },
        });

        tl
            // Draw the initial "root" shape.
           .to(morphingPath, {
                strokeDashoffset: 0,
                duration: 1.5,
                ease: 'power1.out',
            })
            // Morph the root into the chalet A-frame.
           .to(morphingPath, {
                morphSVG: '#chalet-shape', // Target the hidden path's shape
                duration: 1.2,
                ease: 'power3.inOut',
            }, ">-0.5") // Overlap slightly for a smoother transition
            // Reveal and draw the crossbar to complete the logo.
           .to(crossbarPath, {
                autoAlpha: 1,
                duration: 0.1,
            }, "<+=0.5")
           .to(crossbarPath, {
                strokeDashoffset: 0,
                duration: 0.8,
                ease: 'power2.out',
            }, ">-0.1");

    }, { scope: container, dependencies: [variant] });

    return (
        <svg
            ref={container}
            className={className}
            viewBox="0 0 100 100"
            xmlns="http://www.w3.org/2000/svg"
            stroke={colors.stroke}
            strokeWidth="2"
            fill="none"
            strokeLinecap="round"
            strokeLinejoin="round"
        >
            {/* The visible path that will be animated and morphed */}
            <path
                ref={morphingPathRef}
                className="morphing-path"
                d="M50 90 V 50 L 30 30 M 50 50 L 70 30" // The "Root" shape
            />

            {/* The crossbar of the chalet, drawn in at the end */}
            <path
                ref={crossbarPathRef}
                className="crossbar-path"
                d="M35 70 H 65"
            />

            {/* --- Hidden shapes for morphing data --- */}
            <g style={{ display: 'none' }}>
                {/* The final "Chalet" A-frame shape */}
                <path
                    id="chalet-shape"
                    d="M20 90 L 50 30 L 80 90"
                />
            </g>
        </svg>
    );
};

export default AnimatedLogoFinal;