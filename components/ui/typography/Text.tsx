import { FC, useMemo, createElement } from "react";
import { twMerge } from "tailwind-merge";

import { textClassNames } from "./Typography.style";
import {
  TextNames,
  TextPropsExtended,
  validTextElements,
} from "./Typography.type";

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
  
  const elementProps = useMemo(() => {
    return Object.keys(props).reduce((acc: {
        [key: string]: TextPropsExtended[keyof TextPropsExtended];
    }, prop) => {
        if(!validTextElements.includes(prop as TextNames)) {
            acc[prop] = props[prop];
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

  return createElement(
    ElementType,
    {
      className: classes,
      ...elementProps
    },
    children
  );
};

export default Text;
