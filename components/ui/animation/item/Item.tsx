import { useRef, useState } from 'react';
import { gsap } from '@/utils/gsap';
import { useIsomorphicLayoutEffect } from 'react-use';
import { CursorContent } from '@/components/ui';

const Item = ({ children }: {
    children: React.ReactElement,
}) => {
    const ref = useRef<HTMLDivElement>(null);
    let [onHoverStart, setOnHoverStart] = useState(false);
    let [onHoverEnd, setOnHoverEnd] = useState(false);
    useIsomorphicLayoutEffect(() => {
        let ctx = gsap.context(() => {
            const timeline = gsap.timeline({
                paused: true,
                defaults: {
                    duration: 0.15
                }
            })
            timeline.fromTo('.item-child-grap', {
                yPercent: 0,
                skewY: 0,
                color: 'var(--color-white-100)',
            }, {
                yPercent: -100,
                skewY: 5,
                color: 'var(--color-white-100)',
                ease: 'power4.easeIn'
            }).fromTo('.item-child-grap', {
                yPercent: 100,
                skewY: 5,
                color: 'var(--color-primary-500)',
            }, {
                yPercent: 0,
                skewY: 0,
                ease: 'power4.easeOut',
                color: 'var(--color-primary-500)',
            }).progress(0)
            gsap.set('.item-child-grap', {
                yPercent: 0,
                skewY: 0,
                color: 'var(--color-white-100)'
            });
            ref.current?.addEventListener('pointerenter', () => {
                if (onHoverStart) return;
                if (onHoverEnd) return;
                setOnHoverStart(true);
                timeline?.play().then(() => setOnHoverStart(false));
            });
            ref.current?.addEventListener('pointerleave', () => {
                if (onHoverEnd) return;
                if (onHoverStart) return;
                setOnHoverEnd(true);
                timeline?.reverse().then(() => setOnHoverEnd(false));
            });
            return () => {
                ref.current?.removeEventListener('mouseenter', () => {
                    timeline?.play();
                });
                ref.current?.removeEventListener('mouseleave', () => {
                    timeline?.reverse();
                });
                timeline?.kill();
            }
        }, ref);
        return () => {
            ctx.revert();
        }
    }, [ref]);
    return <CursorContent name={`cursorPointer_header_email`} component='CursorEvent' props={{
        event: 'pointer',
    }}><div className='overflow-hidden relative' ref={ref}>
            <div className='item-child-grap cursor-pointer'>
                {children}
            </div>
        </div>
    </CursorContent>
}

export default Item;