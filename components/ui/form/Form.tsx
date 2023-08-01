import { useState, useContext } from 'react';
import { useHover } from 'react-aria';
import { useForm, FormProvider, Controller, useFormContext } from 'react-hook-form';
import type { SubmitHandler } from 'react-hook-form';
import { FormProps, InputProps } from './Form.types';
import { Label, TextField, Input, Select, Button, SelectValue, Popover, ListBox, Item, RadioProps, Radio, CheckboxGroup, CheckboxProps, Checkbox } from 'react-aria-components';
import { TextFieldProps, SelectProps, ListBoxProps,CheckboxGroupProps, ItemProps, RadioGroup, RadioGroupProps } from 'react-aria-components';
import { twJoin } from 'tailwind-merge';
import { ResizablePanel, Icon } from 'components/ui';
import type { IconNames } from 'components/ui';

const Form = <T extends {[x: string]: any}>({ onSubmit, children, className, ...props }: FormProps<T>) => {
    const methods = useForm<T>({ ...props, shouldFocusError: true });

    return <FormProvider<T> {...methods}>
        <form onSubmit={methods.handleSubmit(onSubmit)} className={className}>
            {children}
        </form>
    </FormProvider>
}

const NotificationError = ({ message }: { message?: string }) => {
    return message ? (
        <div className='flex flex-row items-center justify-start w-full gap-2 p-2'>
            <div>
                <Icon name='IconExclamationCircle' size='16' color='red' />
            </div>
        </div>
    ) : <></>
}

const LayoutField = ({ label, className, icon, name, children, ...props }: { label: string, className?: string, icon?: IconNames, name: string, children: React.ReactNode } & TextFieldProps) => {
    const { 
        register,
        getFieldState,
        ...methods
    } = useFormContext();

    const { invalid, isDirty, isTouched, error } = getFieldState(name);
    return <>
        <TextField className={twJoin('font-sans', 'flex flex-col items-stretch justify-between', 'px-3', className ? className : 'w-full')} {...props}>
            <Label className={twJoin('text-sm', 'font-semibold', 'mb-1')} htmlFor={name}>{label}</Label>
            {children}
            <span slot='errorMessage'>
                <ResizablePanel >
                    <NotificationError message={error?.message} />
                </ResizablePanel>
            </span>
        </TextField>
    </>
}

const InputUi = ({ name, label, className, ...props }: InputProps ) => {
    const { register, ...methods } = useFormContext();
    return <Input className={twJoin(['w-full'])} {...register(name)} {...props} />
} 

const SelectUi = <T extends {}>({ label, name, children, ...props }: { label: string, name: string, children: ListBoxProps<T>['children'] } & Omit<SelectProps<T>, 'children'>) => {
    const { register, getFieldState, control, ...methods } = useFormContext();
    return (
        <>
            <Controller name={name} control={control} render={({field, fieldState}) => {
                return (
                    <Select {...props} onSelectionChange={field.onChange} selectedKey={field.value}>
                        <Label>{label}</Label>
                        <Button>
                            <SelectValue />
                            <span aria-hidden='true' >▼</span>
                        </Button>
                        <span slot='errorMessage'>
                            <ResizablePanel >
                                <NotificationError message={fieldState.error?.message} />
                            </ResizablePanel>
                        </span>
                        <Popover>
                            <ListBox>
                                {children}
                            </ListBox>
                        </Popover>

                    </Select>
                )
            }} />
        </>
    )
}

const ItemUi = (props: ItemProps) => {
    return (
        <Item {...props} />
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
            <Controller name={name} control={control} render={({field, fieldState}) => {
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
                    <CheckboxGroup value={field.value} onChange={field.onChange} {...props}  />
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

Form.Input = InputUi;
Form.LayoutField = LayoutField;
Form.Select = SelectUi;
Form.Item = ItemUi;
Form.RadioGroup = RadioGroupUi;
Form.Radio = RadioUi;
Form.CheckboxGroup = CheckboxGroupUi;
Form.Checkbox = CheckboxUi;


export default Form;