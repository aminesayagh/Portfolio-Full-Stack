
import Style from './Noise.module.scss';
import { twMerge } from 'tailwind-merge';
import { useIsomorphicLayoutEffect } from 'react-use';
import { gsap } from '@/utils/gsap';
const Noise = ({ position = 'fixed', className = 'opacity-90' }: { position?: 'fixed' | 'absolute', className?: string }) => {
    useIsomorphicLayoutEffect(() => {
        const ctx = gsap.context(() => {
            const bgAnimation = gsap.timeline({ defaults: { duration: 0.2, ease: "sine.inOut" }, repeat: -1 });
            bgAnimation
                .to('.bg-noise', { x: '-5%', y: '-5%' })
                .to('.bg-noise', { x: '-10%', y: '5%' }, '+=0.2')
                .to('.bg-noise', { x: '5%', y: '-10%' }, '+=0.2')
                .to('.bg-noise', { x: '-5%', y: '15%' }, '+=0.2')
                .to('.bg-noise', { x: '-10%', y: '5%' }, '+=0.2')
                .to('.bg-noise', { x: '15%', y: '0' }, '+=0.2')
                .to('.bg-noise', { x: '0', y: '10%' }, '+=0.2')
                .to('.bg-noise', { x: '-15%', y: '0' }, '+=0.2')
                .to('.bg-noise', { x: '10%', y: '5%' }, '+=0.2')
                .to('.bg-noise', { x: '5%', y: '0' }, '+=0.2');

            return () => {
                // bgAnimation.kill();
            }
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
            position == 'fixed'
                ? 'fixed w-[300vw] h-[300vh] visible z-bg'
                : 'absolute w-[200%] h-[200%] overflow-none z-50'
        )}
            style={{
                backgroundImage: 'url(/images/noise-transparent.png)',
                backgroundPosition: 'center',
                backgroundRepeat: 'repeat',
            }}
        >
        </span>
    </>
}

export default Noise;