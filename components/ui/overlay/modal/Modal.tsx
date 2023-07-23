import React, { useState } from 'react';
import { useModal } from 'react-aria';
import { Button, Dialog, DialogTrigger, Modal, ModalOverlay } from 'react-aria-components';
import { DialogTriggerProps, ModalOverlayProps } from 'react-aria-components';
import { mergeClassName } from '@/helpers/className'

const ModalContext = React.createContext<{ isOpen: boolean, setOpen: React.Dispatch<React.SetStateAction<boolean>>}>({ isOpen: false, setOpen: () => {} });

const ModalUi = ({ children, ...props }: { children: React.ReactNode[] | React.ReactNode }) => {
    const [isOpen, setOpen] = useState(false);
    return (
        <DialogTrigger {...props}>
            <ModalContext.Provider value={{ isOpen, setOpen }} >
                {children}
            </ModalContext.Provider>
        </DialogTrigger>
    )
}


const ButtonUi = ({ children, className ='', ...props }: { children: ({ open }: { open: () => void }) => React.ReactNode }  & { className?: string } ) => {
    const { isOpen, setOpen } = React.useContext(ModalContext);
    return typeof children == 'function' ? children({ open: () => setOpen(true) }) : <Button className={mergeClassName('outline-none', className)} onPress={() => setOpen(true)} {...props}>{children}</Button>
}

const ModalUiOverlay = ({children, ...props }: { children: React.ReactNode[] | React.ReactNode } & ModalOverlayProps) => {
    return <ModalOverlay {...props}>{children}</ModalOverlay>
}

const ModalUiContent = ({ children, ...props }: { children: ({ close }: { close: () => void }) => React.ReactNode } & ModalOverlayProps & React.RefAttributes<HTMLDivElement>) => {
    const { isOpen, setOpen } = React.useContext(ModalContext);
    return <Modal {...props}>
        <Dialog>
            {typeof children == 'function' ? (value) => children({ close: () => setOpen(false) }) : children}
        </Dialog>
    </Modal>
}

ModalUi.Button = ButtonUi;
ModalUi.Overlay = ModalUiOverlay;
ModalUi.Content = ModalUiContent;

export default ModalUi;