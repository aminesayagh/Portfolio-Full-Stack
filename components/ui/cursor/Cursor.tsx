import React, { useEffect, useRef, useState, createContext, useContext, useMemo, useCallback, useLayoutEffect } from 'react';

import { gsap } from '@/utils/gsap';
import { useHover } from 'react-aria';
import { twMerge } from 'tailwind-merge';
import Cursors,{ CursorsArray } from './Cursors';

type TContent = ({ isAnimated }: { isAnimated: boolean; }) => JSX.Element;
const cursorContext = createContext<{
    addCursor?: (item: ItemCursor) => void,
    setKey?: (key: TCursor | null) => void,
}>({});


import { TCursor } from './Cursors';
export const CursorContent = ({ children, name }: {
    children: React.ReactElement,
    name: TCursor
}) => {
    const { addCursor, setKey } = useContext(cursorContext);
    const { isHovered, hoverProps } = useHover({});

    useEffect(() => {
        addCursor && addCursor({
            key: name,
        })
    }, [])

    useEffect(() => {
        console.log(isHovered, name);
        if (isHovered) {
            setKey && setKey(name);
        } else {
            setKey && setKey(null);
        }
    }, [isHovered, name, setKey])

    return React.cloneElement(children, { ...hoverProps })
}

type ItemCursor = {
    key: TCursor
}

const DEFAULT_BALL_CLASS_NAME = ['fixed rounded-full pointer-events-none cursor-none', 'top-0 left-0']
const Cursor = ({ children }: { children: React.ReactElement }) => {
    const ref = useRef<HTMLDivElement>(null);
    const secondaryCursor = useRef<HTMLDivElement>(null);

    const list = useRef<ItemCursor[]>([]);

    const addCursor = useCallback(({
        key
    }: ItemCursor) => {
        list.current.push({
            key
        });
    }, []);

    const [isHovered, setIsHovered] = useState<boolean>(false);
    const [isAnimated, setIsAnimated] = useState<boolean>(false);
    const [key, setKey] = useState<TCursor | null>(null);

    const [tl, setTl] = useState<gsap.core.Timeline>();

    useLayoutEffect(() => {
        const ctx = gsap.context(() => {
            const tl = gsap.timeline({
                paused: true,
            });
            tl.to('.ball_main_gsap', {
                duration: 0.3,
                scale: 0,
                ease: 'Power4.easeOut',
            }, 0).to('.ball_secondary_gsap', {
                duration: 0.2,
                scale: 0,
                ease: 'Power4.easeOut',
            }).to('.ball_inner_top', {
                duration: 0.1,
                scale: 1,
                backgroundColor: '#FEFEFE',
                ease: 'Power4.easeOut',
            }, 0.2);

            setTl(tl);
        });
        return () => ctx.revert();
    }, [])

    useEffect(() => {
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
    }, []);

    // useEffect(() => {
    //     if (!!key) {
    //         tl?.play();
    //     } else {
    //         tl?.reverse();
    //     }
    // }, [key, tl])
    const blend = useMemo(() => isHovered ? '' : 'mix-blend-difference', [isHovered])
    
    return <>
        <span ref={ref}>
            <cursorContext.Provider value={{
                addCursor, setKey
            }}>
                <span className='cursor_container relative' >
                    {children}
                </span>
                <div className={twMerge(DEFAULT_BALL_CLASS_NAME, blend, 'ball_gsap ball_secondary_gsap pointer-events-none', 'h-6 w-6', 'bg-primary-600/80')} ref={secondaryCursor} ></div>
                <div className={twMerge(DEFAULT_BALL_CLASS_NAME, blend, 'ball_gsap ball_main_gsap', 'w-14 h-14', 'border-2 border-primary-500 bg-white-300/5 backdrop-blur-xs')}></div>
                <div className={twMerge(DEFAULT_BALL_CLASS_NAME, blend, 'ball_gsap ball_inner_top', 'scale-0 ', 'h-32 w-32 p-10', 'flex justify-center items-center uppercase')}>
                    {CursorsArray.map((item, index) => {
                        return <span key={item}>
                            {Cursors[item]({ tl, isActive: item == key })}
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
                    // transform: translate(-50%, -50%);
                    ${!isAnimated ? 'mix-blend-mode: difference;' : ''}
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