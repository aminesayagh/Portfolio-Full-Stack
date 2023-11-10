import { useContext, RefObject } from "react"
import { useIsomorphicLayoutEffect, useWindowSize } from "react-use";
import useResizeObserver from 'use-resize-observer';
import { useDebounce } from '@/hook/useDebounce';

import { gsap } from "@/utils/gsap";
import { useLocomotiveScroll } from "@/lib/LocomotiveScroll";
import { useTranslation } from "react-i18next";
const useGsap = (gsapCallback: gsap.ContextFunc, ref: RefObject<HTMLDivElement> | RefObject<HTMLCanvasElement> | undefined, rendered: any[] = []) => {
    const { i18n } = useTranslation();

    useIsomorphicLayoutEffect(() => {
        let ctx: gsap.Context = gsap.context(gsapCallback, ref || undefined);
        return () => {
            ctx && ctx.revert();
        }
    }, [ref, i18n.language,...rendered]);
}

export default useGsap;