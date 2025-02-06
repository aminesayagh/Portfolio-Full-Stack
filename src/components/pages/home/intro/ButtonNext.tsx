
import { useRef, useCallback } from "react";
import { useIsomorphicLayoutEffect } from "react-use";
import { ANIMATION_GPU_OPTIMIZATION, cn } from "@/lib/utils";
import type { PressEvent } from "react-aria";

import Button from "@/components/ui/button";
import { Icon } from "@/components/ui/icon";
import { gsap } from "@/utils/gsap";
import { useEventListener } from "@/hook/useEventListener";

export type GoTOCases = ((e: PressEvent) => void) | undefined;

const GsapMagic = ({ children }: { children: React.ReactElement }) => {
  const ref = useRef<HTMLDivElement>(null);
  const ctx = useRef<gsap.Context | null>(null);

  useIsomorphicLayoutEffect(() => {
    if (!!ref.current) {
      ctx.current = gsap.context(self => {
        const xTo =
          ref.current &&
          gsap.quickTo(ref.current, "x", {
            duration: 1,
            ease: "elastic.out(1, 0.3)"
          });
        const yTo =
          ref.current &&
          gsap.quickTo(ref.current, "y", {
            duration: 1,
            ease: "elastic.out(1, 0.3)"
          });
        self.add("mouseMove", (e: { clientX: number; clientY: number }) => {
          const c = ref.current;
          if (!c){ return;}
          const { clientX, clientY } = e;
          const { left, top, width, height } = c.getBoundingClientRect();
          const x = clientX - (left + width / 2);
          const y = clientY - (top + height / 2);
          if (xTo) {xTo(x);}
          if (yTo) yTo(y);
        });
        self.add("mouseLeave", () => {
          if (xTo) xTo(0);
          if (yTo) yTo(0);
        });
      });
      return () => ctx.current?.revert();
    }
    return () => {};
  }, [ref]);
  const handleMouseEnter = useCallback(
    (e: MouseEvent) => {
      if (ctx.current) {ctx.current["mouseMove"](e);}
    },
    [ctx]
  );
  const handleMouseLeave = useCallback(
    (e: MouseEvent) => {
      if (ctx.current) {ctx.current["mouseLeave"](e);}
    },
    [ctx]
  );
  useEventListener(
    "mousemove",
    handleMouseEnter,
    ref as React.RefObject<HTMLDivElement>
  );
  useEventListener(
    "mouseleave",
    handleMouseLeave,
    ref as React.RefObject<HTMLDivElement>
  );

  return <div ref={ref}>{children}</div>;
};

const ButtonNext = ({ goToCases }: { goToCases: GoTOCases }) => {
  return (
    <GsapMagic>
      <Button
        onPress={goToCases}
        data-scroll
        className={cn(
          "relative bg-white-100",
          "rounded-full overflow-hidden",
          "next_button_gsap",
          ANIMATION_GPU_OPTIMIZATION
        )}
        aria-label="Go to cases"
        aria-haspopup="true"
      >
        <div className=" [&>*]:stroke-black-200 transition-colors duration-300 p-3 xxs:p-3 xs:p-4 md:p-5 xl:p-6">
          <Icon
            name="IconCornerLeftDown"
            className="stroke-1 size-8 xxs:size-7 sm:size-8 xl:size-10"
          />
        </div>
      </Button>
    </GsapMagic>
  );
};

export default ButtonNext;
