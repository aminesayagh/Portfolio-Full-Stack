import { FormHTMLAttributes, DetailedHTMLProps } from "react";
import {
  FieldValues,
  FormProvider,
  FormProviderProps,
  UseFormReturn
} from "react-hook-form";

type TFormProps = DetailedHTMLProps<
  FormHTMLAttributes<HTMLFormElement>,
  HTMLFormElement
>;

export type TFormComponent<T extends FieldValues> = React.FC<
  TFormProps & {
    methods?: FormProviderProps<T>;
  }
>;

const Form = <T extends FieldValues>({
  methods,
  children,
  className,
  ...props
}: {
  methods?: UseFormReturn<T>;
  children: React.ReactNode;
  className?: string;
} & TFormProps) => {
  if (!!methods) {
    return (
      <FormProvider {...methods}>
        <form className={className} {...props}>
          {children}
        </form>
      </FormProvider>
    );
  }
  return (
    <form className={className} {...props}>
      {children}
    </form>
  );
};

export default Form;
