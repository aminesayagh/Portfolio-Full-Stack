

import { twMerge } from 'tailwind-merge';
import { useIsomorphicLayoutEffect } from 'react-use';
import { gsap } from '@/utils/gsap';
import { useState } from 'react';

const Noise = ({ position = 'fixed', className = 'opacity-90' }: { position?: 'fixed' | 'absolute', className?: string }) => {
    const [img, setImg] = useState<string>('url("/images/noise-transparent.png")');

    useIsomorphicLayoutEffect(() => {
        const ctx = gsap.context(() => {
            const DURATION = 2.4;
            gsap.to('.bg-noise', {
                keyframes: [
                    { x: '0', y: '0' },
                    { x: '-5%', y: '-5%' },
                    { x: '-10%', y: '5%' },
                    { x: '5%', y: '-10%' },
                    { x: '-5%', y: '15%' },
                    { x: '-10%', y: '5%' },
                    { x: '15%', y: '0' },
                    { x: '0', y: '10%' },
                    { x: '-15%', y: '0' },
                    { x: '10%', y: '5%' },
                    { x: '5%', y: '0' },
                ],
                duration: DURATION,
                ease: 'none',
                repeat: -1,
                yoyo: true,
                repeatRefresh: true,
                repeatDelay: 0,
             })

        })
        return () => {
            ctx.revert();
        }
    })
    return <>
        <span className={twMerge(
            'bg-noise',
            className || 'opacity-90',
            '-top-1/2 -left-1/2 -bottom-1/2 -right-1/2 bg-repeat',
            'will-change-transform-animation',
            position == 'fixed'
                ? 'fixed w-[300vw] h-[300vh] visible z-bg'
                : 'absolute w-[200%] h-[200%] overflow-none z-50'
        )}
        style={{
            backgroundImage: img
        }}
        >
        </span>
        <style jsx>{`
            .bg-noise {
                background-position: center;
                background-repeat: repeat;
            }
        `}</style>
    </>
}

export default Noise;