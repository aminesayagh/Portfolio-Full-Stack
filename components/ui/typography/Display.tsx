import { FC, useMemo } from 'react';
import { twMerge } from 'tailwind-merge';
import { DisplayPropsExtended } from './Typography.type';
import { textColorDegree, displayStyle } from './Typography.style'
import Style from './Typography.module.scss';

const Display: FC<DisplayPropsExtended> = ({ size, weight, exchange, children, className, ...props }) => {
    const classes = useMemo(() => {
        return twMerge(
            displayStyle({
                weight
            }),
            textColorDegree[exchange ? 'exchanged' : 'normal']['1'],
            size && Style[`display_${size}`],
            Style['display'],
            className
        );
    }, [size, weight, exchange, className]);
    
    return <h1
        {...{
            className: classes,
            ...props
        }}
    >{children}</h1>
}

export default Display;