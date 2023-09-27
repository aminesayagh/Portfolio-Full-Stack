import React, { useEffect, useRef, useState, createContext, useContext, useMemo, useCallback } from 'react';

import { gsap } from '@/utils/gsap';
import { twMerge } from 'tailwind-merge';
import Cursors, { CursorsArray } from './Cursors';
import { ItemCursor, CursorNames } from './CursorType';
import { useIsomorphicLayoutEffect } from 'react-use';

export const cursorContext = createContext<{
    addCursor?: (item: ItemCursor<'CursorScroll'>) => void,
    setKey?: (key: string | null) => void,
}>({});

const DEFAULT_BALL_CLASS_NAME = ['fixed rounded-full pointer-events-none cursor-none', 'top-0 left-0']
const Cursor = ({ children }: { children: React.ReactElement }) => {
    const ref = useRef<HTMLDivElement>(null);
    const secondaryCursor = useRef<HTMLDivElement>(null);

    const list = useRef<ItemCursor[]>([]);

    const addCursor = useCallback(({
        ...props
    }: ItemCursor) => {
        list.current.push({
            ...props
        });
    }, []);

    const [key, setKey] = useState<string | null>(null);
    let ctx = useRef<gsap.Context>();

    useIsomorphicLayoutEffect(() => {
        ctx.current = gsap.context((context) => {
            let timeline = () => {
                let tl = gsap.timeline({
                    paused: true,
                });
                return tl.to('.ball_main_gsap', {
                    duration: 0.3,
                    scale: 0,
                    ease: 'Power4.easeOut',
                }, 0).fromTo('.ball_secondary_gsap', {
                    scale: 1
                }, {
                    duration: 0.2,
                    scale: 0,
                    ease: 'Power4.easeOut',
                }).to('.ball_inner_top', {
                    duration: 0.1,
                    scale: 1,
                    ease: 'Power4.easeOut',
                }, 0.2);
            }
            let cursorScrollTimeline = timeline().to('.cursor_scroll_gsap', {
                duration: 0.1,
                display: 'flex',
            }).fromTo('.cursor_scroll_gsap', {
                scale: 0,
                ease: 'Power4.easeOut',
                backgroundColor: 'transparent',
            }, {
                duration: 0.3,
                scale: 1,
                backgroundColor: '#F1F1F1',
                ease: 'Power4.easeOut',
            }, '>').fromTo('.cursor_scroll_gsap .cursor_text_gsap', {
                rotate: -45,
                opacity: 0,
            }, {
                opacity: 1,
                duration: 0.3,
                ease: 'Expo.easeOut',
                rotate: 0,
            }, '-=0.2');

            let cursorActionIconTimeline = timeline().to('.cursor_action_icon_gsap', {
                duration: 0.1,
                display: 'flex',
            }).fromTo('.cursor_action_icon_gsap', {
                scale: 0,
                backgroundColor: 'transparent',
            }, {
                duration: 0.3,
                scale: 1,
                backgroundColor: '#F1F1F1',
                ease: 'Power4.easeOut',
            }, '>').fromTo('.cursor_action_icon_gsap .cursorIconGsap', {
                rotate: 45,
                opacity: 0,
            }, {
                opacity: 1,
                duration: 0.6,
                ease: 'Expo.easeOut',
                rotate: 0,
            });

            let scaleTo = gsap.quickTo('.ball_secondary_gsap', 'scale', {
                duration: 0.6,
                ease: 'Elastic.easeOut',
            })

            context.add('cursorScroll', (isActive: boolean) => {
                if (isActive) {
                    cursorScrollTimeline.play();
                } else {
                    cursorScrollTimeline.reverse();
                }
            });
            context.add('cursorActionIcon', (isActive: boolean, degree: number) => {
                if (isActive) {
                    cursorActionIconTimeline.play();
                } else {
                    cursorActionIconTimeline.reverse();
                }
            });

            let timelineBallEventPointer = gsap.timeline({
                paused: true,
            }).fromTo('.ball_secondary_gsap', {
                scale: 1,
            },{
                duration: 0.6,
                scale: 0,
                ease: 'Power4.easeOut',
            }).fromTo('.ball_main_gsap', {
                scale: 1,
            },{
                duration: 0.6,
                scale: 1.3,
                ease: 'Power4.easeOut',
            }, '<');
            context.add('CursorEvent', (isActive: boolean, event: 'pointer' | 'disabled') => {
                if (isActive) {
                    timelineBallEventPointer.play();
                } else {
                    timelineBallEventPointer.reverse();
                }
            });
            return () => {
                cursorScrollTimeline.kill();
                cursorActionIconTimeline.kill();
            }
        });
        return () => ctx.current?.revert();
    }, []);




    // default ball animation
    useIsomorphicLayoutEffect(() => {
        const ctx = gsap.context(() => {
            // set initial position
            gsap.set(['.ball_main_gsap', '.ball_secondary_gsap', '.ball_inner_top'], {
                xPercent: -50,
                yPercent: -50,
            });
            gsap.set(['.ball_main_gsap', '.ball_secondary_gsap', '.ball_secondary_gsap'], {
                opacity: 0,
                scale: 0
            });
            // mouse move quick to
            let xTo = gsap.quickTo('.ball_main_gsap', 'x', {
                duration: 0.6,
                ease: 'Elastic.easeOut',
            })
            let yTo = gsap.quickTo('.ball_main_gsap', 'y', {
                duration: 0.6,
                ease: 'Elastic.easeOut',
            })
            
            let xToSecondary = gsap.quickTo(['.ball_secondary_gsap', '.ball_inner_top'], 'x', {
                duration: 0.3,
                ease: 'Power4.easeOut',
            })
            let yToSecondary = gsap.quickTo(['.ball_secondary_gsap', '.ball_inner_top'], 'y', {
                duration: 0.3,
                ease: 'Power4.easeOut',
            })
            let opacityTo = gsap.quickTo(['.ball_secondary_gsap', '.ball_main_gsap'], 'opacity', {
                duration: 0.3,
                scale: 1,
                ease: 'Power4.easeOut',
            })


            ref.current?.addEventListener("mouseenter", e => {
                opacityTo(1);
            });
            ref.current?.addEventListener("mouseleave", e => {
                opacityTo(0);
            });

            ref.current?.addEventListener("mousemove", e => {
                xTo(e.clientX);
                yTo(e.clientY);

                xToSecondary(e.clientX);
                yToSecondary(e.clientY);
            });
            return () => {
                ref.current?.removeEventListener("mouseenter", e => {
                    opacityTo(0);
                });
                ref.current?.removeEventListener("mouseleave", e => {
                    opacityTo(0);
                });
                ref.current?.removeEventListener("mousemove", e => {
                    xTo(0);
                    yTo(0);
                    xToSecondary(0);
                    yToSecondary(0);
                });
            }
        }, ref);

        return () => ctx.revert();
    }, [ref]);

    const blend = useMemo(() => typeof key == 'string' ? '' : 'mix-blend-difference', [key])
    const currentCursor = useMemo(() => list.current.find(item => item.name == key), [key]);
    
    return <>
        <span ref={ref}>
            <cursorContext.Provider value={{
                addCursor, setKey
            }}>
                <span className='cursor_container relative' >
                    {children}
                </span>
                <div className={twMerge(
                    DEFAULT_BALL_CLASS_NAME, 
                    blend,
                    'ball_gsap ball_secondary_gsap pointer-events-none',
                    'h-4 sm:h-6 w-4 sm:w-6',
                    'bg-primary-600/80')} ref={secondaryCursor} ></div>
                <div className={twMerge(
                    DEFAULT_BALL_CLASS_NAME, 
                    blend,
                    'ball_gsap ball_main_gsap',
                    'w-10 sm:w-14 h-10 sm:h-14',
                    'border-2 border-primary-500 bg-white-300/5 backdrop-blur-xs')}></div>
                <div className={twMerge(
                    DEFAULT_BALL_CLASS_NAME, 
                    blend,
                    'ball_gsap ball_inner_top',
                    'w-full', 'flex justify-center items-center uppercase')}>
                    {CursorsArray.map((item, index) => {
                        const isActive = item == currentCursor?.component;
                        let otherProps = {};
                        if (isActive) {
                            otherProps = currentCursor?.props;
                        }
                        return <span key={item}>
                            {Cursors[item]({ ctx, isActive, ...otherProps })}
                        </span>
                    })}
                </div>
            </cursorContext.Provider>
        </span>
        <style >
            {`
                .cursor_container {
                    cursor: default;
                }
                .ball_gsap {
                    display: none;
                }
                @media (hover: hover) {
                    .cursor_container {
                        cursor: none;
                    }
                    .ball_gsap{
                        display: black;
                    }
                }
                @media (prefers-reduced-motion) {
                    .ball_gsap {
                        display: none;
                    }
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
                    z-index: 9999999999999;
                }
            `}
        </style>
    </>;
}

export default Cursor;