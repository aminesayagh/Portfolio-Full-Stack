import React, { useRef, useState, createContext, ElementRef, useMemo, useCallback, useEffect } from 'react';

import { gsap } from '@/utils/gsap';
import { twMerge } from 'tailwind-merge';
import Cursors, { CursorsArray } from './Cursors';
import { ItemCursor, CursorNames } from './CursorType';
import { useIsomorphicLayoutEffect } from 'react-use';
import { useEventListener } from '@/hook/useEventListener';

export const cursorContext = createContext<{
    addCursor?: (item: ItemCursor<'CursorScroll'>) => void,
    setKey?: (key: string | null) => void,
}>({});

const DEFAULT_BALL_CLASS_NAME = ['fixed rounded-full pointer-events-none cursor-none will-change-transform-animation', 'top-0 left-0 z-cursor'];

const Cursor = ({ children }: { children: React.ReactElement | React.ReactElement[] }) => {
    const ref = useRef<ElementRef<'div'>>(null);

    const list = useRef<ItemCursor[]>([]);
    const [fistRender, setFirstRender] = useState(true);

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
            let cursorScrollTimeline = timeline().fromTo('.cursor_scroll_gsap', {
                display: 'flex',
                scale: 0,
                opacity: 0,
            }, {
                duration: 0.5,
                scale: 1,
                opacity: 1,
                ease: 'Power4.easeOut',
            }, '>').fromTo('.cursor_scroll_gsap .cursor_text_gsap', {
                rotate: -45,
                opacity: 0,
            }, {
                opacity: 1,
                duration: 0.3,
                ease: 'Expo.easeOut',
                rotate: 0,
            });

            let cursorActionIconTimeline = timeline().to('.cursor_action_icon_gsap', {
                duration: 0.1,
                display: 'flex',
            }).fromTo('.cursor_action_icon_gsap', {
                scale: 0,
                opacity: 0,
                // backgroundColor: 'transparent',
            }, {
                duration: 0.4,
                scale: 1,
                opacity: 1,
                // backgroundColor: 'var(--color-white-100)',
                ease: 'Power4.easeOut',
            }, '>').fromTo('.cursor_action_icon_gsap .cursorIconGsap', {
                rotate: 45,
                opacity: 0
            }, {
                duration: 0.5,
                opacity: 1,
                ease: 'Expo.easeOut',
                rotate: 0,
            });

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

            let timelineBallEventPointer =gsap.timeline({
                paused: true,
            }).fromTo('.ball_secondary_gsap', {
                scale: 1,
            }, {
                duration: 0.4,
                scale: 0,
                ease: 'Power4.easeOut',
            }).fromTo('.ball_main_gsap', {
                scale: 1,
                opacity: 1,
            }, {
                duration: 0.4,
                scale: 1.2,
                opacity: 0.8,
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
                timelineBallEventPointer.kill();
            }
        });
        return () => ctx.current?.revert();
    }, []);

    // default ball animation
    const ctxMouseMove = useRef<gsap.Context>();

    useIsomorphicLayoutEffect(() => {
        ctxMouseMove.current = gsap.context((context) => {
            // set initial position
            gsap.set(['.ball_main_gsap', '.ball_secondary_gsap', '.ball_inner_top'], {
                xPercent: -50,
                yPercent: -50,
            });
            

            context.add('xTo', (x: number) => {
                gsap.to('.ball_main_gsap', {
                    duration: 0.6,
                    ease: 'Elastic.easeOut',
                    x
                });
            })
            context.add('yTo', (y: number) => {
                gsap.to('.ball_main_gsap', {
                    duration: 0.6,
                    ease: 'Elastic.easeOut',
                    y
                });
            })
            context.add('xToSecondary', (x: number) => {
                gsap.to(['.ball_secondary_gsap', '.ball_inner_top'], {
                    duration: 0.3,
                    ease: 'Power4.easeOut',
                    x
                });
            })
            context.add('yToSecondary', (y: number) => {
                gsap.to(['.ball_secondary_gsap', '.ball_inner_top'], {
                    duration: 0.3,
                    ease: 'Power4.easeOut',
                    y
                });
            })
            context.add('opacityTo', (opacity: number) => {
                gsap.to(['.ball_main_gsap', '.ball_secondary_gsap'], {
                    duration: 0.3,
                    ease: 'Power4.easeOut',
                    opacity,
                    scale: 1,
                });
            })
        }, ref);

        return () => ctxMouseMove.current?.revert();
    }, [ref])

    const mouseEnterHandler = useCallback(() => {
        ctxMouseMove.current?.opacityTo(1);
    }, [ctxMouseMove]);
    const mouseLeaveHandler = useCallback(() => {
        ctxMouseMove.current?.opacityTo(0);
    }, [ctxMouseMove]);
    const mouseMoveHandler = useCallback((e: MouseEvent) => {
        ctxMouseMove.current?.xTo(e.clientX);
        ctxMouseMove.current?.yTo(e.clientY);

        ctxMouseMove.current?.xToSecondary(e.clientX);
        ctxMouseMove.current?.yToSecondary(e.clientY);
    }, [ctxMouseMove]);
    useEventListener('mouseenter', mouseEnterHandler, ref);
    useEventListener('mouseleave', mouseLeaveHandler, ref);
    useEventListener('mousemove', mouseMoveHandler, ref);
    

    const blend = useMemo(() => typeof key == 'string' ? '' : 'mix-blend-difference', [key])
    const currentCursor = useMemo(() => list.current.find(item => item.name == key), [key]);

    return <>
        <span ref={ref}>
            <cursorContext.Provider value={{
                addCursor, setKey
            }}>
                <div className='cursor_container relative' >
                    {children}
                </div>
                <div className={twMerge(
                    DEFAULT_BALL_CLASS_NAME,
                    blend,
                    'ball_gsap ball_secondary_gsap pointer-events-none',
                    'h-4 sm:h-5 w-4 sm:w-5',
                    'bg-primary-600/80'
                )} ></div>
                <div className={twMerge(
                    DEFAULT_BALL_CLASS_NAME,
                    blend,
                    'ball_gsap ball_main_gsap',
                    'w-10 sm:w-12 h-10 sm:h-12',
                    'border border-primary-500 bg-white-300/5 backdrop-blur-xs')}
                ></div>
                <div className={
                    twMerge(
                        DEFAULT_BALL_CLASS_NAME,
                        blend,
                        'ball_gsap ball_inner_top',
                        'w-full', 'flex justify-center items-center uppercase')
                    }
                >
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