'use client';

import React from 'react';
import { cn } from '@/lib/utils';

interface ComingSoonVisualProps {
    className?: string;
    textSize?: 'sm' | 'md' | 'lg' | 'xl';
    dotSize?: 'sm' | 'md' | 'lg';
}

export function ComingSoonVisual({
    className,
    textSize = 'md',
    dotSize = 'md'
}: ComingSoonVisualProps) {

    const textSizes = {
        sm: 'text-2xl',
        md: 'text-3xl',
        lg: 'text-4xl',
        xl: 'text-5xl md:text-6xl lg:text-7xl',
    };

    const dotSizes = {
        sm: 'w-[6px] h-[6px]',
        md: 'w-[8px] h-[8px]',
        lg: 'w-[12px] h-[12px] md:w-[16px] h-[16px]',
    };

    const offsets = {
        sm: '-translate-x-1',
        md: '-translate-x-1',
        lg: '-translate-x-2',
        xl: '-translate-x-2 md:-translate-x-4',
    };

    const offsetsRight = {
        sm: 'translate-x-1',
        md: 'translate-x-1',
        lg: 'translate-x-2',
        xl: 'translate-x-2 md:translate-x-4',
    };

    return (
        <div className={cn(
            "w-full h-full bg-gray-50 flex flex-col items-center justify-center p-4 select-none relative overflow-hidden",
            className
        )}>
            <div className="flex flex-col gap-0 leading-none">
                <span className={cn(
                    "font-black text-gray-300 tracking-tighter self-start transform transition-transform duration-500 group-hover:scale-105",
                    textSizes[textSize],
                    offsets[textSize]
                )}>
                    COMING
                </span>
                <span className={cn(
                    "font-black text-gray-300 tracking-tighter self-end transform transition-transform duration-500 group-hover:scale-105 flex items-baseline",
                    textSizes[textSize],
                    offsetsRight[textSize]
                )}>
                    SOON
                    <div className={cn(
                        "rounded-full bg-[#E4192B] ml-1",
                        dotSizes[dotSize]
                    )} />
                </span>
            </div>
        </div>
    );
}
