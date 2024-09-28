import React, { SVGAttributes, memo } from "react";

import Icons, { IconNames, IconProps as DefaultIconProps } from "./IconsList";

interface IconProps extends SVGAttributes<SVGElement>, DefaultIconProps {
  name: IconNames;
  className?: string;
}

const Icon: React.FC<IconProps> = ({
  size,
  name,
  className,
  ...props
}: IconProps) => {
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
};

const MemoizedIcon = memo(Icon);
export default MemoizedIcon;
