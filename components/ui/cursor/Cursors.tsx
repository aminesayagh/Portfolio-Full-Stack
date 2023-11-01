
import { useEffect, useRef, MutableRefObject, useState } from 'react';
import { twMerge } from 'tailwind-merge';
import _ from 'lodash';
import { useIsomorphicLayoutEffect } from 'react-use';

import { Text, Icon, IconNames } from '@/components/ui';
import { gsap } from '@/utils/gsap';
import { ItemCursorPropsByComponent } from './CursorType';

const CursorScroll = ({ isActive, ctx, title }: {
    ctx: MutableRefObject<gsap.Context | undefined>,
    isActive: boolean,
} & Partial<ItemCursorPropsByComponent['CursorScroll']>) => {
    const ref = useRef<HTMLDivElement>(null);

    useIsomorphicLayoutEffect(() => {
        const ctx = gsap.context(() => {
            gsap.set('.cursor_scroll_gsap', {
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
    useIsomorphicLayoutEffect(() => {
        ctx.current?.cursorScroll(isActive);
    }, [isActive]);

    return (
        <span ref={ref} >
            <div className={twMerge('w-32 h-32 bg-white-100 cursor_scroll_gsap', 'rounded-full', 'flex-col justify-center items-center will-change-transform-animation')}>
                <Text p size='sm' exchange degree='1' className='cursor_text_gsap'>{title ? title : 'scroll'}</Text>
            </div>
        </span>
    )
}

const CursorActionIcon = ({ isActive, ctx, iconName, degree = 45 }: {
    isActive: boolean,
    ctx: MutableRefObject<gsap.Context | undefined>
} & Partial<ItemCursorPropsByComponent['CursorActionIcon']>) => {
    const ref = useRef<HTMLDivElement>(null);
    const [icon, setIcon] = useState<string | undefined>(undefined);
    useEffect(() => {
        if (!!iconName) {
            setIcon(iconName);
        }
    }, [iconName]);

    useIsomorphicLayoutEffect(() => {
        let ctx = gsap.context((self) => {
            gsap.set('.cursor_action_icon_gsap', {
                scale: 0,
                display: 'none',
            });
            gsap.set('.cursorIconGsap', {
                rotate: 45,
                opacity: 0,
            });
        }, ref);
        return () => ctx.revert();
    }, [ctx, ref]);

    useIsomorphicLayoutEffect(() => {
        ctx.current?.cursorActionIcon(isActive, degree);
        if (!isActive) {
            const idTimeout = setTimeout(() => {
                setIcon(undefined);
            }, 1000);
            return () => clearTimeout(idTimeout);
        }
    }, [isActive, ctx, degree]);

    return <span ref={ref} >
        <div className={twMerge('w-28 h-28', 'rounded-full', 'flex-col justify-center items-center cursor_action_icon_gsap will-change-transform-animation')}>
            <span className='cursorIconGsap'>
                {icon ? <Icon name={icon as IconNames} size='30' color='var(--color-black-100)' /> : null}
            </span>
        </div>
    </span>
}

const CursorEvent = ({ isActive, ctx, event }: {
    isActive: boolean,
    ctx: MutableRefObject<gsap.Context | undefined>,
} & Partial<ItemCursorPropsByComponent['CursorEvent']>) => {
    useIsomorphicLayoutEffect(() => {
        ctx.current?.CursorEvent(isActive, event);
    }, [ctx, isActive, event]);
    return <span></span>
}


const Cursors = { CursorScroll, CursorActionIcon, CursorEvent } as const;
export default Cursors;

export const CursorsArray = Object.keys(Cursors) as (keyof typeof Cursors)[];