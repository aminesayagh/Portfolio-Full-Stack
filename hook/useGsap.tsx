import { RefObject } from "react";
import { useTranslation } from "react-i18next";
import { useIsomorphicLayoutEffect } from "react-use";

import { gsap } from "@/utils/gsap";

const useGsap = (
  gsapCallback: gsap.ContextFunc,
  ref: RefObject<HTMLDivElement> | RefObject<HTMLCanvasElement> | undefined,
  rendered: unknown[] = []
) => {
  const { i18n } = useTranslation();

  useIsomorphicLayoutEffect(() => {
    const ctx: gsap.Context = gsap.context(gsapCallback, ref || undefined);
    return () => {
      ctx && ctx.revert();
    };
  }, [ref, i18n.language, ...rendered]);
};

export default useGsap;
