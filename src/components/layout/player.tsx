'use client';

import React from 'react';
import { useAudio } from '@/lib/audio-context';
import { Play, Pause, X, SkipBack, SkipForward } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';

export function GlobalPlayer() {
    const { currentEpisode, isPlaying, togglePlay, progress, duration, seek } = useAudio();

    if (!currentEpisode) return null;

    const formatTime = (time: number) => {
        if (isNaN(time)) return "0:00";
        const minutes = Math.floor(time / 60);
        const seconds = Math.floor(time % 60);
        return `${minutes}:${seconds.toString().padStart(2, '0')}`;
    };

    const handleSeek = (e: React.ChangeEvent<HTMLInputElement>) => {
        seek(Number(e.target.value));
    };

    return (
        <div className="fixed bottom-0 left-0 right-0 bg-background border-t border-border p-4 shadow-lg z-50">
            <div className="container mx-auto flex items-center justify-between gap-4">

                {/* Episode Info */}
                <div className="hidden md:flex flex-col w-1/4">
                    <h4 className="font-semibold text-sm truncate">{currentEpisode.title}</h4>
                    <span className="text-xs text-muted-foreground truncate">{currentEpisode.description}</span>
                </div>

                {/* Controls */}
                <div className="flex-1 flex flex-col items-center max-w-2xl">
                    <div className="flex items-center gap-4 mb-2">
                        <Button variant="ghost" size="icon" className="h-8 w-8 text-muted-foreground hover:text-primary" onClick={() => seek(progress - 15)}>
                            <SkipBack className="h-4 w-4" />
                        </Button>
                        <Button
                            size="icon"
                            className="h-10 w-10 rounded-full bg-primary text-primary-foreground hover:bg-primary/90"
                            onClick={togglePlay}
                        >
                            {isPlaying ? <Pause className="h-5 w-5" /> : <Play className="h-5 w-5 ml-1" />}
                        </Button>
                        <Button variant="ghost" size="icon" className="h-8 w-8 text-muted-foreground hover:text-primary" onClick={() => seek(progress + 15)}>
                            <SkipForward className="h-4 w-4" />
                        </Button>
                    </div>

                    <div className="w-full flex items-center gap-3 text-xs text-muted-foreground font-mono">
                        <span>{formatTime(progress)}</span>
                        <input
                            type="range"
                            min={0}
                            max={duration || 100}
                            value={progress}
                            onChange={handleSeek}
                            className="flex-1 h-1 bg-secondary rounded-lg appearance-none cursor-pointer [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:w-3 [&::-webkit-slider-thumb]:h-3 [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:bg-primary"
                        />
                        <span>{formatTime(duration)}</span>
                    </div>
                </div>

                {/* Mobile / Extra Actions */}
                <div className="w-1/4 flex justify-end">
                    {/* Placeholder for volume or close */}
                </div>
            </div>
        </div>
    );
}
