'use client';

import React, { createContext, useContext, useState, useRef, useEffect } from 'react';
import { Episode } from '@/types';

interface AudioContextType {
    currentEpisode: Episode | null;
    isPlaying: boolean;
    playEpisode: (episode: Episode) => void;
    togglePlay: () => void;
    progress: number;
    duration: number;
    seek: (time: number) => void;
}

const AudioContext = createContext<AudioContextType | undefined>(undefined);

export function AudioProvider({ children }: { children: React.ReactNode }) {
    const [currentEpisode, setCurrentEpisode] = useState<Episode | null>(null);
    const [isPlaying, setIsPlaying] = useState(false);
    const [progress, setProgress] = useState(0);
    const [duration, setDuration] = useState(0);

    const audioRef = useRef<HTMLAudioElement | null>(null);

    useEffect(() => {
        if (!audioRef.current) {
            audioRef.current = new Audio();
        }

        const audio = audioRef.current;

        const updateProgress = () => {
            setProgress(audio.currentTime);
            setDuration(audio.duration || 0);
        };

        const handleEnded = () => {
            setIsPlaying(false);
            setProgress(0);
        };

        audio.addEventListener('timeupdate', updateProgress);
        audio.addEventListener('ended', handleEnded);
        audio.addEventListener('loadedmetadata', updateProgress);

        return () => {
            audio.removeEventListener('timeupdate', updateProgress);
            audio.removeEventListener('ended', handleEnded);
            audio.removeEventListener('loadedmetadata', updateProgress);
        };
    }, []);

    useEffect(() => {
        if (currentEpisode && audioRef.current) {
            if (audioRef.current.src !== currentEpisode.audioUrl) {
                audioRef.current.src = currentEpisode.audioUrl;
                audioRef.current.play().then(() => setIsPlaying(true)).catch(e => console.error("Playback failed", e));
            } else {
                if (isPlaying) audioRef.current.play();
                else audioRef.current.pause();
            }
        }
    }, [currentEpisode, isPlaying]);

    const playEpisode = (episode: Episode) => {
        if (currentEpisode?.id === episode.id) {
            togglePlay();
        } else {
            setCurrentEpisode(episode);
            setIsPlaying(true);
        }
    };

    const togglePlay = () => {
        if (currentEpisode) {
            setIsPlaying(!isPlaying);
        }
    };

    const seek = (time: number) => {
        if (audioRef.current) {
            audioRef.current.currentTime = time;
            setProgress(time);
        }
    }

    return (
        <AudioContext.Provider value={{ currentEpisode, isPlaying, playEpisode, togglePlay, progress, duration, seek }}>
            {children}
        </AudioContext.Provider>
    );
}

export function useAudio() {
    const context = useContext(AudioContext);
    if (context === undefined) {
        throw new Error('useAudio must be used within an AudioProvider');
    }
    return context;
}
