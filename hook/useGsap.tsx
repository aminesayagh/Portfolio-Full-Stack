import { useContext, RefObject } from "react"
import { useIsomorphicLayoutEffect, useWindowSize } from "react-use"
import { ScrollProvider } from "@/context/AnimationConf"
import { gsap } from "@/utils/gsap";

const useGsap = (gsapCallback: gsap.ContextFunc, ref: RefObject<HTMLDivElement> | RefObject<HTMLCanvasElement>, rendered: any[] = []) => {
    const { scrollbar } = useContext(ScrollProvider);
    const { width } = useWindowSize();
    useIsomorphicLayoutEffect(() => {
        if (!scrollbar) return;
        let ctx: gsap.Context = gsap.context(gsapCallback, ref);
        
        return () => {
            ctx && ctx.revert();
        }
    }, [ref,...rendered, scrollbar, width]);

    
}

export default useGsap;