'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Menu, X, Search } from 'lucide-react';
import { Button } from '@/components/ui/button';

export function Header() {
    return (
        <header className="sticky top-0 left-0 w-full z-50 bg-white">
            <div className="w-full pl-[5%] md:pl-[10%] pr-[5%] md:pr-[10%] py-3 md:py-4 flex justify-between items-center">
                {/* Logo - Top Left */}
                <Link href="/" className="flex items-center">
                    <div className="relative w-[60px] h-auto">
                        <Image
                            src="/Adverbe Logo - 250px.png"
                            alt="The Adverbe Logo"
                            width={60}
                            height={31} // Aspect ratio approx 1.9:1
                            className="object-contain"
                            priority
                        />
                    </div>
                </Link>

                {/* Navigation - Top Right */}
                <Link
                    href="/shows"
                    className="text-xl md:text-2xl font-bold text-black hover:text-gray-600 transition-colors lowercase"
                    style={{ fontFamily: 'Helvetica, Arial, sans-serif' }}
                >
                    our networks
                </Link>
            </div>
        </header>
    );
}
