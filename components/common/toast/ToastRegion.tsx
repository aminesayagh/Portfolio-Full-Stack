import { createPortal } from 'react-dom';
import { ToastQueue, useToastQueue, ToastState } from '@react-stately/toast';
import React, { useRef } from 'react';
import { AriaToastProps, AriaToastRegionProps, useToast, useToastRegion } from '@react-aria/toast';

import { ToastItem, toastQueue } from './addToast';
import { twMerge } from 'tailwind-merge';

interface ToastProps extends AriaToastProps<ToastItem>{
    state: ToastState<ToastItem>;
}

interface ToastRegionProps extends AriaToastRegionProps {
    state: ToastState<ToastItem>;
}

const Toast = ({ state, ...props }: ToastProps) => {
    let ref = useRef<HTMLDivElement>(null);
    let { toastProps, descriptionProps, closeButtonProps, ...other } = useToast(props, state, ref); 
    const action = props.toast.content.action;
    const variant = props.toast.content.variant;

    console.log(variant);
    return <span {...toastProps} ref={ref} >
        <div className={twMerge(`flex flex-row gap-4 items-center p-6 rounded-md bg-black-200 text-gray-300`, `border border-gray-900/60`, 'shadow-md shadow-white-200/5')}>
            <p className='capitalize text-sm tracking-wider font-semibold leading-6' {...descriptionProps}>{props.toast.content.description}</p>
        </div>
    </span>
}

const ToastRegion = ({ state, ...props }: ToastRegionProps) => {
    let ref = useRef<HTMLDivElement>(null);
    let { regionProps } = useToastRegion(props, state, ref);

    return <div {...regionProps} ref={ref} className={`fixed bottom-10 right-10 flex flex-col gap-4 z-toast`}>
        {state.visibleToasts.map((toast, i) => <Toast key={toast.key} toast={toast} state={state} />)}
    </div>
}

export default function GlobalToastRegion(props: AriaToastRegionProps) {
    const state = useToastQueue(toastQueue);

    
    return state.visibleToasts.length > 0 ? createPortal(<ToastRegion state={state} {...props} />, document.body) : null;
}