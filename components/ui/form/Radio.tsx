import React from "react";
import { Radio, Label, RadioGroup } from "react-aria-components";
import type { RadioGroupProps } from "react-aria-components";

interface RadioGroupUiProps extends RadioGroupProps {
  label?: string;
  name: string;
  field: {
    value: string;
    onChange: (e: string) => void;
  };
}

const RadioUi = Radio;

const RadioGroupUi = ({ label, field, ...props }: RadioGroupUiProps) => {
  return (
    <>
      <Label>{label}</Label>
      <RadioGroup {...props} onChange={field.onChange} value={field.value} />
    </>
  );
};

export { RadioUi, RadioGroupUi };
