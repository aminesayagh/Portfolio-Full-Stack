
import { useState, Dispatch, SetStateAction } from 'react';
import { motion, useAnimation } from 'framer-motion';
import { Button } from '@/components/ui';

const Y_PATH_01_CLOSED = '8';
const Y_PATH_02_CLOSED = '18';
const DURATION = 0.2;
const STROKE_WIDTH = 1.6;
const path01Variants = {
    open: { d: "M3.06061 2.99999L21.0606 21" },
    closed: { d: `M0 ${Y_PATH_01_CLOSED}L24 ${Y_PATH_01_CLOSED}` }
};

const path02Variants = {
    open: { d: "M3.00006 21.0607L21 3.06064" },
    moving: { d: `M0 ${Y_PATH_02_CLOSED}L24 ${Y_PATH_02_CLOSED}` },
    closed: { d: `M8 ${Y_PATH_02_CLOSED}L24 ${Y_PATH_02_CLOSED}` }
};


const HamburgerMenu = ({ isOpen, setOpen }: { isOpen: boolean, setOpen: Dispatch<SetStateAction<boolean>>}) => {

    const path01Controls = useAnimation();
    const path02Controls = useAnimation();
    const onClick = async () => {
        setOpen(!isOpen);
        if (!isOpen) {
            await path02Controls.start(path02Variants.moving);
            path01Controls.start(path01Variants.open);
            path02Controls.start(path02Variants.open);
        } else {
            path01Controls.start(path01Variants.closed);
            await path02Controls.start(path02Variants.moving);
            path02Controls.start(path02Variants.closed);
        }

    }
    return (
        <>
            <Button onPress={onClick} >
                <svg width='30' height='30' viewBox='0 0 24 24' strokeWidth={STROKE_WIDTH} >
                    <motion.path
                        {...path01Variants.closed}
                        animate={path01Controls}
                        transition={{ duration: DURATION }}
                        stroke='#FFFFFF'
                    />
                    <motion.path
                        {...path02Variants.closed}
                        animate={path02Controls}
                        transition={{ duration: DURATION }}
                        stroke='#FFFFFF'
                    />
                </svg>
            </Button>
        </>
    )
}

export default HamburgerMenu;