import React from 'react';
import Icons, { IconNames, IconProps as DefaultIconProps } from './IconsList';

interface IconProps extends React.SVGAttributes<SVGElement>, DefaultIconProps {
    name: IconNames;
    className?: string;
}

const Icon: React.FC<IconProps> = ({ size, name, className, ...props }) => {
    const IconComponent = Icons[name];

    if (!IconComponent) {
        console.warn(`Icon with name ${name} does not exist.`);
        return null;
    }

    const iconProps = {
        width: size,
        height: size,
        className,
        ...props
    };

    return <IconComponent {...iconProps} />;
}

export default React.memo(Icon);