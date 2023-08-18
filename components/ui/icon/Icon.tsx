

import Icons, { IconNames, IconProps as DefaultIconProps } from './IconsList';
import { SVGAttributes } from 'react';

export interface IconProps extends SVGAttributes<SVGElement>, DefaultIconProps {
    name: IconNames;
    className?: string;
}

const Icon = ({ size, name, ...props }: IconProps) => {
    return !!Icons[name] && Icons[name]({ width: size, height: size, ...props })
}

export default Icon