import { FC } from 'react';
import { twMerge } from 'tailwind-merge';
import { DisplayPropsExtended } from './Typography.type';
import { textColorDegree, displayStyle } from './Typography.style'
import Style from './Typography.module.scss';

const Display: FC<DisplayPropsExtended> = ({ size, weight, exchange, children, className, ...props }) => {
    
    return <h1
        {...{
            className: twMerge(
                displayStyle({
                    weight
                }),
                textColorDegree[exchange ? 'exchanged' : 'normal']['1'],
                Style[`display_${size}`],
                Style['display'],
                className,
            ),
            ...props
        }}
    >{children}</h1>
}

export default Display;