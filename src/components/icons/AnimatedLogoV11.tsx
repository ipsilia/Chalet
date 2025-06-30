// src/components/icons/AnimatedLogoV11.tsx
import { useRef } from 'react';
import { useGSAP } from '@gsap/react';
import gsap from 'gsap';

const AnimatedLogoV11 = ({ 
    className, 
    variant = 'color' 
}: { 
    className?: string;
    variant?: 'color' | 'mono';
}) => {
    const container = useRef<SVGSVGElement>(null);

    const colors = {
        drop: variant === 'color'? '#a3e635' : 'white',
        river: variant === 'color'? '#4ade80' : 'currentColor',
        roots: variant === 'color'? '#166534' : 'currentColor',
        tree: variant === 'color'? '#15803d' : 'currentColor',
        chalet: variant === 'color'? '#6b7280' : 'currentColor',
        light: '#fde047',
        sky: variant === 'color'? '#f1f5f9' : 'white',
    };

    useGSAP(() => {
        // --- 1. PRIMARY GUARD: Ensure container is mounted ---
        if (!container.current) {
            return;
        }

        // --- 2. ELEMENT SELECTION ---
        const drawablePaths = gsap.utils.toArray<SVGPathElement>('.drawable-path');
        const ripples = gsap.utils.toArray<SVGCircleElement>('.ripple-v11');
        const stars = gsap.utils.toArray<SVGElement>('.star-v11');
        
        // Select single elements that could be null, now with explicit types.
        const drop = container.current.querySelector<SVGCircleElement>('.drop-v11');
        const windowEl = container.current.querySelector<SVGRectElement>('.window-v11');
        const riverFlow = container.current.querySelector<SVGPathElement>('.river-flow-v11');

        // --- 3. TYPE-SAFETY GUARD CLAUSE ---
        // If any essential element isn't found, abort to prevent runtime errors.
        // This resolves the "Object is possibly 'null'" TypeScript error.
        if (!drop ||!windowEl ||!riverFlow) {
            console.error("AnimatedLogoV11: Missing one or more essential SVG elements. Aborting animation setup.");
            return;
        }

        // --- 4. INITIAL STATE CONFIGURATION ---
        // It is now safe to use all selected elements.
        gsap.set(drawablePaths, {
            strokeDasharray: (_i, el) => el.getTotalLength(),
            strokeDashoffset: (_i, el) => el.getTotalLength(),
            autoAlpha: 1
        });
        gsap.set(ripples, { attr: { r: 0 }, opacity: 1, transformOrigin: 'center' });
        gsap.set(windowEl, { autoAlpha: 0, transformOrigin: 'center' });
        gsap.set(stars, { autoAlpha: 0, scale: 0, transformOrigin: 'center' });
        gsap.set(drop, { y: -20, autoAlpha: 0 });
        gsap.set(riverFlow, { strokeDashoffset: 0 });

        // --- 5. AMBIENT "LIVING LOGO" ANIMATIONS ---
        // Created in a paused state, ready for orchestration.
        const ambientTweens = {
            stars: gsap.to(stars, {
                scale: () => gsap.utils.random(0.9, 1.2),
                opacity: () => gsap.utils.random(0.6, 1),
                duration: 3,
                repeat: -1,
                yoyo: true,
                ease: 'sine.inOut',
                stagger: { each: 0.3, from: 'random' },
                paused: true
            }),
            window: gsap.to(windowEl, {
                opacity: 0.8,
                scale: 1.05,
                duration: 4,
                repeat: -1,
                yoyo: true,
                ease: 'sine.inOut',
                paused: true
            }),
            river: gsap.to(riverFlow, {
                strokeDashoffset: -32,
                duration: 2.5,
                repeat: -1,
                ease: 'none',
                paused: true
            })
        };

        const controlAmbient = (action: 'play' | 'pause' | 'restart') => {
            Object.values(ambientTweens).forEach(tween => tween[action]());
        };

        // --- 6. NARRATIVE BUILD SEQUENCE TIMELINE ---
        const buildSequenceTl = gsap.timeline({
            repeat: -1,
            repeatDelay: 3,
            yoyo: true,
            defaults: { ease: 'power2.inOut' },
            onComplete: () => controlAmbient('play'),
            onReverseComplete: () => {
                controlAmbient('restart');
                controlAmbient('pause');
            }
        });

        buildSequenceTl
          .to(drop, { y: 88, autoAlpha: 1, duration: 1.2, ease: 'expo.in' })
          .to(drop, { autoAlpha: 0, duration: 0.1 }, "-=0.1")
          .to(ripples, { attr: { r: 60 }, autoAlpha: 0, duration: 2, stagger: 0.3, ease: 'expo.out' }, "<")
          .to('.river-outline-v11', { strokeDashoffset: 0, duration: 2 }, "<+=0.2")
          .to('.roots-v11', { strokeDashoffset: 0, duration: 2, stagger: 0.1 }, "<+=0.5")
          .to('.tree-trunk-v11', { strokeDashoffset: 0, duration: 1.2, stagger: 0.2 }, "<+=0.5")
          .to('.tree-branches-v11', { strokeDashoffset: 0, duration: 1.5, stagger: 0.05 }, "<+=0.6")
          .to('.chalet-outline-v11', { strokeDashoffset: 0, duration: 2, ease: 'power3.inOut' }, ">-1")
          .to(stars, { autoAlpha: 1, scale: 1, duration: 1.5, stagger: { each: 0.1, from: 'random' }, ease: 'back.out(3)' }, "<+=0.5")
          .to(windowEl, { autoAlpha: 1, duration: 1, ease: 'power4.inOut' }, "<+=0.5");

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
            {/* -- Layer 1: Sky & Stars -- */}
            <g fill={colors.sky}>
                <path className="star-v11" transform="translate(15 5) scale(0.4)" d="M10 0 L13 7 L20 7 L15 12 L17 20 L10 15 L3 20 L5 12 L0 7 L7 7 Z" />
                <path className="star-v11" transform="translate(95 15) scale(0.5)" d="M10 0 L13 7 L20 7 L15 12 L17 20 L10 15 L3 20 L5 12 L0 7 L7 7 Z" />
                <path className="star-v11" transform="translate(5 40) scale(0.35)" d="M10 0 L13 7 L20 7 L15 12 L17 20 L10 15 L3 20 L5 12 L0 7 L7 7 Z" />
                <path className="star-v11" transform="translate(105 50) scale(0.4)" d="M10 0 L13 7 L20 7 L15 12 L17 20 L10 15 L3 20 L5 12 L0 7 L7 7 Z" />
                <path className="star-v11" transform="translate(80 70) scale(0.3)" d="M10 0 L13 7 L20 7 L15 12 L17 20 L10 15 L3 20 L5 12 L0 7 L7 7 Z" />
                <path className="drawable-path star-v11" stroke={colors.sky} strokeWidth="1.5" d="M90 5 a 5 5 0 0 1 5 5 a 3 3 0 0 0 -3 -3" />
            </g>

            {/* -- Layer 2: Forest -- */}
            <g stroke={colors.tree} strokeWidth="2">
                <g className="tree-group-1" transform="translate(10, 5) scale(0.6)">
                    <path className="drawable-path tree-trunk-v11" d="M35 88 V 70" />
                    <path className="drawable-path tree-branches-v11" d="M25 75 l10 -15 l10 15 h -20" />
                    <path className="drawable-path tree-branches-v11" d="M28 68 l7 -10 l7 10 h-14" />
                </g>
                <g className="tree-group-2" transform="translate(75, 8) scale(0.7)">
                    <path className="drawable-path tree-trunk-v11" d="M35 88 V 70" />
                    <path className="drawable-path tree-branches-v11" d="M25 75 l10 -15 l10 15 h-20" />
                    <path className="drawable-path tree-branches-v11" d="M28 68 l7 -10 l7 10 h-14" />
                </g>
                <g className="tree-group-3" transform="translate(-10, 0)">
                    <path className="drawable-path tree-trunk-v11" d="M35 88 V 70" />
                    <path className="drawable-path tree-branches-v11" d="M25 75 l10 -15 l10 15 h -20" />
                    <path className="drawable-path tree-branches-v11" d="M28 68 l7 -10 l7 10 h-14" />
                </g>
                <g className="tree-group-4" transform="translate(60, 0) scale(1.1)">
                    <path className="drawable-path tree-trunk-v11" d="M35 88 V 70" />
                    <path className="drawable-path tree-branches-v11" d="M25 75 l10 -15 l10 15 h -20" />
                    <path className="drawable-path tree-branches-v11" d="M28 68 l7 -10 l7 10 h-14" />
                </g>
            </g>
            
            {/* -- Layer 3: Chalet -- */}
            <g>
                <path className="drawable-path chalet-outline-v11" stroke={colors.chalet} strokeWidth="2" d="M35 88 L 60 45 L 85 88 Z M45 88 L 75 88" />
                <rect className="window-v11" x="55" y="73" width="10" height="10" rx="1" fill={colors.light} />
            </g>

            {/* -- Layer 4: Ground & River -- */}
            <g strokeWidth="1.5">
                <path className="drawable-path river-outline-v11" stroke={colors.river} d="M-5 88 C 15 80, 35 80, 55 88 S 75 96, 125 88" />
                <path className="river-flow-v11" d="M-5 88 C 15 80, 35 80, 55 88 S 75 96, 125 88" stroke="white" strokeWidth="1" strokeDasharray="1 20" />
                <path className="drawable-path roots-v11" stroke={colors.roots} d="M5 88 C 10 92, 15 92, 20 88" />
                <path className="drawable-path roots-v11" stroke={colors.roots} d="M30 88 C 35 84, 40 84, 45 88" />
                <path className="drawable-path roots-v11" stroke={colors.roots} d="M95 88 C 90 92, 85 92, 80 88" />
                <path className="drawable-path roots-v11" stroke={colors.roots} d="M115 88 C 110 84, 105 84, 100 88" />
            </g>
            
            {/* -- Layer 5: Life Drop & Ripples -- */}
            <g>
                <circle className="drop-v11" cx="60" cy="0" r="2.5" fill={colors.drop} />
                <circle className="ripple-v11" cx="60" cy="91" stroke={colors.drop} strokeWidth="1" />
                <circle className="ripple-v11" cx="60" cy="91" stroke={colors.drop} strokeWidth="1" />
            </g>
        </svg>
    );
};

export default AnimatedLogoV11;