import React, { useEffect } from 'react';
import { twMerge } from 'tailwind-merge';
import { gsap } from '@/utils/gsap';

const Cursor = ({ children }: { children: React.ReactElement }) => {
    
    useEffect(() => {
        const ctx = gsap.context((self) => {
            gsap.set('.ball_gsap', {
                xPercent: -50,
                yPercent: -50,
            });
            let xTo = gsap.quickTo('.ball_gsap', 'x', {
                duration: 0.4,
                ease: 'power3',
            })
            let yTo = gsap.quickTo('.ball_gsap', 'y', {
                duration: 0.4,
                ease: 'power3',
            })
            
            let scaleTo = gsap.quickTo('.ball_gsap', 'scale', {
                duration: 0.4,
                ease: 'power3',
            })
            let opacityTo = gsap.quickTo('.ball_gsap', 'opacity', {
                duration: 0.4,
                ease: 'power3',
            })
            window.addEventListener("mousemove", e => {
                xTo(e.clientX);
                yTo(e.clientY);
                gsap.to('.ball_gsap', {
                    keyframes: {
                        scale: [1, 0.6, 1],
                    },
                    duration: 0.4,
                });
            });
            window.addEventListener("mouseenter", e => {
                scaleTo(1);
                opacityTo(1);
            });
            window.addEventListener("mouseleave", e => {
                scaleTo(0);
                opacityTo(0);
            });

            self.add('viewPoint', () => {

            })
        });

        return () => ctx.revert();
    }, []);
    return <>
        <div className='relative cursor-none'>
            {children}
        </div>
        <style >
            {`
                .ball_gsap {
                    transform: translate(-50%, -50%);
                    pointer-events: none;
                    z-index: 100;
                    mix-blend-mode: difference;
                }
            `}
        </style>
        <div className='ball_gsap fixed top-0 left-0 w-14 h-14 rounded-full border-4 border-primary-500 bg-white-300/5 backdrop-blur-xs'></div>
    </>;
}

export default Cursor;