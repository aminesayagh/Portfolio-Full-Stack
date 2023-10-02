import { useRef, useState } from 'react';
import { gsap } from '@/utils/gsap';
import { twMerge } from 'tailwind-merge';
import { useIsomorphicLayoutEffect } from 'react-use';

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
                    duration: 0.3
                }
            })
            timeline.to('.item-child-grap', {
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
                setOnHoverStart(true);
                timeline?.play().then(() => setOnHoverStart(false));
            });
            ref.current?.addEventListener('pointerleave', () => {
                console.log('exit');
                if (onHoverEnd) return;
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
    return <div className='relative min-h-[12px]' ref={ref}>
        <div className='item-child-grap'>
            {children}
        </div>
    </div>
}

export default Item;