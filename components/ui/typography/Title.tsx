import React, { FC, useMemo } from "react";
import { twMerge } from "tailwind-merge";

import Style from "./Typography.module.scss";
import { textColorDegree, titleStyle } from "./Typography.style";

import type { TitleNames, TitlePropsExtended } from "./Typography.type";
import { validTitleElements } from "./Typography.type";

const Title: FC<TitlePropsExtended> = ({
  weight,
  degree = "1",
  exchange,
  className,
  children,
  ...props
}) => {
  const ElementType = useMemo(() => {
    return (
      (Object.keys(props) as Array<TitleNames>).find((prop) =>
        validTitleElements.includes(prop)
      ) || "h2"
    );
  }, [props]);

  const elementProps = useMemo(() => {
    return Object.keys(props).reduce(
      (
        acc: {
          [key: string]: TitlePropsExtended[keyof TitlePropsExtended];
        },
        prop: any
      ) => {
        if (!validTitleElements.includes(prop as TitleNames)) {
          // @ts-expect-error
          acc[prop] = props[prop as keyof TitlePropsExtended];
        }
        return acc;
      },
      {}
    );
  }, [props]);

  const classes = useMemo(
    () =>
      twMerge(
        titleStyle({
          weight,
        }),
        className,
        Style[`title_${ElementType}`],
        Style["title"],
        textColorDegree[exchange ? "exchanged" : "normal"][degree]
      ),
    [weight, className, ElementType, degree, exchange]
  );
  return React.createElement(
    ElementType,
    {
      className: classes,
      ...elementProps
    },
    children
  );
};

export default Title;
