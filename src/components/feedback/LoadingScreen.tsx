// src/components/feedback/LoadingScreen.tsx

import { useState, useRef } from 'react';
import { useGSAP } from '@gsap/react';
import gsap from 'gsap';

// Re-introduce the onFinished prop
const LoadingScreen = ({ onFinished }: { onFinished: () => void }) => {
    const container = useRef<HTMLDivElement>(null);
    const [isAnimationFinished, setIsAnimationFinished] = useState(false);

    useGSAP(() => {
        const paths = gsap.utils.toArray<SVGPathElement>('.drawable-path');
        if (paths.length === 0) {
            onFinished(); // Call onFinished immediately if no animation
            setIsAnimationFinished(true);
            return;
        };

        paths.forEach(path => {
            const length = path.getTotalLength();
            gsap.set(path, {
                strokeDasharray: length,
                strokeDashoffset: length,
                opacity: 1,
            });
        });

        const tl = gsap.timeline({
            onComplete: () => {
                gsap.to(container.current, {
                    opacity: 0,
                    duration: 0.8,
                    ease: 'power2.inOut',
                    onComplete: () => {
                        onFinished(); // Call the passed onFinished function
                        setIsAnimationFinished(true);
                    },
                });
            }
        });

        tl.to(".ground", { strokeDashoffset: 0, duration: 0.5, ease: 'power1.inOut' })
          .to(".cabin", { strokeDashoffset: 0, duration: 1.0, ease: 'power1.inOut' }, "-=0.2")
          .to(".trees", { strokeDashoffset: 0, duration: 1.2, ease: 'power1.inOut', stagger: 0.3 }, "<")
          .to({}, { duration: 0.5 });

    }, { scope: container });

    if (isAnimationFinished) {
        return null;
    }

    return (
        // Added a very high z-index to ensure it's on top of everything
        <div 
            ref={container} 
            className="fixed inset-0 z-[999] flex items-center justify-center bg-[var(--color-background)]"
        >
            <svg 
                xmlns="http://www.w3.org/2000/svg" 
                width="180" 
                height="180" 
                viewBox="0 0 24 24" 
                fill="none" 
                stroke="#ffffff" 
                strokeWidth="0.3" 
                strokeLinecap="round" 
                strokeLinejoin="round"
            >
                <path className="drawable-path ground" d="M2 20h20" />
                <path className="drawable-path cabin" d="M9 20v-6h6v6" />
                <path className="drawable-path cabin" d="M8 14l4-4 4 4" />
                <path className="drawable-path cabin" d="M11 20v-3h2v3" />
                <path className="drawable-path trees" d="M5 20v-4" />
                <path className="drawable-path trees" d="M3 16h4l-2-3-2 3z" />
                <path className="drawable-path trees" d="M19 20v-4" />
                <path className="drawable-path trees" d="M17 16h4l-2-3-2 3z" />
            </svg>
        </div>
    );
};

export default LoadingScreen;