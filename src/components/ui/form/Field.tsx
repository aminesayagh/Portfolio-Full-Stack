import React, { isValidElement, cloneElement } from "react";

import { TextField, Label } from "react-aria-components";

import type { IconNames } from "@/components/ui/icon";
import { cn } from "@/lib/utils";

import { formFieldInput } from "./Style";

import type { TextFieldProps, InputProps } from "react-aria-components";

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
        ...children.props,
        className: cn(children.props.className, "w-full", formFieldInput)
      })
    : children;
  return (
    <TextField
      className={cn(
        "flex flex-col gap-0",
        width ? width : "col-span-12",
        className ? className : "w-full"
      )}
      {...props}
    >
      <div className="flex flex-col w-full gap-2">
        <Label
          className="font-sans px-0 text-xs font-medium text-gray-600"
          htmlFor={name}
          suppressHydrationWarning
        >
          {label}
        </Label>
        {childrenWithProps}
      </div>
    </TextField>
  );
};

export default LayoutField;
