import { useContext, RefObject } from "react"
import { useIsomorphicLayoutEffect, useWindowSize } from "react-use"
import { gsap } from "@/utils/gsap";
import { useLocomotiveScroll } from "@/lib/LocomotiveScroll";

const useGsap = (gsapCallback: gsap.ContextFunc, ref: RefObject<HTMLDivElement> | RefObject<HTMLCanvasElement> | undefined, rendered: any[] = []) => {
    const { isReady, scroll } = useLocomotiveScroll()
    useIsomorphicLayoutEffect(() => {
        if (!isReady) return;
        let ctx: gsap.Context = gsap.context(gsapCallback, ref);
        
        return () => {
            ctx && ctx.revert();
        }
    }, [ref,...rendered, isReady, scroll]);
}

export default useGsap;