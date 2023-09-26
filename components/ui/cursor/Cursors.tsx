
import { Text, Icon, IconNames } from '@/components/ui';
import { useEffect, useRef, useState, useMemo, MutableRefObject } from 'react';
import { gsap } from '@/utils/gsap';
import { twMerge } from 'tailwind-merge';
import _ from 'lodash';

const CursorScroll = ({ isActive, ctx, title }: {
    ctx: MutableRefObject<gsap.Context | undefined>,
    isActive: boolean,
    title?: string
}) => {
    const ref = useRef<HTMLDivElement>(null);

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

        }, ref);

        return () => ctx.revert();
    }, [ctx, ref]);
    useEffect(() => {
        ctx.current?.cursorScroll(isActive);
    }, [isActive, ctx]);

    return (
        <div ref={ref} className={twMerge('w-32 h-32 cursor_scroll_gsap', 'rounded-full', 'flex-col justify-center items-center')}>
            <Text p size='sm' exchange degree='1' className='cursor_text_gsap'>{title ? title : 'scroll'}</Text>
        </div>
    )
}

const CursorActionIcon = ({ isActive, ctx, iconName, degree = 45 }: {
    isActive: boolean,
    ctx: MutableRefObject<gsap.Context | undefined>,
    iconName?: IconNames,
    degree?: number,
}) => {
    const ref = useRef<HTMLDivElement>(null);
    useEffect(() => {
        let ctx = gsap.context((self) => {
            gsap.set(ref.current, {
                scale: 0,
                display: 'none',
            });
            gsap.set('.cursorIconGsap', {
                rotate: 45,
                opacity: 0,
            });
        });
        return () => ctx.revert();
    }, [ctx, ref]);
    useEffect(() => {
        ctx.current?.cursorActionIcon(isActive, degree);
    }, [isActive, ctx]);
    return <div ref={ref} className={twMerge('w-28 h-28', 'rounded-full', 'flex-col justify-center items-center cursor_action_icon_gsap')}>
        <span className='cursorIconGsap'>
            {iconName ? <Icon name={iconName} size='30' color='#111517' /> : null}
        </span>
    </div>
}

export type TCursor = keyof typeof Cursors;

const Cursors = { CursorScroll, CursorActionIcon };
export default Cursors;

export const CursorsArray = Object.keys(Cursors) as TCursor[];