import React, { InputHTMLAttributes } from 'react';
import { UseFormProps, SubmitHandler, SubmitErrorHandler, UseFormReturn } from 'react-hook-form';
import { IconNames } from '../icon';
import { InputProps as AriaInputProps, TextFieldProps } from 'react-aria-components';

export interface FormProps<T extends {[x: string]: any}> extends UseFormProps<T> {
    children: ((method: UseFormReturn<T>) => React.ReactNode) | React.ReactNode;
    className?: string;
    onSubmit: SubmitHandler<T>;
    onError?: SubmitErrorHandler<T>;
}

export interface InputProps extends AriaInputProps {
    label: string,
    name: string,
}
