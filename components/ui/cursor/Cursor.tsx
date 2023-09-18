import React, { useEffect, useRef } from 'react';
import { twMerge } from 'tailwind-merge';
import { gsap } from '@/utils/gsap';

const Cursor = ({ children }: { children: React.ReactElement }) => {
    const secondaryCursor = useRef<HTMLDivElement>(null);
    const positionRef = useRef({
        mouseX: 0,
        mouseY: 0,
        destinationX: 0,
        destinationY: 0,
        distanceX: 0,
        distanceY: 0,
        key: -1,
    })
    useEffect(() => {
        const ctx = gsap.context((self) => {
            gsap.set('.ball_gsap', {
                xPercent: -50,
                yPercent: -50,
            });
            gsap.set('.ball_secondary_gsap', {
                xPercent: -50,
                yPercent: -50,
            });
            let xTo = gsap.quickTo('.ball_gsap', 'x', {
                duration: 0.5,
                ease: 'Elastic.easeOut',
            })
            let yTo = gsap.quickTo('.ball_gsap', 'y', {
                duration: 0.5,
                ease: 'Elastic.easeOut',
            })
            let xToSecondary = gsap.quickTo('.ball_secondary_gsap', 'x', {
                duration: 0.3,
                ease: 'Power4.easeOut',
            })
            let yToSecondary = gsap.quickTo('.ball_secondary_gsap', 'y', {
                duration: 0.3,
                ease: 'Power4.easeOut',
            })
            
            window.addEventListener("mousemove", e => {
                positionRef.current.mouseX = e.clientX - (secondaryCursor.current?.clientWidth || 0) / 2;
                positionRef.current.mouseY = e.clientY - (secondaryCursor.current?.clientHeight || 0) / 2;

                xTo(e.clientX);
                yTo(e.clientY);

                xToSecondary(e.clientX);
                yToSecondary(e.clientY);

            });
            return () => {
                window.removeEventListener("mousemove", e => {
                    xTo(e.clientX);
                    yTo(e.clientY);
                });
            }
        });

        return () => ctx.revert();
    }, []);
    return <>
        <div className='cursor_container relative'>
            {children}
        </div>
        <style >
            {`
                .cursor_container {
                    cursor: default;
                }
                @media (hover: hover) {
                    .cursor_container {
                        cursor: none;
                    }
                    
                }
                .ball_gsap {
                    transform: translate(-50%, -50%);
                    pointer-events: none;
                    z-index: 99999999999;
                    mix-blend-mode: difference;
                }
                .ball_gsap {
                    display: none;
                }
                @media (hover: hover) {
                    .ball_gsap {
                        display: flex;
                    }
                }
                .ball_main_gsap {
                    z-index: 99999999999;
                }
                .ball_secondary_gsap {
                    z-index: 999999999999;
                }
            `}
        </style>
        <div className='ball_gsap ball_secondary_gsap h-6 w-6 bg-primary-600/80 fixed top-0 left-0 rounded-full' ref={secondaryCursor} ></div>
        <div className='ball_gsap ball_main_gsap fixed top-0 left-0 w-14 h-14 rounded-full border-2 border-primary-500 bg-white-300/5 backdrop-blur-xs'></div>
    </>;
}

export default Cursor;