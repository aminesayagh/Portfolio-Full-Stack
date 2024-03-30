import React from 'react';
import { useForm, FormProvider, Controller, useFormContext } from 'react-hook-form';
import { FormProps, InputProps } from './Form.types';
import { Label, TextField, Select, Button, SelectValue, Popover, ListBox, ListBoxItem as Item, RadioProps, Radio, CheckboxGroup, CheckboxProps, Checkbox } from 'react-aria-components';
import { TextFieldProps, SelectProps, ListBoxProps, CheckboxGroupProps, ListBoxItemProps as ItemProps, RadioGroup, RadioGroupProps, ButtonProps } from 'react-aria-components';
import { twJoin } from 'tailwind-merge';
import ResizablePanel from '@/components/ui/resizablePanel';
import { Icon } from '@/components/ui/icon';
import type { IconNames } from '@/components/ui/icon';

import { twMerge } from 'tailwind-merge';
import Style from './Form.module.scss';
import { mergeClassName } from '@/helpers/className';

const Form = <T extends { [x: string]: any }>({ onSubmit, onError, children, className, ...props }: FormProps<T>) => {
    const methods = useForm<T>({ ...props, shouldFocusError: true });

    return <FormProvider<T> {...methods}>
        <form onSubmit={methods.handleSubmit((allData, event) => onSubmit(allData, { setError: methods.setError, reset: methods.reset }, event), onError)} className={twMerge('grid grid-cols-12 gap-x-0 sm:gap-x-4 gap-y-4 sm:gap-y-3', className)}>
            {typeof children === 'function' ? children(methods) : children}
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

const LayoutField = ({ label, className, icon, name, children, width, ...props }: { width?: string, label: string, className?: string, icon?: IconNames, name: string, children: React.ReactElement<InputProps> } & TextFieldProps) => {
    const {
        register,
        getFieldState,
        // @ts-ignore
        ...methods
    } = useFormContext();
    const { invalid, error } = getFieldState(name);

    const childrenWithProps = React.isValidElement(children) ? React.cloneElement(children, {
        label,
        ...children.props,
        ...register(name),
        className: twMerge(children.props.className, 'w-full', Style['input'], invalid ? Style['invalid'] : null),
    }) : children;

    return <>
        <TextField className={twJoin(Style['text-field'], 'flex flex-col', width ? width : 'col-span-12', className ? className : 'w-full')} {...props}>
            <div className='w-full flex flex-col gap-2'>
                <Label className={twJoin(Style['label'])} htmlFor={name} suppressHydrationWarning>{label}</Label>
                {childrenWithProps}
            </div>
            <span slot='errorMessage'>
                <ResizablePanel >
                    <NotificationError message={error?.message} />
                </ResizablePanel>
            </span>
        </TextField>
    </>
}


const SelectUi = <T extends {}>({ label, name, children, items, ...props }: { items: Iterable<T>, label: string, name: string, children: ListBoxProps<T>['children'] } & Omit<SelectProps<T>, 'children'>) => {
    // @ts-ignore
    const { register, getFieldState, control, ...methods } = useFormContext();
    return (
        <>
            <div className={twMerge('w-full col-span-12', Style['text-field'])}>
                <Controller name={name} control={control} render={({ field, fieldState }) => {
                    const { invalid, error } = fieldState;
                    return (
                        <Select {...props} onSelectionChange={field.onChange} selectedKey={field.value} className={twMerge('flex flex-col gap-2')}>
                            <Label className={twJoin(Style['label'])} htmlFor={name}>{label}</Label>
                            <Button className={twMerge(Style['input'], invalid ? Style['invalid'] : null)}>
                                <SelectValue />
                                <span aria-hidden='true' className='text-[10px] my-auto mx-3' >▼</span>
                            </Button>
                            <span slot='errorMessage'>
                                <ResizablePanel >
                                    <NotificationError message={error?.message} />
                                </ResizablePanel>
                            </span>
                            <Popover className={twMerge('flex flex-col gap-2 p-2 w-72 rounded-sm', 'bg-black-200/70 backdrop-blur-md z-dropdown remove_outline')}>
                                <ListBox items={items} className='remove_outline'>
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

const ItemUi = ({ className, ...props }: ItemProps) => {
    return (
        <Item className={mergeClassName(Style['item'], className)} {...props} />
    )
}

interface RadioGroupUiProps extends RadioGroupProps {
    label?: string;
    name: string;
}

const RadioGroupUi = ({ label, name, ...props }: RadioGroupUiProps) => {
    // @ts-ignore
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
    // @ts-ignore
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
    const { formState: { isSubmitting } } = useFormContext();
    return (
        <Button {...props} type='submit' isDisabled={isSubmitting ? true : false} />
    )
}

Form.LayoutField = LayoutField;
Form.Select = SelectUi;
Form.Item = ItemUi;
Form.RadioGroup = RadioGroupUi;
Form.Radio = RadioUi;
Form.CheckboxGroup = CheckboxGroupUi;
Form.Checkbox = CheckboxUi;
Form.Button = ButtonUi;


export default Form;