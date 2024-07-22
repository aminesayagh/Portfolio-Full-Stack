import { Checkbox, CheckboxGroup, Label } from "react-aria-components";
import type { CheckboxGroupProps } from "react-aria-components";
const CheckboxUi = Checkbox;

interface CheckboxGroupUiProps extends CheckboxGroupProps {
  label?: string;
  name: string;
  field: {
    value: string[];
    onChange: (e: string[]) => void;
  };
}

const CheckboxGroupUi = ({ label, field, ...props }: CheckboxGroupUiProps) => {
  return (
    <>
      <Label>{label}</Label>
      <CheckboxGroup value={field.value} onChange={field.onChange} {...props} />
    </>
  );
};

export { CheckboxUi, CheckboxGroupUi };
