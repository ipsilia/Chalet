// src/components/icons/AnimatedLogoV7.tsx
import { useRef } from 'react';
import { useGSAP } from '@gsap/react';
import gsap from 'gsap';
import { MotionPathPlugin } from 'gsap/MotionPathPlugin';

// Register the MotionPathPlugin
gsap.registerPlugin(MotionPathPlugin);

const AnimatedLogoV7 = ({ 
    className, 
    variant = 'color' 
}: { 
    className?: string;
    variant?: 'color' | 'mono';
}) => {
    const container = useRef<SVGSVGElement>(null);

    const colors = {
        drop: variant === 'color' ? '#a3e635' : 'white',
        river: variant === 'color' ? '#14b8a6' : 'currentColor',
        roots: variant === 'color' ? '#166534' : 'currentColor',
        tree: variant === 'color' ? '#15803d' : 'currentColor',
        chalet: variant === 'color' ? '#6b7280' : 'currentColor',
        light: '#fde047',
        stars: 'white',
    };

    useGSAP(() => {
        if (!container.current) return;

        // Select all the elements for animation
        const drop = container.current.querySelector('.drop-final');
        const ripples = gsap.utils.toArray<SVGCircleElement>('.ripple-final');
        const river = container.current.querySelector('.river-final');
        const roots = gsap.utils.toArray<SVGPathElement>('.root-final');
        const tree = container.current.querySelector('.tree-final');
        const chalet = container.current.querySelector('.chalet-final');
        const window = container.current.querySelector('.window-final');
        const stars = gsap.utils.toArray<SVGPathElement>('.star-final');

        // Main timeline for the build-up and tear-down
        const masterTl = gsap.timeline({
            repeat: -1,
            repeatDelay: 2.5,
            yoyo: true,
            defaults: { ease: 'power2.inOut' }
        });

        // Initial states
        gsap.set([river, ...roots, tree, chalet], {
            strokeDasharray: (_i, el) => el.getTotalLength(),
            strokeDashoffset: (_i, el) => el.getTotalLength(),
        });
        gsap.set(ripples, { attr: { r: 0 }, opacity: 1 });
        gsap.set(window, { opacity: 0 });
        gsap.set(stars, { opacity: 0, scale: 0, transformOrigin: 'center' });

        // The Animation Sequence
        masterTl
            // 1. Drop falls
            .fromTo(drop, { y: -20, opacity: 1 }, { y: 65, duration: 1, ease: 'power1.in' })
            .to(drop, { opacity: 0, duration: 0.2 }, "-=0.2")

            // 2. Ripple effect
            .to(ripples, {
                attr: { r: 40 },
                opacity: 0,
                duration: 1.5,
                stagger: 0.3,
                ease: 'power1.out'
            }, "-=0.8")

            // 3. River and roots draw in
            .to([river, ...roots], { strokeDashoffset: 0, duration: 2, stagger: 0.1 }, "<")

            // 4. Tree grows
            .to(tree, { strokeDashoffset: 0, duration: 1.5 }, "-=1.5")
            
            // 5. Chalet is built
            .to(chalet, { strokeDashoffset: 0, duration: 1.5 }, "-=1")

            // 6. Stars appear and window lights up
            .to(stars, { opacity: 1, scale: 1, duration: 1, stagger: 0.05, ease: 'back.out(2)' }, "-=1")
            .to(window, { opacity: 1, duration: 0.5 }, ">");

        // Independent "living" animations that play continuously while the logo is built
        gsap.to(stars, {
            scale: () => gsap.utils.random(0.8, 1.2),
            opacity: () => gsap.utils.random(0.5, 1),
            duration: 1.5,
            repeat: -1,
            yoyo: true,
            ease: 'sine.inOut',
            stagger: {
                each: 0.2,
                from: 'random'
            }
        });

        gsap.to(window, {
            opacity: 0.7,
            duration: 2,
            repeat: -1,
            yoyo: true,
            ease: 'sine.inOut'
        });

    }, { scope: container, dependencies: [variant] });

    return (
        <svg
            ref={container}
            className={className}
            viewBox="0 0 120 100"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            strokeLinecap="round"
            strokeLinejoin="round"
        >
            {/* -- Elements are layered from back to front -- */}
            
            {/* Stars */}
            <g fill={colors.stars}>
                <path className="star-final" d="M80 10 l1 2.5 l2.5 -1 l-1 2.5 l1 2.5 l-2.5 -1 l-1 2.5 l-1 -2.5 l-2.5 1 l1 -2.5 l-1 -2.5 l2.5 1 Z" transform="scale(0.5) translate(150 5)" />
                <path className="star-final" d="M95 25 l1 2.5 l2.5 -1 l-1 2.5 l1 2.5 l-2.5 -1 l-1 2.5 l-1 -2.5 l-2.5 1 l1 -2.5 l-1 -2.5 l2.5 1 Z" transform="scale(0.4) translate(220 50)" />
                <path className="star-final" d="M110 50 l1 2.5 l2.5 -1 l-1 2.5 l1 2.5 l-2.5 -1 l-1 2.5 l-1 -2.5 l-2.5 1 l1 -2.5 l-1 -2.5 l2.5 1 Z" transform="scale(0.3) translate(350 150)" />
                 <path className="star-final" d="M10 20 l1 2.5 l2.5 -1 l-1 2.5 l1 2.5 l-2.5 -1 l-1 2.5 l-1 -2.5 l-2.5 1 l1 -2.5 l-1 -2.5 l2.5 1 Z" transform="scale(0.4) translate(10 30)" />
            </g>

            {/* Chalet */}
            <g strokeWidth="2">
                <path className="chalet-final" stroke={colors.chalet} d="M30 85 V 60 L 60 40 L 90 60 V 85 H 30 Z M 52 85 V 70 H 68 V 85 M 25 70 H 95" />
                <rect className="window-final" x="52" y="70" width="16" height="15" rx="1" fill={colors.light} />
            </g>
            
            {/* Tree */}
            <g strokeWidth="2" stroke={colors.tree}>
                <path className="tree-final" d="M90 85 L 90 65 L 105 65 L 85 30 L 65 65 H 80 V 85" />
            </g>

            {/* River, Roots, Drop */}
            <g strokeWidth="1.5">
                <path className="river-final" stroke={colors.river} d="M5 95 C 25 85, 45 85, 65 95 S 85 105, 115 95" />
                <path className="root-final" stroke={colors.roots} d="M20 95 C 22 90, 25 88, 30 85" />
                <path className="root-final" stroke={colors.roots} d="M65 95 C 60 90, 55 88, 50 85" />
                <circle className="drop-final" cx="60" cy="0" r="3" fill={colors.drop} />
                {/* Ripples */}
                <circle className="ripple-final" cx="60" cy="68" stroke={colors.drop} />
                <circle className="ripple-final" cx="60" cy="68" stroke={colors.drop} />
                <circle className="ripple-final" cx="60" cy="68" stroke={colors.drop} />
            </g>

        </svg>
    );
};

export default AnimatedLogoV7;