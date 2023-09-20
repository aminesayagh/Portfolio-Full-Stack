
import { useState, createContext } from 'react';

import LocomotiveScroll from 'locomotive-scroll';
export const ScrollProvider = createContext<{
    scrollbar: null | LocomotiveScroll,
    setScrollbar: (scrollbar: LocomotiveScroll | null) => void
}>({ 
    scrollbar: null,
    setScrollbar: () => {}
});

export default function ScrollContextProvider({ children }: { children: React.ReactNode }) {
    const [scrollbar, setScrollbar] = useState<null | LocomotiveScroll>(null);

    return <ScrollProvider.Provider value={{
        scrollbar, setScrollbar
    }}>
        {children}
    </ScrollProvider.Provider>
}