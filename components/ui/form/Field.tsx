import { isValidElement, cloneElement } from "react";
import { TextField, Label } from "react-aria-components";
import type { TextFieldProps, InputProps } from "react-aria-components";
import { twJoin, twMerge } from "tailwind-merge";

import type { IconNames } from "@/components/ui/icon";

import Style from "./Form.module.scss";

const LayoutField = ({
  label,
  className,
  name,
  children,
  width,
  ...props
}: {
  width?: string;
  label: string;
  className?: string;
  icon?: IconNames;
  name: string;
  children: React.ReactElement<InputProps>;
} & TextFieldProps) => {
  const childrenWithProps = isValidElement(children)
    ? cloneElement(children, {
        label,
        ...children.props,
        className: twMerge(
          children.props.className,
          "w-full",
          Style["input"]
          // invalid ? Style["invalid"] : ""
        )
      })
    : children;
  return (
    <>
      <TextField
        className={twJoin(
          Style["text-field"],
          "flex flex-col",
          width ? width : "col-span-12",
          className ? className : "w-full"
        )}
        {...props}
      >
        <div className="flex flex-col w-full gap-2">
          <Label
            className={twJoin(Style["label"])}
            htmlFor={name}
            suppressHydrationWarning
          >
            {label}
          </Label>
          {childrenWithProps}
        </div>
      </TextField>
    </>
  );
};

export default LayoutField;
