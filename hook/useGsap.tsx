import { RefObject } from "react"
import { useIsomorphicLayoutEffect } from "react-use";

import { gsap } from "@/utils/gsap";
import { useTranslation } from "react-i18next";
const useGsap = (gsapCallback: gsap.ContextFunc, ref: RefObject<HTMLDivElement> | RefObject<HTMLCanvasElement> | undefined, rendered: unknown[] = []) => {
    const { i18n } = useTranslation();

    useIsomorphicLayoutEffect(() => {
        let ctx: gsap.Context = gsap.context(gsapCallback, ref || undefined);
        return () => {
            ctx && ctx.revert();
        }
    }, [ref, i18n.language,...rendered]);
}

export default useGsap;