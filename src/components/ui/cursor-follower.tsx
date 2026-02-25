'use client';

import { useEffect, useState } from 'react';
import { motion, useMotionValue, useSpring } from 'framer-motion';

export function CursorFollower() {
    const cursorX = useMotionValue(-100);
    const cursorY = useMotionValue(-100);
    const [isHoveringInvert, setIsHoveringInvert] = useState(false);
    const [isVisible, setIsVisible] = useState(false);

    const springConfig = { damping: 25, stiffness: 700 };
    const cursorXSpring = useSpring(cursorX, springConfig);
    const cursorYSpring = useSpring(cursorY, springConfig);

    useEffect(() => {
        const isTablet = () => window.innerWidth >= 768 && window.innerWidth <= 1024;

        const moveCursor = (e: MouseEvent) => {
            if (isTablet()) {
                if (isVisible) setIsVisible(false);
                return;
            }

            cursorX.set(e.clientX - 8); // Center the 16px circle
            cursorY.set(e.clientY - 8);
            if (!isVisible) setIsVisible(true);

            // Check for inverted data attribute
            const target = e.target as HTMLElement;
            const invertElement = target.closest('[data-cursor="invert"]');
            setIsHoveringInvert(!!invertElement);
        };

        const handleMouseLeave = () => {
            setIsVisible(false);
        };

        const handleMouseEnter = () => {
            if (!isTablet()) setIsVisible(true);
        }

        window.addEventListener('mousemove', moveCursor);
        document.body.addEventListener('mouseleave', handleMouseLeave);
        document.body.addEventListener('mouseenter', handleMouseEnter);

        return () => {
            window.removeEventListener('mousemove', moveCursor);
            document.body.removeEventListener('mouseleave', handleMouseLeave);
            document.body.removeEventListener('mouseenter', handleMouseEnter);
        };
    }, [cursorX, cursorY, isVisible]);

    if (!isVisible) return null;

    return (
        <>
            <style>{`
                @media (min-width: 768px) and (max-width: 1024px) {
                    .cursor-follower {
                        display: none !important;
                        opacity: 0 !important;
                    }
                }
            `}</style>
            <motion.div
                className="cursor-follower fixed top-0 left-0 w-4 h-4 rounded-full pointer-events-none z-[9999] hidden md:block"
                style={{
                    x: cursorXSpring,
                    y: cursorYSpring,
                    backgroundColor: isHoveringInvert ? '#FFFFFF' : '#E4192B',
                    mixBlendMode: isHoveringInvert ? 'difference' : 'normal',
                    opacity: 1,
                }}
                animate={{
                    scale: isHoveringInvert ? 1.5 : 1 // Optional: Scale up slightly on dark backgrounds
                }}
                transition={{
                    scale: { duration: 0.2 }
                }}
            />
        </>
    );
}
