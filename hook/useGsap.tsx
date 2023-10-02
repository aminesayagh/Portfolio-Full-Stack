import { useContext, RefObject } from "react"
import { useIsomorphicLayoutEffect } from "react-use"
import { ScrollProvider } from "@/context/AnimationConf"
import { gsap } from "@/utils/gsap";

const useGsap = (gsapCallback: gsap.ContextFunc, ref: RefObject<HTMLDivElement> | RefObject<HTMLCanvasElement>, rendered: any[] = []) => {
    const { scrollbar } = useContext(ScrollProvider);
    useIsomorphicLayoutEffect(() => {
        if (scrollbar) {
            let ctx = gsap.context(gsapCallback, ref);
            return () => ctx.revert();
        }
    }, [scrollbar, ref, ...rendered]);
}

export default useGsap;