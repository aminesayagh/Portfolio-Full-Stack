
import React, { useContext, useEffect } from 'react';
import { useHover } from 'react-aria';
import { cursorContext } from './Cursor';
import { ItemCursor, CursorNames } from './CursorType';

const CursorContainer = <C extends CursorNames>({ children, name, ...props }: {
    children: React.ReactElement,
} & ItemCursor<C>) => {
    const { addCursor, setKey } = useContext(cursorContext);
    const { isHovered, hoverProps } = useHover({});

    useEffect(() => {
        // @ts-ignore
        addCursor && addCursor({
            name,
            ...props
        })
    }, [props, name, addCursor])

    useEffect(() => {
        if (isHovered) {
            setKey && setKey(name);
        } else {
            setKey && setKey(null);
        }
    }, [isHovered, name, setKey])

    return <span className='contents' { ...hoverProps }>
        {children}
    </span>
}

export default CursorContainer;