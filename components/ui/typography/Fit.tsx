import { useState, useEffect } from 'react';
import { ReactFitty } from 'react-fitty';
import { twMerge } from 'tailwind-merge';
import { ReactFitProps } from './Typography.type';
import Style from './Typography.module.scss';
import { displayStyle, textColorDegree } from './Typography.style';

const Fit = ({ children, className, exchange, weight, ...props }: ReactFitProps) => {
    const [isClient, setIsClient] = useState(false);
    useEffect(() => {
        setIsClient(true);
    }, []);
    if (isClient === false) {
        return <div className={twMerge(
            displayStyle({
                weight
            }),
            'leading-none hidden',
            Style['fit'],
            textColorDegree[exchange ? 'exchanged' : 'normal']['1'],
            className)} {...props}>
            {children}
        </div>
    }
    return <ReactFitty className={twMerge(
        displayStyle({
            weight
        }),
        'leading-none',
        Style['fit'],
        textColorDegree[exchange ? 'exchanged' : 'normal']['1'],
        className
    )} {...props}>
        {children}
    </ReactFitty>

}

export default Fit;