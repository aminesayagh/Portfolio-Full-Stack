
import React, { useContext, useEffect } from 'react';
import { useHover } from 'react-aria';
import { cursorContext } from './Cursor';
import { ItemCursor, CursorNames } from './CursorType';

const cursorParentContext = React.createContext<{
    hasParent: boolean,
}>({
    hasParent: false,
});

const CursorContainer = <C extends CursorNames>({ children, className = '', name, ...props }: {
    children: React.ReactElement,
    className?: string,
} & ItemCursor<C>) => {
    const { addCursor, setKey } = useContext(cursorContext);
    const { hasParent } = useContext(cursorParentContext);
    
    const { isHovered, hoverProps } = useHover({
        onHoverStart: () => {
            setKey && setKey(name);
        },
        onHoverEnd: () => {
            setKey && setKey(null);
        }
    });

    useEffect(() => {
        // @ts-ignore
        addCursor && addCursor({
            name,
            ...props
        })
    }, [props, name, addCursor])

    // useEffect(() => {
    //     if (isHovered) {
    //         setKey && setKey(name);
    //     } else {
    //         setKey && setKey(null);
    //     }
    // }, [isHovered, name, setKey])

    if (hasParent) return children;

    return <cursorParentContext.Provider value={{ hasParent: true }}>
        <span className={className} { ...hoverProps }>
            {children}
        </span>
    </cursorParentContext.Provider>
}

export default CursorContainer;