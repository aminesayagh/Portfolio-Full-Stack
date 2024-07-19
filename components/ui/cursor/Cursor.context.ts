import { createContext } from "react";

import { ItemCursor } from "./CursorType";

export const cursorContext = createContext<{
  addCursor?: (item: ItemCursor) => void;
  setKey?: (key: string | null) => void;
}>({});
