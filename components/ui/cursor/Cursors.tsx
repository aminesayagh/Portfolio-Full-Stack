
import { Text } from '@/components/ui';
import { useEffect, useRef, useState } from 'react';
import { gsap } from '@/utils/gsap';
import { twMerge } from 'tailwind-merge';

const CursorScroll = ({ isActive, tl, title }: {
    isActive: boolean,
    tl: gsap.core.Timeline | undefined | null,
    title?: string
}) => {
    const ref = useRef<HTMLDivElement>(null);
    useEffect(() => {
        const ctx = gsap.context((self) => {
            gsap.set(ref.current, {
                scale: 0,
            });
            gsap.set('.cursor_text_gsap', {
                rotate: -45,
                opacity: 0,
            });
            if(!!tl) {
                tl.fromTo(ref.current, {
                    scale: 0,
                    ease: 'Power4.easeOut',
                    backgroundColor: 'transparent'
                }, {
                    duration: 0.3,
                    scale: 1,
                    backgroundColor: '#fff',
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
            }
        });
        return () => ctx.revert();
    }, [tl, ref])
    useEffect(() => {
        if (!!tl) {
                if (isActive) {
                    tl.play()
                } else {
                    console.log('reverse');
                    tl.reverse();
                }

        }
    }, [isActive, tl]);

    return (
        <div ref={ref} className={twMerge('w-32 h-32', 'rounded-full', 'flex flex-col justify-center items-center')}>
            <Text p size='sm' exchange degree='1' className='cursor_text_gsap'>{title ? title : 'scroll'}</Text>
        </div>
    )
}

export type TCursor = keyof typeof Cursors;

const Cursors = { CursorScroll }
export default Cursors;

export const CursorsArray = Object.keys(Cursors) as TCursor[];