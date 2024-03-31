
import { useEffect } from 'react';
import { motion, useAnimation } from 'framer-motion';
import Button from '@/components/ui/button';
import { useKeyboard } from 'react-aria';
import { useMedia } from 'react-use'

const SIZE = 26;
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


const HamburgerMenu = ({ isOpen, setOpen }: { isOpen: boolean, setOpen: () => void }) => {
    const path01Controls = useAnimation();
    const path02Controls = useAnimation();
    const isXxs = useMedia('(min-width: 390px)', false);

    useEffect(() => {
        if (typeof isOpen !== 'boolean') return;
        async function handlerHamburgerClick() {
            if (!path02Controls || !path01Controls) return;
            if (isOpen) {
                await path02Controls.start(path02Variants.moving);
                path01Controls.start(path01Variants.open);
                path02Controls.start(path02Variants.open);
            } else {
                path01Controls.start(path01Variants.closed);
                await path02Controls.start(path02Variants.moving);
                path02Controls.start(path02Variants.closed);
            }
        };
        if (typeof isOpen === 'boolean') {
            handlerHamburgerClick().then().catch(err => console.error(err));
        }
    }, [isOpen, path02Controls, path01Controls])
    let { keyboardProps } = useKeyboard({
        onKeyDown: (e) => {
            if (['Escape', 'Esc'].includes(e.key)) {
            }
        },
        onKeyUp: (e) => {
            if (['Escape', 'Esc'].includes(e.key)) {
                isOpen && setOpen();
            }
        }
    })

    if (typeof setOpen !== 'function' || typeof isOpen !== 'boolean') throw new Error('HamburgerMenu: setOpen is undefined');

    return (
        <>
            <span  {...keyboardProps}>
                <Button onPress={() => setOpen()} name='Hamberger menu button' title='Hamberger menu button' >
                    <svg width={`${isXxs ? SIZE : 22}`} height={`${isXxs ? SIZE : 22}`} viewBox='0 0 24 24' strokeWidth={STROKE_WIDTH} >
                        <motion.path
                            {...path01Variants.closed}
                            animate={path01Controls}
                            transition={{ duration: DURATION }}
                            stroke='var(--color-white-100)'
                        />
                        <motion.path
                            {...path02Variants.closed}
                            animate={path02Controls}
                            transition={{ duration: DURATION }}
                            stroke='var(--color-white-100)'
                        />
                    </svg>
                </Button>
            </span>
        </>
    )
}

export default HamburgerMenu;