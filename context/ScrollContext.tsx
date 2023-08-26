
import { useState, createContext } from 'react';
import Scrollbar from 'smooth-scrollbar';

export const ScrollProvider = createContext<{
    scrollbar: null | Scrollbar,
    setScrollbar: (scrollbar: Scrollbar) => void
}>({ 
    scrollbar: null,
    setScrollbar: () => {}
});

export default function ScrollContextProvider({ children }: { children: React.ReactNode }) {
    const [scrollbar, setScrollbar] = useState<null | Scrollbar>(null);

    return <ScrollProvider.Provider value={{
        scrollbar, setScrollbar
    }}>
        {children}
    </ScrollProvider.Provider>
}