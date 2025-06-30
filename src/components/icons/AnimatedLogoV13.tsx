// src/components/icons/AnimatedLogoV13.tsx
import { useRef } from 'react';
import { useGSAP } from '@gsap/react';
import gsap from 'gsap';
import { MorphSVGPlugin } from 'gsap/MorphSVGPlugin';

// --- IMPORTANT: REGISTER THE PLUGIN ---
// This should ideally be done once at the top level of your app,
// but is included here for completeness.
gsap.registerPlugin(MorphSVGPlugin);

const AnimatedLogoV13 = ({ 
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
        smoke: variant === 'color'? '#e2e8f0' : '#f8fafc',
        aurora: variant === 'color'? '#a3e635' : 'white',
    };

    useGSAP(() => {
        if (!container.current) return;

        // --- ELEMENT SELECTION ---
        const drawablePaths = gsap.utils.toArray<SVGPathElement>('.drawable-path');
        const ripples = gsap.utils.toArray<SVGCircleElement>('.ripple-v13');
        const stars = gsap.utils.toArray<SVGElement>('.star-v13');
        const smoke = container.current.querySelector<SVGPathElement>('.smoke-start-v13');
        const turbulence = container.current.querySelector<SVGFETurbulenceElement>('feTurbulence');
        
        const drop = container.current.querySelector<SVGCircleElement>('.drop-v13');
        const windowEl = container.current.querySelector<SVGRectElement>('.window-v13');
        const riverFlow = container.current.querySelector<SVGPathElement>('.river-flow-v13');
        const aurora = container.current.querySelector<SVGPathElement>('.aurora-v13');

        // --- TYPE-SAFETY GUARD CLAUSE ---
        if (!drop ||!windowEl ||!riverFlow ||!smoke ||!turbulence ||!aurora) {
            return;
        }

        // --- INITIAL STATE CONFIGURATION ---
        gsap.set(drawablePaths, {
            strokeDasharray: (i, el) => el.getTotalLength(),
            strokeDashoffset: (i, el) => el.getTotalLength(),
            autoAlpha: 1
        });
        gsap.set(ripples, { attr: { r: 0 }, opacity: 1, transformOrigin: 'center' });
        gsap.set(windowEl, { autoAlpha: 0, transformOrigin: 'center' });
        gsap.set(stars, { autoAlpha: 0 });
        gsap.set(drop, { y: -20, autoAlpha: 0 });
        gsap.set(riverFlow, { strokeDashoffset: 0 });
        gsap.set(smoke, { autoAlpha: 0, scale: 0.5, y: 5, transformOrigin: 'bottom center' });
        gsap.set(aurora, { opacity: 0 });

        // --- AMBIENT "LIVING LOGO" ANIMATIONS ---
        const ambientTweens = {
            stars: gsap.timeline({ repeat: -1, repeatRefresh: true })
               .to(stars, {
                    scale: () => gsap.utils.random(0.7, 1.5),
                    opacity: () => gsap.utils.random(0.5, 1),
                    x: () => gsap.utils.random(-2, 2),
                    y: () => gsap.utils.random(-2, 2),
                    duration: () => gsap.utils.random(1.5, 3),
                    ease: 'power2.inOut',
                    stagger: { each: 0.2, from: 'random' }
                }),
            window: gsap.to(windowEl, {
                scale: 1.08,
                opacity: 0.75,
                duration: 3,
                repeat: -1,
                yoyo: true,
                ease: 'sine.inOut'
            }),
            river: gsap.to(riverFlow, {
                strokeDashoffset: -32,
                duration: 2,
                repeat: -1,
                ease: 'none'
            }),
            smoke: gsap.timeline({ repeat: -1, repeatDelay: 2 })
               .to(smoke, {
                    morphSVG: '.smoke-end-v13',
                    y: -15,
                    opacity: 0,
                    duration: 10,
                    ease: 'power1.inOut'
                })
               .set(smoke, {
                    y: 5,
                    opacity: 1,
                    morphSVG: '.smoke-start-v13'
                }),
            aurora: gsap.timeline({ repeat: -1, yoyo: true })
               .to(turbulence, {
                    attr: { baseFrequency: '0.03 0.04' },
                    duration: 15,
                    ease: 'sine.inOut'
                })
        };

        // Pause all ambient animations initially
        Object.values(ambientTweens).forEach(tween => tween.pause());

        const playAmbient = () => Object.values(ambientTweens).forEach(tween => tween.play());

        // --- NARRATIVE BUILD SEQUENCE (PLAYS ONCE) ---
        const buildSequenceTl = gsap.timeline({
            defaults: { ease: 'power2.inOut' },
            onComplete: playAmbient
        });

        buildSequenceTl
           .to(drop, { y: 88, autoAlpha: 1, duration: 1.2, ease: 'expo.in' })
           .to(drop, { autoAlpha: 0, duration: 0.1 }, "-=0.1")
           .to(ripples, { attr: { r: 60 }, autoAlpha: 0, duration: 2, stagger: 0.3, ease: 'expo.out' }, "<")
           .to('.river-outline-v13', { strokeDashoffset: 0, duration: 2 }, "<+=0.2")
           .to('.roots-v13', { strokeDashoffset: 0, duration: 2, stagger: 0.1 }, "<+=0.5")
           .to('.tree-trunk-v13', { strokeDashoffset: 0, duration: 1.2, stagger: 0.2 }, "<+=0.5")
           .to('.tree-branches-v13', { strokeDashoffset: 0, duration: 1.5, stagger: 0.05 }, "<+=0.6")
           .to('.chalet-outline-v13', { strokeDashoffset: 0, duration: 2, ease: 'power3.inOut' }, ">-1")
           .to('.chalet-details-v13', { strokeDashoffset: 0, duration: 1.5, stagger: 0.2 }, "<+=0.5")
           .fromTo(stars, 
                { scale: 0, autoAlpha: 0 }, 
                { scale: 1, autoAlpha: 1, duration: 1.5, stagger: { each: 0.1, from: 'random' }, ease: 'back.out(3)' }, 
                "<+=0.5"
            )
           .to(windowEl, { autoAlpha: 1, duration: 1, ease: 'power4.inOut' }, "<+=0.5")
           .to(smoke, { autoAlpha: 1, scale: 1, y: 0, duration: 1.5, ease: 'power2.out' }, "<")
           .to(aurora, { opacity: 0.15, duration: 4, ease: 'power3.inOut' }, ">-2");

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
            {/* --- SVG Filters for Aurora Effect --- */}
            <defs>
                <filter id="aurora-filter">
                    <feTurbulence type="fractalNoise" baseFrequency="0.01 0.02" numOctaves="3" />
                    <feDisplacementMap in="SourceGraphic" scale="10" />
                </filter>
            </defs>

            {/* -- Layer 1: Sky & Stars -- */}
            <g>
                <path className="aurora-v13" d="M-10,30 Q 60,-20 130,30 T 250 30" fill={colors.aurora} filter="url(#aurora-filter)" />
                <g fill={colors.sky}>
                    <path className="star-v13" transform="translate(15 5) scale(0.4)" d="M10 0 L13 7 L20 7 L15 12 L17 20 L10 15 L3 20 L5 12 L0 7 L7 7 Z" />
                    <path className="star-v13" transform="translate(95 15) scale(0.5)" d="M10 0 L13 7 L20 7 L15 12 L17 20 L10 15 L3 20 L5 12 L0 7 L7 7 Z" />
                    <path className="star-v13" transform="translate(5 40) scale(0.35)" d="M10 0 L13 7 L20 7 L15 12 L17 20 L10 15 L3 20 L5 12 L0 7 L7 7 Z" />
                    <path className="star-v13" transform="translate(105 50) scale(0.4)" d="M10 0 L13 7 L20 7 L15 12 L17 20 L10 15 L3 20 L5 12 L0 7 L7 7 Z" />
                    <path className="star-v13" transform="translate(80 70) scale(0.3)" d="M10 0 L13 7 L20 7 L15 12 L17 20 L10 15 L3 20 L5 12 L0 7 L7 7 Z" />
                    <path className="drawable-path star-v13" stroke={colors.sky} strokeWidth="1.5" d="M90 5 a 5 5 0 0 1 5 5 a 3 3 0 0 0 -3 -3" />
                </g>
            </g>

            {/* -- Layer 2: Forest -- */}
            <g stroke={colors.tree} strokeWidth="2">
                <g className="tree-group-1" transform="translate(10, 5) scale(0.6)">
                    <path className="drawable-path tree-trunk-v13" d="M35 88 V 70" />
                    <path className="drawable-path tree-branches-v13" d="M25 75 l10 -15 l10 15 h -20" />
                    <path className="drawable-path tree-branches-v13" d="M28 68 l7 -10 l7 10 h-14" />
                </g>
                <g className="tree-group-2" transform="translate(75, 8) scale(0.7)">
                    <path className="drawable-path tree-trunk-v13" d="M35 88 V 70" />
                    <path className="drawable-path tree-branches-v13" d="M25 75 l10 -15 l10 15 h -20" />
                    <path className="drawable-path tree-branches-v13" d="M28 68 l7 -10 l7 10 h-14" />
                </g>
                <g className="tree-group-3" transform="translate(-10, 0)">
                    <path className="drawable-path tree-trunk-v13" d="M35 88 V 70" />
                    <path className="drawable-path tree-branches-v13" d="M25 75 l10 -15 l10 15 h -20" />
                    <path className="drawable-path tree-branches-v13" d="M28 68 l7 -10 l7 10 h-14" />
                </g>
                <g className="tree-group-4" transform="translate(60, 0) scale(1.1)">
                    <path className="drawable-path tree-trunk-v13" d="M35 88 V 70" />
                    <path className="drawable-path tree-branches-v13" d="M25 75 l10 -15 l10 15 h -20" />
                    <path className="drawable-path tree-branches-v13" d="M28 68 l7 -10 l7 10 h-14" />
                </g>
            </g>
            
            {/* -- Layer 3: Chalet -- */}
            <g stroke={colors.chalet} strokeWidth="2">
                <path className="drawable-path chalet-outline-v13" d="M35 88 L 60 45 L 85 88 Z" />
                <path className="drawable-path chalet-details-v13" d="M56 88 V 75 H 64 V 88" />
                <path className="drawable-path chalet-details-v13" d="M70 60 l 5 -5 l 5 5 v 8 l -5 5 l -5 -5 z" />
                <path className="drawable-path chalet-details-v13" d="M74 55 v -5 h 4 v 5" />
                <g fill={colors.smoke} stroke="none">
                    <path className="smoke-start-v13" d="M76 50 q 2 -5 5 -5 t 5 5 q 2 5 0 10 t -5 5 q -2 -5 -5 -5 t -5 5" />
                    <path className="smoke-end-v13" style={{ display: 'none' }} d="M74 45 q 3 -6 6 -6 t 6 6 q 3 6 0 12 t -6 6 q -3 -6 -6 -6 t -6 6" />
                </g>
                <rect className="window-v13" x="55" y="65" width="10" height="8" rx="1" fill={colors.light} />
            </g>

            {/* -- Layer 4: Ground & River -- */}
            <g strokeWidth="1.5">
                <path className="drawable-path river-outline-v13" stroke={colors.river} d="M-5 88 C 15 80, 35 80, 55 88 S 75 96, 125 88" />
                <path className="river-flow-v13" d="M-5 88 C 15 80, 35 80, 55 88 S 75 96, 125 88" stroke="white" strokeWidth="1" strokeDasharray="1 20" />
                <path className="drawable-path roots-v13" stroke={colors.roots} d="M5 88 C 10 92, 15 92, 20 88" />
                <path className="drawable-path roots-v13" stroke={colors.roots} d="M30 88 C 35 84, 40 84, 45 88" />
                <path className="drawable-path roots-v13" stroke={colors.roots} d="M95 88 C 90 92, 85 92, 80 88" />
                <path className="drawable-path roots-v13" stroke={colors.roots} d="M115 88 C 110 84, 105 84, 100 88" />
            </g>
            
            {/* -- Layer 5: Life Drop & Ripples -- */}
            <g>
                <circle className="drop-v13" cx="60" cy="0" r="2.5" fill={colors.drop} />
                <circle className="ripple-v13" cx="60" cy="91" stroke={colors.drop} strokeWidth="1" />
                <circle className="ripple-v13" cx="60" cy="91" stroke={colors.drop} strokeWidth="1" />
            </g>
        </svg>
    );
};

export default AnimatedLogoV13;