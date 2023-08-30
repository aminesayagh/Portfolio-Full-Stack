import React from 'react';
import { useHover } from 'react-aria';
import { useForm, FormProvider, Controller, useFormContext } from 'react-hook-form';
import type { SubmitHandler } from 'react-hook-form';
import { FormProps, InputProps } from './Form.types';
import { Label, TextField, Input, Select, Button, SelectValue, Popover, ListBox, Item, RadioProps, Radio, CheckboxGroup, CheckboxProps, Checkbox } from 'react-aria-components';
import { TextFieldProps, SelectProps, ListBoxProps, CheckboxGroupProps, ItemProps, RadioGroup, RadioGroupProps, ButtonProps } from 'react-aria-components';
import { twJoin } from 'tailwind-merge';
import { ResizablePanel, Icon } from 'components/ui';
import type { IconNames } from 'components/ui';
import { twMerge } from 'tailwind-merge';
import Style from './Form.module.scss';
import { mergeClassName } from '@/helpers/className';

const Form = <T extends { [x: string]: any }>({ onSubmit, children, className, ...props }: FormProps<T>) => {
    const methods = useForm<T>({ ...props, shouldFocusError: true });

    return <FormProvider<T> {...methods}>
        <form onSubmit={methods.handleSubmit(onSubmit)} className={twMerge('grid grid-cols-12 gap-x-4 gap-y-3', className)}>
            {children}
        </form>
    </FormProvider>
}

const NotificationError = ({ message }: { message?: string }) => {
    return message ? (
        <div className='flex flex-row items-center justify-start w-full gap-2 p-2'>
            <div>
                <Icon name='IconExclamationCircle' size='13' color='#DB482C' />
            </div>
            <p className={twMerge('text-[0.7em] text-red-600 tracking-wide')}>{message}</p>
        </div>
    ) : <></>
}

const WIDTH = {
    '1/2': 'col-span-6',
    'full': 'col-span-12',
} as const;

type TypeWidth = keyof typeof WIDTH;

const LayoutField = ({ label, className, icon, name, children, width = 'full', ...props }: { width?: TypeWidth, label: string, className?: string, icon?: IconNames, name: string, children: React.ReactElement<InputProps> } & TextFieldProps) => {
    const {
        register,
        getFieldState,
        ...methods
    } = useFormContext();

    const { invalid, isDirty, isTouched, error } = getFieldState(name);
    const childrenWithProps = React.isValidElement(children) ? React.cloneElement(children, { name, label, className: twMerge(children.props.className, Style['input'], invalid ? Style['invalid'] : null) }) : children;
    return <>
        <TextField className={twJoin(Style['text-field'], WIDTH[width], className ? className : 'w-full')} {...props}>
            <Label className={twJoin(Style['label'])} htmlFor={name} suppressHydrationWarning>{label}</Label>
            {childrenWithProps}
            <span slot='errorMessage'>
                <ResizablePanel >
                    <NotificationError message={error?.message} />
                </ResizablePanel>
            </span>
        </TextField>
    </>
}

type InputUiProps = Omit<InputProps, 'name' | 'label'> & { name?: string, label?: string };
const InputUi = ({ name, className, ...props }: InputUiProps) => {
    const { register, ...methods } = useFormContext();
    if (!name) {
        throw new Error('InputUi must have a name');
        return null;
    }

    return <Input className={mergeClassName('w-full', className)} {...register(name)} {...props} />
}


const SelectUi = <T extends {}>({ label, name, children, ...props }: { label: string, name: string, children: ListBoxProps<T>['children'] } & Omit<SelectProps<T>, 'children'>) => {
    const { register, getFieldState, control, ...methods } = useFormContext();
    return (
        <>
            <div className={twMerge('w-full col-span-12')}>
                <Controller name={name} control={control} render={({ field, fieldState }) => {
                    const { invalid, isDirty, isTouched, error } = fieldState;
                    return (
                        <Select {...props} onSelectionChange={field.onChange} selectedKey={field.value} className={twMerge(Style['text-field'])}>
                            <Label className={twJoin(Style['label'])} htmlFor={name}>{label}</Label>
                            <Button className={twMerge(Style['input'], invalid ? Style['invalid'] : null)}>
                                <SelectValue />
                                <span aria-hidden='true' >▼</span>
                            </Button>
                            <span slot='errorMessage'>
                                <ResizablePanel >
                                    <NotificationError message={error?.message} />
                                </ResizablePanel>
                            </span>
                            <Popover className={twMerge('flex flex-col gap-2 p-2 w-72 rounded-sm', 'bg-black-200/70 backdrop-blur-md z-dropdown remove_outline')}>
                                <ListBox className='remove_outline'>
                                    {children}
                                </ListBox>
                            </Popover>

                        </Select>
                    )
                }} />
            </div>
        </>
    )
}

const ItemUi = ({className, ...props}: ItemProps) => {
    return (
        <Item className={mergeClassName(Style['item'], className)} {...props} />
    )
}

interface RadioGroupUiProps extends RadioGroupProps {
    label?: string;
    name: string;
}

const RadioGroupUi = ({ label, name, ...props }: RadioGroupUiProps) => {
    const { register, control, ...methods } = useFormContext();
    return (
        <>
            <Controller name={name} control={control} render={({ field, fieldState }) => {
                return (
                    <>
                        <Label>{label}</Label>
                        <RadioGroup {...props} onChange={field.onChange} value={field.value} />
                        <span slot='errorMessage'>
                            <ResizablePanel >
                                <NotificationError message={fieldState.error?.message} />
                            </ResizablePanel>
                        </span>
                    </>
                )
            }} />
        </>
    )
}

const RadioUi = (props: RadioProps) => {
    return (
        <Radio {...props} />
    )
}

interface CheckboxGroupUiProps extends CheckboxGroupProps {
    label?: string;
    name: string;
}

const CheckboxGroupUi = ({ label, name, ...props }: CheckboxGroupUiProps) => {
    const { register, getFieldState, control, ...methods } = useFormContext();
    return (
        <>
            <Controller name={name} control={control} render={({ field, fieldState }) => (
                <>
                    <Label>{label}</Label>
                    <CheckboxGroup value={field.value} onChange={field.onChange} {...props} />
                    <span slot='errorMessage'>
                        <ResizablePanel >
                            <NotificationError message={fieldState.error?.message} />
                        </ResizablePanel>
                    </span>
                </>
            )} />
        </>
    )
}

const CheckboxUi = (props: CheckboxProps) => {
    return (
        <Checkbox {...props} />
    )
}

const ButtonUi = (props: ButtonProps) => {
    return (
        <Button {...props} type='submit' />
    )
}

Form.Input = InputUi;
Form.LayoutField = LayoutField;
Form.Select = SelectUi;
Form.Item = ItemUi;
Form.RadioGroup = RadioGroupUi;
Form.Radio = RadioUi;
Form.CheckboxGroup = CheckboxGroupUi;
Form.Checkbox = CheckboxUi;
Form.Button = ButtonUi;


export default Form;