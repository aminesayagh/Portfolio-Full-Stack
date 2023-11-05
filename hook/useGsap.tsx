import { useContext, RefObject } from "react"
import { useIsomorphicLayoutEffect, useWindowSize } from "react-use"
import { gsap } from "@/utils/gsap";
import { useLocomotiveScroll } from "@/lib/LocomotiveScroll";

const useGsap = (gsapCallback: gsap.ContextFunc, ref: RefObject<HTMLDivElement> | RefObject<HTMLCanvasElement> | undefined, rendered: any[] = []) => {
    const { isReady, scroll, hasToReload } = useLocomotiveScroll()
    useIsomorphicLayoutEffect(() => {
        if (!isReady) return;
        let ctx: gsap.Context = gsap.context(gsapCallback, ref);
        console.log('useGsap: isReady');
        return () => {
            ctx && ctx.revert();
        }
    }, [ref,...rendered, isReady, scroll, hasToReload]);
}

export default useGsap;