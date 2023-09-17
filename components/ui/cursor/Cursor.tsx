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
            let xTo = gsap.quickTo('.ball_gsap', 'x', {
                duration: 0.4,
                ease: 'Back.easeOut',
            })
            let yTo = gsap.quickTo('.ball_gsap', 'y', {
                duration: 0.4,
                ease: 'Back.easeOut',
            })
            
            window.addEventListener("mousemove", e => {
                positionRef.current.mouseX = e.clientX - (secondaryCursor.current?.clientWidth || 0) / 2;
                positionRef.current.mouseY = e.clientY - (secondaryCursor.current?.clientHeight || 0) / 2;

                xTo(e.clientX);
                yTo(e.clientY);
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
    useEffect(() => {
        const followMouse = () => {
            const { 
                mouseX,
                mouseY,
                destinationX,
                destinationY,
                distanceX,
                distanceY,
            } = positionRef.current;
            if(!destinationX || !destinationY) {
                positionRef.current.destinationX = mouseX;
                positionRef.current.destinationY = mouseY;
            }else {
                positionRef.current.distanceX = (mouseX - destinationX) * 0.1;
                positionRef.current.distanceY = (mouseY - destinationY) * 0.1;
    
                if(Math.abs(positionRef.current.distanceX) + Math.abs(positionRef.current.distanceY ) < 0.1) {
                    positionRef.current.destinationX = mouseX;
                    positionRef.current.destinationY = mouseY;
                } else {
                    positionRef.current.destinationX += distanceX;
                    positionRef.current.destinationY += distanceY;
                }

            }


            gsap.to(secondaryCursor.current, {
                duration: 0.3,
                x: positionRef.current.destinationX,
                y: positionRef.current.destinationY,
                ease: 'Back.easeOut',
            })
        }
        window.addEventListener("mousemove", e => {
            followMouse()
        });
    }, [positionRef.current.mouseX, positionRef.current.mouseY])
    return <>
        <div className='relative md:cursor-none'>
            {children}
        </div>
        <style >
            {`
                .ball_gsap, .ball_secondary_gsap {
                    transform: translate(-50%, -50%);
                    pointer-events: none;
                    z-index: 99999999999;
                    mix-blend-mode: difference;
                }
                .ball_gsap {
                    z-index: 99999999999;
                }
                .ball_secondary_gsap {
                    z-index: 999999999999;
                }
            `}
        </style>
        <div className='ball_secondary_gsap hidden md:flex h-6 w-6 bg-primary-600/80 fixed top-0 left-0 rounded-full' ref={secondaryCursor} ></div>
        <div className='ball_gsap hidden md:flex fixed top-0 left-0 w-14 h-14 rounded-full border-2 border-primary-500 bg-white-300/5 backdrop-blur-xs'></div>
    </>;
}

export default Cursor;