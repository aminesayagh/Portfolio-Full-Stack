import React, { FC, useMemo } from "react";
import { twMerge } from "tailwind-merge";
import {
  TextNames,
  TextPropsExtended,
  validTextElements,
} from "./Typography.type";
import { textClassNames } from "./Typography.style";

const Text: FC<TextPropsExtended> = ({
  weight,
  degree = "3",
  size,
  exchange,
  className,
  children,
  ...props
}) => {
  const ElementType = useMemo(() => {
    return (
      (Object.keys(props) as Array<TextNames>).find((prop) =>
        validTextElements.includes(prop)
      ) || "p"
    );
  }, [props]);
  
  const elmentProps = useMemo(() => {
    return Object.keys(props).reduce((acc: {
        [key: string]: TextPropsExtended[keyof TextPropsExtended];
    }, prop: any) => {
        if(!validTextElements.includes(prop as TextNames)) {
            // @ts-expect-error
            acc[prop] = props[prop as keyof TextPropsExtended];
        }
        return acc;
    }, {});
  }, [props]);

  const classes = useMemo(() => {
    return twMerge(
        textClassNames({ weight, size, degree, exchange }),
        className
    );
  }, [weight, size, degree, exchange, className])

  return React.createElement(
    ElementType,
    {
      className: classes,
      ...elmentProps
    },
    children
  );
};

export default Text;
