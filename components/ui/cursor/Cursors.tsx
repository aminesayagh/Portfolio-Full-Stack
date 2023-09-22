
import { Text } from '@/components/ui';
import { useEffect } from 'react';
import { gsap } from '@/utils/gsap'

const CursorScroll = ({ isActive,tl }: {
    isActive: boolean,
    tl: gsap.core.Timeline | undefined
}) => {
    useEffect(() => {
        if(isActive) {
            tl && tl.play();
        } else {
            tl && tl.reverse();
        }
    }, [isActive, tl]);

    return (
        <span>
            <Text p size='sm' exchange degree='1'>scroll</Text>
        </span>
    )
}

export type TCursor = 'CursorScroll'

const Cursors = { CursorScroll }
export default Cursors;

export const CursorsArray = Object.keys(Cursors) as TCursor[];