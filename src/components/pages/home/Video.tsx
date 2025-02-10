"use client";
import React, { useRef, useEffect, useState, useCallback } from "react";

import { useSpring, useTransform, useScroll } from "motion/react";
import { ANIMATION_GPU_OPTIMIZATION, cn } from "@/lib/utils";

const ORIGINAL_WIDTH = 1488; // Original image width
const ORIGINAL_HEIGHT = 835; // Original image height

const FRAME_COUNT = 164;


const debounce = (func: () => void, wait: number) => {
    let timeout: NodeJS.Timeout;
    return () => {
        clearTimeout(timeout);
        timeout = setTimeout(func, wait);
    };
};


const Video = () => {
    const canvasRef = useRef<HTMLCanvasElement>(null);
    const containerRef = useRef<HTMLDivElement>(null);
    const imagesRef = useRef([] as Array<HTMLImageElement>);
    const [isLoading, setIsLoading] = useState(true);
    const [screenSize, setScreenSize] = useState(0);
    const requestRef = useRef<number>(0);

    const getScreenSize = useCallback(() => {
        const width = window.innerWidth;
        if (width < 480) return 320;
        if (width < 768) return 480;
        if (width < 1024) return 768;
        if (width < 1280) return 1024;
        if (width < 1600) return 1280;
        return 1600; // for larger screens
    }, []);

    
    // Responsive screen size handling with debounce
    useEffect(() => {
        const handleResize = () => setScreenSize(getScreenSize());
        const debouncedResize = debounce(handleResize, 100);
        window.addEventListener('resize', debouncedResize);
        setScreenSize(getScreenSize());
        return () => window.removeEventListener('resize', debouncedResize);
    }, [getScreenSize]);

    useEffect(() => {
        if (!containerRef.current || !canvasRef.current || screenSize === 0) return;

        setIsLoading(true);
        const controller = new AbortController();

        const loadImages = async () => {
            try {
                const images = await Promise.all(
                    Array.from({ length: FRAME_COUNT }, (_, i) => {
                        const img = new Image();
                        img.src = `/framer-image/dim/ezgif-frame-${(i + 1)
                            .toString()
                            .padStart(3, "0")}_${screenSize}.webp`;
                        
                        img.width = screenSize;
                        img.height = (screenSize * ORIGINAL_HEIGHT) / ORIGINAL_WIDTH;

                        return new Promise<HTMLImageElement>((resolve, reject) => {
                            img.onload = () => resolve(img);
                            img.onerror = reject;
                        });
                    })
                );
                
                if (!controller.signal.aborted) {
                    imagesRef.current = images;
                    setIsLoading(false);
                }
            } catch (error) {
                if (!controller.signal.aborted) {
                    console.error('Image loading error:', error);
                    setIsLoading(false);
                }
            }
        };

        loadImages();
        return () => {
            controller.abort();
            imagesRef.current.forEach(img => img.src = '');
            imagesRef.current = [];
        };
    }, [imagesRef.current, containerRef, canvasRef, screenSize, getScreenSize]);


    const { scrollYProgress } = useScroll({
        target: containerRef,
        offset: ["start end", "end start"]
    });

    
    const frameIndex = useTransform(scrollYProgress, [0, 1], [0, FRAME_COUNT - 1]);
    const springFrame = useSpring(frameIndex, {
        stiffness: 250,
        damping: 30,
        mass: 0.2,
        restDelta: 0.001
    });


    // Canvas rendering optimization
    const animate = useCallback(() => {
        if (!canvasRef.current || !imagesRef.current.length) return;

        const frame = Math.round(springFrame.get());
        const ctx = canvasRef.current.getContext('2d');
        if (!ctx || frame >= imagesRef.current.length) return;

        ctx.clearRect(0, 0, canvasRef.current.width, canvasRef.current.height);
        ctx.drawImage(imagesRef.current[frame] as HTMLImageElement, 0, 0);
        console.log(imagesRef.current[frame]);

        requestRef.current = requestAnimationFrame(animate);
    }, [springFrame]);

    useEffect(() => {
        requestRef.current = requestAnimationFrame(animate);
        return () => {
            if (requestRef.current) cancelAnimationFrame(requestRef.current);
        };
    }, [animate]);

    // Canvas dimensions management
    useEffect(() => {
        if (!canvasRef.current || screenSize === 0) return;
        canvasRef.current.width = screenSize;
        canvasRef.current.height = (screenSize * ORIGINAL_HEIGHT) / ORIGINAL_WIDTH;
    }, [screenSize]);


    return (
        <div
            ref={containerRef}
            className={cn(
                "relative w-full rounded-3xl overflow-hidden bg-transparent",
                "h-[60vh] will-change-transform"
            )}
        >
            <canvas
                ref={canvasRef}
                className={cn(
                    "absolute h-full w-full",
                    ANIMATION_GPU_OPTIMIZATION,
                    isLoading && "opacity-0"
                )}
                style={{ objectFit: "cover" }}
            />
        </div>
    );
};

export default Video;
