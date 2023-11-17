
import Style from './Noise.module.scss';
import { twMerge } from 'tailwind-merge';

const Noise = ({ position = 'fixed', className = 'opacity-90' }: { position?: 'fixed' | 'absolute', className?: string }) => {
    return <>
        <span className={twMerge(
            Style['bg'],
            className || 'opacity-90',
            '-top-1/2 -left-1/2 -bottom-1/2 -right-1/2',
            position == 'fixed'
                ? 'fixed w-[300vw] h-[300vh] visible z-bg'
                : 'absolute w-[200%] h-[200%] overflow-none z-50'
        )}
        >
        </span>
    </>
}

export default Noise;