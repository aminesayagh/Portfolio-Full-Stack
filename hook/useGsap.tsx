import { useContext, useRef, RefObject, DependencyList } from "react"
import { useIsomorphicLayoutEffect } from "react-use"
import { ScrollProvider } from "@/context/ScrollContext"
import { gsap } from "@/utils/gsap";

const useGsap = (gsapCallback: gsap.ContextFunc, ref: RefObject<HTMLDivElement> | RefObject<HTMLCanvasElement>, rendered: any[] = []) => {
    const { scrollbar } = useContext(ScrollProvider);
    let ctx = useRef<gsap.Context | null>(null);
    useIsomorphicLayoutEffect(() => {
        if (scrollbar) {
            ctx.current = gsap.context(gsapCallback, ref);
            return () => ctx.current?.revert();
        }
    }, [scrollbar, ...rendered]);

    return ctx;
}

export default useGsap;