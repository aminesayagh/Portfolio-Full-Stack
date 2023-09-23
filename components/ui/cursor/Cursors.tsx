
import { Text, Icon, IconNames } from '@/components/ui';
import { useEffect, useRef, useState, useMemo } from 'react';
import { gsap } from '@/utils/gsap';
import { twMerge } from 'tailwind-merge';
import _ from 'lodash';

const CursorScroll = ({ isActive, tl, title }: {
    isActive: boolean,
    tl: () => gsap.core.Timeline,
    title?: string
}) => {
    const ref = useRef<HTMLDivElement>(null);
    let timelineCursor = useRef<gsap.core.Timeline | null>(null);
    useEffect(() => {
        const ctx = gsap.context(() => {
            gsap.set(ref.current, {
                scale: 0,
                display: 'none',
            });
            gsap.set('.cursor_text_gsap', {
                rotate: -45,
                opacity: 0,
            });
            timelineCursor.current = tl();
            timelineCursor.current?.to(ref.current, {
                duration: 0.1,
                display: 'flex',
            }).fromTo(ref.current, {
                scale: 0,
                ease: 'Power4.easeOut',
                backgroundColor: 'transparent'
            }, {
                duration: 0.3,
                scale: 1,
                backgroundColor: '#F1F1F1',
                ease: 'Power4.easeOut',
            }, '>').fromTo('.cursor_text_gsap', {
                rotate: -45,
                opacity: 0,
            }, {
                opacity: 1,
                duration: 0.3,
                ease: 'Expo.easeOut',
                rotate: 0,
            }, '-=0.2');

        }, ref);
        return () => ctx.revert();
    }, [tl, ref, timelineCursor.current]);
    useEffect(() => {
        let ctx = gsap.context(() => {
            console.log('scroll', timelineCursor.current?.getChildren());
            if (!timelineCursor.current) return;
            if (isActive) {
                timelineCursor.current?.play()
            } else {
                timelineCursor.current?.reverse();
            }
        }, ref);
        return () => ctx.revert();
    }, [isActive, timelineCursor.current, tl]);

    return (
        <div ref={ref} className={twMerge('w-32 h-32', 'rounded-full', 'flex-col justify-center items-center')}>
            <Text p size='sm' exchange degree='1' className='cursor_text_gsap'>{title ? title : 'scroll'}</Text>
        </div>
    )
}

const CursorActionIcon = ({ isActive, tl, iconName }: {
    isActive: boolean,
    tl: () => gsap.core.Timeline | undefined | null,
    iconName?: IconNames,
    degree?: number,
}) => {
    const ref = useRef<HTMLDivElement>(null);
    let timelineCursor = useRef<gsap.core.Timeline | null | undefined>(null);
    console.log('icon', iconName);
    useEffect(() => {
        let ctx = gsap.context((self) => {
            gsap.set(ref.current, {
                scale: 0,
                display: 'none',
            });
            gsap.set('.cursorIconGsap', {
                rotate: 0,
                opacity: 0,
            });
            if(!tl) return;
            timelineCursor.current = tl();
            timelineCursor.current?.to(ref.current, {
                duration: 0.1,
                display: 'flex',
            }).fromTo(ref.current, {
                scale: 0,
                ease: 'Power4.easeOut',
                backgroundColor: 'transparent'
            }, {
                duration: 0.3,
                scale: 1,
                backgroundColor: '#000',
                ease: 'Power4.easeOut',
            }, '>').fromTo('.cursorIconGsap', {
                rotate: 0,
                opacity: 0,
            }, {
                opacity: 1,
                duration: 0.3,
                ease: 'Expo.easeOut',
                rotate: 45,
            }, '-=0.2');

        }, ref);
        return () => ctx.revert();
    }, [tl,ref, timelineCursor.current]);
    useEffect(() => {
        if (!!tl) {
            if (isActive) {
                timelineCursor.current?.play()
            } else {

                timelineCursor.current?.reverse();
            }
        }
    }, [isActive, timelineCursor.current, tl]);
    return <div ref={ref} className={twMerge('w-32 h-32', 'rounded-full', 'flex-col justify-center items-center')}>
        {iconName ? <Icon name={iconName} className='cursorIconGsap' size='20' color='#111517' /> : null}
    </div>
}

export type TCursor = keyof typeof Cursors;

const Cursors = { CursorScroll, CursorActionIcon };
export default Cursors;

export const CursorsArray = Object.keys(Cursors) as TCursor[];