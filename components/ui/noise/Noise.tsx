
import Style from './Noise.module.scss';
import { twMerge } from 'tailwind-merge';

const Noise = ({ position = 'fixed'}: { position?: 'fixed' | 'absolute'}) => {
    return <div className={twMerge(Style['bg'], position == 'fixed' ? 'fixed -top-1/2 -left-1/2 -bottom-1/2 -right-1/2 w-[200%] h-[200vh] visible z-bg' : 'absolute overflow-hidden -left-1/2 -top-1/2 w-[200%] h-[200%] overflow-none z-50')} ></div>
}

export default Noise;