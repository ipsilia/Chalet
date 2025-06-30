// src/components/icons/AnimatedLogoV6.tsx
import { useRef } from 'react';
import { useGSAP } from '@gsap/react';
import gsap from 'gsap';

const AnimatedLogoV6 = ({ 
    className, 
    variant = 'color' 
}: { 
    className?: string;
    variant?: 'color' | 'mono';
}) => {
    const container = useRef<SVGSVGElement>(null);

    const colors = {
        blueprint: variant === 'color' ? '#374151' : '#4b5563',
        structure: variant === 'color' ? '#a86d5d' : 'currentColor',
        detail: variant === 'color' ? '#6b7280' : 'currentColor',
        light: '#fde047',
        smoke: variant === 'color' ? '#d1d5db' : '#e5e7eb',
    };

    useGSAP(() => {
        if (!container.current) return;

        const blueprintLines = gsap.utils.toArray<SVGPathElement>('.blueprint-v6');
        const structureLines = gsap.utils.toArray<SVGPathElement>('.structure-v6');
        const detailLines = gsap.utils.toArray<SVGPathElement>('.detail-v6');
        const windowGlow = container.current.querySelector('.window-glow-v6');
        const smoke = container.current.querySelector('.smoke-v6');

        gsap.set([blueprintLines, structureLines, detailLines, smoke], { autoAlpha: 0 });
        gsap.set(windowGlow, { autoAlpha: 0, scale: 0, transformOrigin: 'center' });

        const masterTl = gsap.timeline({
            repeat: -1,
            repeatDelay: 2,
            yoyo: true,
            defaults: { ease: 'power2.out' }
        });

        masterTl
            // Phase 1: Blueprint fades in
            .to(blueprintLines, { autoAlpha: 0.3, duration: 1, stagger: 0.1 })
            
            // Phase 2: Structure draws in
            .fromTo(structureLines, 
                { strokeDasharray: (_i, el) => el.getTotalLength(), strokeDashoffset: (_i, el) => el.getTotalLength(), autoAlpha: 1 },
                { strokeDashoffset: 0, duration: 1.5, stagger: 0.2 },
                "-=0.5"
            )

            // Phase 3: Details draw in
            .fromTo(detailLines,
                { strokeDasharray: (_i, el) => el.getTotalLength(), strokeDashoffset: (_i, el) => el.getTotalLength(), autoAlpha: 1 },
                { strokeDashoffset: 0, duration: 1, stagger: 0.1 },
                "-=1.2"
            )
            
            // Phase 4: Hearth lights up
            .to(windowGlow, { autoAlpha: 1, scale: 1, duration: 0.5, ease: 'back.out(1.7)' }, "-=0.5")
            
            // Phase 5: Smoke begins to rise
            .fromTo(smoke, 
                { y: 5, autoAlpha: 0, scaleY: 0.5 },
                { y: -15, autoAlpha: 0.4, scaleY: 1, duration: 3, ease: 'power1.inOut' },
                "<"
            )

            // Phase 6: Blueprint fades out as the logo becomes "solid"
            .to(blueprintLines, { autoAlpha: 0, duration: 1 }, "-=2.5");

        // Independent, continuous "living" animations
        gsap.to(windowGlow, { 
            scale: 1.1, 
            autoAlpha: 0.85,
            duration: 2, 
            repeat: -1, 
            yoyo: true, 
            ease: 'sine.inOut' 
        }).delay(4); // Start after the main animation is complete

        gsap.to(smoke, { 
            x: '+=3', 
            duration: 4, 
            repeat: -1, 
            yoyo: true, 
            ease: 'sine.inOut' 
        }).delay(4);


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
            {/* -- Blueprint Grid -- */}
            <g stroke={colors.blueprint} strokeWidth="0.5">
                <path className="blueprint-v6" d="M0 50 H 120" />
                <path className="blueprint-v6" d="M60 0 V 100" />
                <path className="blueprint-v6" d="M30 0 V 100" />
                <path className="blueprint-v6" d="M90 0 V 100" />
                <path className="blueprint-v6" d="M0 25 H 120" />
                <path className="blueprint-v6" d="M0 75 H 120" />
            </g>

            {/* -- Chalet -- */}
            <g>
                {/* Main Structure */}
                <g stroke={colors.structure} strokeWidth="2">
                    <path className="structure-v6" d="M10 90 L 60 20 L 110 90 Z" />
                    <path className="structure-v6" d="M25 90 V 60 L 60 40 L 95 60 V 90" />
                </g>
                {/* Details */}
                <g stroke={colors.detail} strokeWidth="1.5">
                    <path className="detail-v6" d="M52 90 V 75 H 68 V 90" />
                    <path className="detail-v6" d="M30 65 H 90" />
                    <path className="detail-v6" d="M75 50 L 85 50" />
                    <path className="detail-v6" d="M35 50 L 45 50" />
                    {/* Chimney */}
                    <path className="detail-v6" d="M80 47.5 V 30 H 88 V 40" />
                </g>
                {/* Window and Light */}
                <g>
                    <rect className="window-glow-v6" x="52" y="75" width="16" height="15" rx="1" fill={colors.light} />
                </g>
                {/* Smoke */}
                <g>
                    <path className="smoke-v6" d="M84 28 C 84 24, 88 24, 88 28 C 92 28, 92 22, 88 22" stroke={colors.smoke} strokeWidth="1.5" />
                </g>
            </g>
        </svg>
    );
};

export default AnimatedLogoV6;