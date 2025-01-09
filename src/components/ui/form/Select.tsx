import React from "react";

import {
  Label,
  Select,
  SelectValue,
  Button,
  Popover,
  ListBox
} from "react-aria-components";

import { cn } from "@/lib/utils";

import { formFieldInput } from "./Style";

import type { SelectProps, ListBoxProps } from "react-aria-components";

const SelectUi = <
  T extends {
    [x: string]: string;
  }
>({
  label,
  name,
  children,
  items,
  invalid,
  ...props
}: {
  items: Iterable<T>;
  label: string;
  name: string;
  invalid?: boolean;
  children: ListBoxProps<T>["children"];
} & Omit<SelectProps<T>, "children">) => {
  return (
    <Select {...props} className="flex flex-col gap-2 w-full col-span-12">
      <Label
        className="font-sans px-0 text-xs font-medium text-gray-600"
        htmlFor={name}
      >
        {label}
      </Label>
      <Button className={cn(formFieldInput, invalid ? "invalid" : null)}>
        <SelectValue />
        <span aria-hidden="true" className="text-[10px] my-auto mx-3">
          ▼
        </span>
      </Button>
      <Popover className="flex flex-col gap-2 p-2 w-72 rounded-sm bg-black-200/70 backdrop-blur-md z-dropdown remove_outline">
        <ListBox items={items} className="remove_outline">
          {children}
        </ListBox>
      </Popover>
    </Select>
  );
};

export default SelectUi;
