// src/components/icons/AnimatedLogoV8.tsx
import { useRef } from 'react';
import { useGSAP } from '@gsap/react';
import gsap from 'gsap';

const AnimatedLogoV8 = ({ 
    className, 
    variant = 'color' 
}: { 
    className?: string;
    variant?: 'color' | 'mono';
}) => {
    const container = useRef<SVGSVGElement>(null);

    // Using the lime green and jelly green palette as requested
    const colors = {
        drop: variant === 'color' ? '#a3e635' : 'white',
        river: variant === 'color' ? '#4ade80' : 'currentColor', // Lighter Jelly Green
        roots: variant === 'color' ? '#166534' : 'currentColor', // Deep Forest Green
        tree: variant === 'color' ? '#15803d' : 'currentColor',   // Rich Jelly Green
        chalet: variant === 'color' ? '#6b7280' : 'currentColor',
        light: '#fde047',
        stars: 'white',
    };

    useGSAP(() => {
        if (!container.current) return;

        // Select all elements for the animation
        const elementsToDraw = gsap.utils.toArray<SVGPathElement>('.draw-v8');
        const drop = container.current.querySelector('.drop-v8');
        const ripples = gsap.utils.toArray<SVGCircleElement>('.ripple-v8');
        const window = container.current.querySelector('.window-v8');
        const stars = gsap.utils.toArray<SVGPathElement>('.star-v8');
        const riverFlow = container.current.querySelector('.river-flow-v8');

        // Master timeline
        const masterTl = gsap.timeline({
            repeat: -1,
            repeatDelay: 3,
            yoyo: true,
            defaults: { ease: 'power2.inOut' }
        });

        // Set initial states
        gsap.set(elementsToDraw, {
            strokeDasharray: (_i, el) => el.getTotalLength(),
            strokeDashoffset: (_i, el) => el.getTotalLength(),
        });
        gsap.set(ripples, { attr: { r: 0 }, opacity: 1 });
        gsap.set(window, { opacity: 0 });
        gsap.set(stars, { opacity: 0, scale: 0, transformOrigin: 'center' });
        
        // The Animation Sequence
        masterTl
            .fromTo(drop, { y: -20, opacity: 1 }, { y: 78, duration: 1, ease: 'power1.in' })
            .to(drop, { opacity: 0, duration: 0.1 }, "-=0.1")
            .to(ripples, { attr: { r: 50 }, opacity: 0, duration: 1.5, stagger: 0.2, ease: 'power1.out' }, "-=0.9")
            .to('.river-v8', { strokeDashoffset: 0, duration: 1.5 }, "<")
            .to('.roots-v8', { strokeDashoffset: 0, duration: 1.5, stagger: 0.1 }, "-=1.2")
            .to('.tree-v8', { strokeDashoffset: 0, duration: 2, stagger: 0.2 }, "-=1")
            .to('.chalet-v8', { strokeDashoffset: 0, duration: 1.5 }, "-=1.5")
            .to(stars, { opacity: 1, scale: 1, duration: 1, stagger: 0.05, ease: 'back.out(3)' }, "-=1")
            .to(window, { opacity: 1, duration: 0.5 }, ">-0.5");

        // Independent "living" animations
        gsap.to(stars, {
            scale: () => gsap.utils.random(0.7, 1.3),
            opacity: () => gsap.utils.random(0.4, 1),
            duration: 2,
            repeat: -1,
            yoyo: true,
            ease: 'sine.inOut',
            stagger: { each: 0.25, from: 'random' }
        });
        gsap.to(window, { opacity: 0.75, scale: 1.1, transformOrigin: 'center', duration: 2.5, repeat: -1, yoyo: true, ease: 'sine.inOut' });
        gsap.to(riverFlow, { strokeDashoffset: -25, duration: 2, repeat: -1, ease: 'none' });

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
            {/* -- Sky -- */}
            <g fill={colors.stars}>
                <path className="star-v8" transform="translate(15 5) scale(0.4)" d="M10 0 L13 7 L20 7 L15 12 L17 20 L10 15 L3 20 L5 12 L0 7 L7 7 Z" />
                <path className="star-v8" transform="translate(95 15) scale(0.5)" d="M10 0 L13 7 L20 7 L15 12 L17 20 L10 15 L3 20 L5 12 L0 7 L7 7 Z" />
                <path className="star-v8" transform="translate(55 5) scale(0.3)" d="M10 0 L13 7 L20 7 L15 12 L17 20 L10 15 L3 20 L5 12 L0 7 L7 7 Z" />
                <path className="star-v8" transform="translate(105 40) scale(0.4)" d="M10 0 L13 7 L20 7 L15 12 L17 20 L10 15 L3 20 L5 12 L0 7 L7 7 Z" />
            </g>

            {/* -- Forest -- */}
            <g stroke={colors.tree} strokeWidth="2">
                <path className="draw-v8 tree-v8" transform="translate(-15 0)" d="M25 88 V 70 L 35 55 L 45 70 V 88" />
                <path className="draw-v8 tree-v8" transform="translate(55 0) scale(1.2)" d="M25 88 V 70 L 35 55 L 45 70 V 88" />
                <path className="draw-v8 tree-v8" transform="translate(25 0) scale(0.8)" d="M25 88 V 70 L 35 55 L 45 70 V 88" />
                 <path className="draw-v8 tree-v8" transform="translate(85 0) scale(0.9)" d="M25 88 V 70 L 35 55 L 45 70 V 88" />
            </g>
            
            {/* -- Chalet -- */}
            <g>
                <path className="draw-v8 chalet-v8" stroke={colors.chalet} strokeWidth="2" d="M35 88 L 60 45 L 85 88 Z M45 88 L 75 88" />
                <rect className="window-v8" x="55" y="73" width="10" height="10" rx="1" fill={colors.light} />
            </g>

            {/* -- Ground Level -- */}
            <g strokeWidth="1.5">
                <path className="draw-v8 river-v8" stroke={colors.river} d="M0 88 C 20 80, 40 80, 60 88 S 80 96, 120 88" />
                <path className="river-flow-v8" d="M0 88 C 20 80, 40 80, 60 88 S 80 96, 120 88" stroke="white" strokeWidth="1" strokeDasharray="1 15" />
                <path className="draw-v8 roots-v8" stroke={colors.roots} d="M10 88 C 15 85, 20 85, 25 88" />
                <path className="draw-v8 roots-v8" stroke={colors.roots} d="M30 88 C 35 92, 40 92, 45 88" />
                <path className="draw-v8 roots-v8" stroke={colors.roots} d="M90 88 C 85 84, 80 84, 75 88" />
            </g>
            
            {/* -- Life Drop & Ripples -- */}
            <g>
                <circle className="drop-v8" cx="60" cy="0" r="2.5" fill={colors.drop} />
                <circle className="ripple-v8" cx="60" cy="81" stroke={colors.drop} strokeWidth="1" />
                <circle className="ripple-v8" cx="60" cy="81" stroke={colors.drop} strokeWidth="1" />
            </g>
        </svg>
    );
};

export default AnimatedLogoV8;