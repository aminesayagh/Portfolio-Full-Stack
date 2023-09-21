import React, { useEffect, useRef, useState, createContext, useContext, useMemo } from 'react';
import { Text } from '@/components/ui';

import { gsap } from '@/utils/gsap';
import { useHover } from 'react-aria';
import { twMerge } from 'tailwind-merge';

type AnimationName = 'whiteText';
const cursorContext = createContext<{
    content: string | null,
    setContent: (content: string | null) => void,
    animation: AnimationName | null,
    setAnimation: (animation: AnimationName | null) => void
}>({
    content: null,
    setContent: () => {},
    animation: null,
    setAnimation: () => {}
})
export const CursorText = ({ children, text, animation }: { children: React.ReactElement, text: string, animation: AnimationName }) => {
    const { content, setContent, setAnimation } = useContext(cursorContext);
    const { isHovered,hoverProps } = useHover({
        onHoverStart: () => {
            console.log('hover start');
            setContent(text);
            setAnimation(animation);
        },
        onHoverEnd: () => {
            if(content === text) {
                setContent(null);
            }
        }
    });
    return React.cloneElement(children, { ...hoverProps })
}
const Cursor = ({ children }: { children: React.ReactElement }) => {
    const ref = useRef<HTMLDivElement>(null);
    const secondaryCursor = useRef<HTMLDivElement>(null);
    const [content, setContent] = useState<string | null>(null);
    const [animation, setAnimation] = useState<AnimationName | null>(null);
    const [isAnimated, setIsAnimated] = useState<boolean>(false);

    const whiteTextTl = useMemo(() => gsap.timeline({
        paused: true,
    }), []);

    // useEffect(() => {
    //     if(!animation) return;
    //     switch(animation) {
    //         case 'whiteText':
    //             if(animation === 'whiteText' && !isAnimated) {
    //                 whiteTextTl.play();
    //                 setIsAnimated(true);
    //             } else {
    //                 whiteTextTl.reverse();
    //                 setIsAnimated(false);
    //             }
    //             break;
    //     }
    // }, [content]);
    useEffect(() => {
        const ctx = gsap.context(() => {
            // set initial position
            gsap.set('.ball_main_gsap', {
                xPercent: -50,
                yPercent: -50,
            });
            gsap.set('.ball_secondary_gsap', {
                xPercent: -50,
                yPercent: -50,
            });
            // mouse move quick to
            let xTo = gsap.quickTo('.ball_main_gsap', 'x', {
                duration: 0.6,
                delay: 0.4,
                ease: 'Elastic.easeOut',
            })
            let yTo = gsap.quickTo('.ball_main_gsap', 'y', {
                duration: 0.6,
                delay: 0.4,
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

            gsap.set('.ball_inner_top', {
                transformOrigin: 'center',
                scale: 0,
            })

            whiteTextTl.to('.ball_main_gsap', {
                duration: 0.3,
                scale: 0,
            }, 0).to('.ball_inner_top', {
                duration: 0.3,
                scale: 1,
                backgroundColor: 'white',
                color: 'black',
            }, 0.2);



            window.addEventListener("mousemove", e => {
                xTo(e.clientX);
                yTo(e.clientY);

                xToSecondary(e.clientX);
                yToSecondary(e.clientY);
            });
            return () => {
                window.removeEventListener("mousemove", e => {
                    xTo(0);
                    yTo(0);
                    xToSecondary(0);
                    yToSecondary(0);
                });
            }
        }, ref);

        return () => ctx.revert();
    }, []);
    return <>
        <span ref={ref}>
            <cursorContext.Provider value={{
                content, setContent,
                animation, setAnimation
            }}>
                <span className='cursor_container relative' >
                    {children}
                </span>
                <div className={twMerge('ball_gsap ball_secondary_gsap h-6 w-6 bg-primary-600/80 fixed top-0 left-0 rounded-full')} ref={secondaryCursor} ></div>
                <div className='ball_gsap ball_main_gsap fixed top-0 left-0 w-14 h-14 rounded-full border-2 border-primary-500 bg-white-300/5 backdrop-blur-xs'></div>
                <div className='ball_gsap ball_inner_top flex flex-col justify-center items-center'>
                    <span>
                        <Text p size='sm' degree='2' >{content}</Text>
                    </span>
                </div>
            </cursorContext.Provider>
        </span>
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
                @media (prefers-reduced-motion) {
                    .ball_gsap {
                        display: none;
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

                .ball_inner_top {
                    position: absolute;
                    scale: 0;
                    border-radius: 50%;
                    left: 50%;
                    top: 50%;
                    opacity: 0;
                    transform-origin: center;
                }
            `}
        </style>
    </>;
}

export default Cursor;