import { ReactElement, createContext, useEffect, useRef } from 'react';

import { ScrollTrigger } from '@/utils/gsap';
import { Lenis } from './lenis';

interface LenisContextValue {

}
const LenisContext = createContext<LenisContextValue>({

});

export function LenisProvider({
    children
}: { children: ReactElement }) {
    const LenisRef = useRef(null);

    
    useEffect(() => {
        LenisRef.current = new Lenis({
            duration: 1.2,
            easing: (t: number) => Math.min(1, 1.001 - Math.pow(2, -10 * t))
        });
        LenisRef.on('scroll', (e: any) => {
            console.log('scroll updated', e);
        })
        function raf(time: number) {
            LenisRef.current.raf(time);
            ScrollTrigger.update();
            requestAnimationFrame(raf);
        }

        requestAnimationFrame(raf);

        return () => {
            LenisRef.current.destroy();
        }
    }, []);

    return <LenisContext.provider value={LenisRef}>
        {children}
    </LenisContext.provider>
}
