
import { useState, createContext } from 'react';

export const ScrollProvider = createContext<{
    pauseScroll: null | (() => void),
    restartScroll: null | (() => void),
    setPauseScroll: (pauseScroll: null | (() => void)) => void,
    setRestartScroll: (restartScroll: null | (() => void)) => void
}>({ 
    pauseScroll: null,
    restartScroll: null,
    setPauseScroll: () => {},
    setRestartScroll: () => {}
});

export default function ScrollContextProvider({ children }: { children: React.ReactNode }) {
    const [pauseScroll, setPauseScroll] = useState<null | (() => void)>(null);
    const [restartScroll, setRestartScroll] = useState<null | (() => void)>(null);



    return <ScrollProvider.Provider value={{ 
        pauseScroll,
        setPauseScroll,
        restartScroll,
        setRestartScroll,

    }}>
        {children}
    </ScrollProvider.Provider>
}