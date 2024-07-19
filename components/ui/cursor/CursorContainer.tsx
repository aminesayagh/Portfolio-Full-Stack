import { useContext, useEffect, createContext } from "react";
import { useHover } from "react-aria";

import { cursorContext } from "./Cursor.context";
import { ItemCursor } from "./CursorType";

const cursorParentContext = createContext<{
  hasParent: boolean;
}>({
  hasParent: false
});

const CursorContainer = ({
  children,
  className = "",
  name,
  ...props
}: {
  children: React.ReactElement;
  className?: string;
} & ItemCursor) => {
  const { addCursor, setKey } = useContext(cursorContext);
  const { hasParent } = useContext(cursorParentContext);

  const { hoverProps } = useHover({
    onHoverStart: () => {
      setKey && setKey(name);
    },
    onHoverEnd: () => {
      setKey && setKey(null);
    }
  });

  useEffect(() => {
    addCursor &&
      addCursor({
        name,
        ...props
      });
  }, [props, name, addCursor]);

  if (hasParent) return children;

  return (
    <cursorParentContext.Provider value={{ hasParent: true }}>
      <span className={className} {...hoverProps}>
        {children}
      </span>
    </cursorParentContext.Provider>
  );
};

export default CursorContainer;
