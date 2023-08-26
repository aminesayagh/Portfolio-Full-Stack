import { useIsomorphicLayoutEffect } from 'framer-motion';
import { pick, isEqual } from 'lodash';
import { useState } from 'react';

interface BoundingBoxAwareRenderParams {
    setElement: (element: HTMLElement | null) => void,
}
interface Props { 
    render: (params: BoundingBoxAwareRenderParams) => React.ReactNode,
    id: string,
    type?: 'default' | 'section' | 'element' | 'headSection',
}
export type BoundingBox = Omit<DOMRect, 'toJSON'>;

const toBoundingBox = (rect: DOMRect): BoundingBox => pick(rect, ['x', 'y', 'width', 'height', 'bottom' ,'left', 'right', 'top'])
const useBoundingBox = (element: HTMLElement | null) => {
    const [box, setBox] = useState<BoundingBox | null>(() => element ? toBoundingBox(element.getBoundingClientRect()) : null);
    useIsomorphicLayoutEffect(() => {
        if(!element) return;
        const handleELementChange = () => {
            const newBox = toBoundingBox(element.getBoundingClientRect());

            if(isEqual(newBox, box)) return;
            setBox({ ...newBox, top: Math.abs(newBox.top) });
        }

        handleELementChange();

        if(!window?.ResizeObserver) return;

        const resizeObserver = new ResizeObserver(handleELementChange);

        resizeObserver.observe(element);

        return () => {
            resizeObserver.disconnect();
        }
    });
    return box;
}
export const BoundingBoxAware = ({ render, id, type = 'default' }: Props) => {
    const [element, setElement] = useState<HTMLElement | null>(null);

    const boundingBox = useBoundingBox(element);
    

    return render({ setElement })

}