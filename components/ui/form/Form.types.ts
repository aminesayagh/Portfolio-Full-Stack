import React from "react";
import { InputProps as AriaInputProps } from "react-aria-components";
import {
  UseFormProps,
  SubmitErrorHandler,
  UseFormSetError,
  UseFormReturn,
  UseFormReset
} from "react-hook-form";

export type OptionOnSubmit<T extends { [x: string]: unknown }> = {
  setError: UseFormSetError<T>;
  reset: UseFormReset<T>;
};

export interface FormProps<T extends { [x: string]: unknown }>
  extends UseFormProps<T> {
  children: ((method: UseFormReturn<T>) => React.ReactNode) | React.ReactNode;
  className?: string;
  onSubmit: (
    data: T,
    options: OptionOnSubmit<T>,
    event?: React.BaseSyntheticEvent
  ) => void | Promise<void>;
  onError?: SubmitErrorHandler<T>;
}

export interface InputProps extends AriaInputProps {
  label: string;
  name: string;
}
