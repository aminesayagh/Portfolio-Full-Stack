import type { RefObject } from "react";

import { useLocale } from "next-intl";
import { useIsomorphicLayoutEffect } from "react-use";

import { gsap } from "@/utils/gsap";

const useGsap = (
  gsapCallback: gsap.ContextFunc,
  ref: RefObject<HTMLDivElement> | RefObject<HTMLCanvasElement> | undefined,
  rendered: unknown[] = []
) => {
  const locale = useLocale();

  useIsomorphicLayoutEffect(() => {
    const ctx: gsap.Context = gsap.context(gsapCallback, ref || undefined);
    return () => {
      if (ctx) ctx.revert();
    };
  }, [ref, locale, ...rendered]);
};

export default useGsap;
