import { createPortal } from 'react-dom';
import { ToastQueue, useToastQueue, ToastState } from '@react-stately/toast';
import React, { useRef } from 'react';
import { AriaToastProps, AriaToastRegionProps, useToast, useToastRegion } from '@react-aria/toast';
import { motion, AnimatePresence } from "framer-motion";

import { ToastItem, toastQueue } from './addToast';
import { twMerge } from 'tailwind-merge';

interface ToastProps extends AriaToastProps<ToastItem> {
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
    return <div className={twMerge(`relative flex flex-row gap-4 items-center p-6 rounded-md bg-black-200 text-gray-300`, `border border-gray-900/60`, 'shadow-md shadow-white-200/5')} {...toastProps} ref={ref}>
            <p className='capitalize text-sm tracking-wider font-semibold leading-6' {...descriptionProps}>{props.toast.content.description}</p>
        </div>
}

const ToastRegion = ({ state, ...props }: ToastRegionProps) => {
    let ref = useRef<HTMLUListElement>(null);
    let { regionProps } = useToastRegion(props, state, ref);

    return <ul {...regionProps} ref={ref} className={`fixed bottom-10 right-10 flex flex-col gap-4 z-toast`}>
            <AnimatePresence mode='sync' >
                {state.visibleToasts.map((toast, i) => <motion.li 
                    key={toast.key} initial={{ opacity: 0, y: 50, scale: 0.3 }}
                    animate={{ opacity: 1, y: 0, scale: 1, transition: { duration: 0.2 } }}
                    exit={{ opacity: 0, scale: 0.5, transition: { duration: 0.2 } }}
                    className='relative'
                 >
                    <Toast toast={toast} state={state} />
                </motion.li>)}
            </AnimatePresence>
        </ul>
    
}

        export default function GlobalToastRegion(props: AriaToastRegionProps) {
    const state = useToastQueue(toastQueue);

    
    return state.visibleToasts.length > 0 ? createPortal(<ToastRegion state={state} {...props} />, document.body) : null;
}