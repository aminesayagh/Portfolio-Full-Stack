import React, { useState } from 'react';
import { Dialog, DialogTrigger, Popover, OverlayArrow, Button } from 'react-aria-components';
import { DialogTriggerProps, PopoverProps } from 'react-aria-components';

const PopoverContext = React.createContext<{ isOpen: boolean, setOpen: React.Dispatch<React.SetStateAction<boolean>> }>({ isOpen: false, setOpen: () => { } });

const PopoverUi = ({ children, ...props }: { children: React.ReactNode[] | React.ReactNode } & DialogTriggerProps) => {
    const [isOpen, setOpen] = useState(false);

    return (
        <DialogTrigger {...props}>
            <PopoverContext.Provider value={{ isOpen, setOpen }} >
                {children}
            </PopoverContext.Provider>
        </DialogTrigger>
    )
}

const ButtonUi = ({ children, className = '', ...props }: { children: ({ open }: { open: () => void }) => React.ReactNode } & { className?: string } & DialogTriggerProps) => {
    const { setOpen } = React.useContext(PopoverContext);
    return typeof children == 'function' ? children({ open: () => setOpen(true) }) : <Button className={className} onPress={() => setOpen(true)} {...props}>{children}</Button>
}

const PopoverContentUi = ({ children, ...props }: {
    children: (({ close }: { close: () => void }) => React.ReactNode) | React.ReactNode
} & Omit<PopoverProps, 'children'> & React.RefAttributes<HTMLElement>) => {
    return <Popover {...props} >
        <OverlayArrow>
            <svg width='12' height='12' ><path d='M0 0,L6 6,L12 0' /></svg>
        </OverlayArrow>
        <Dialog >
            {typeof children == 'function' ? <PopoverContext.Consumer>
                {(value) => children({ close: () => value.setOpen(false) })}
            </PopoverContext.Consumer> : children}
        </Dialog>
    </Popover>
}

PopoverUi.Button = ButtonUi;
PopoverUi.Content = PopoverContentUi;

export default PopoverUi;