import React, { ElementRef, useRef, useState } from "react";
import { useIsomorphicLayoutEffect } from "react-use";

import { CursorContent } from "@/components/ui/cursor";
import { gsap } from "@/utils/gsap";

const Item = ({
  children,
  defaultColor = "var(--color-white-100)"
}: {
  children: string;
  defaultColor?: `var(--color-${string})`;
}) => {
  const ref = useRef<ElementRef<"div">>(null);

  const [onHoverStart, setOnHoverStart] = useState(false);
  const [onHoverEnd, setOnHoverEnd] = useState(false);

  useIsomorphicLayoutEffect(() => {
    const ctx = gsap.context(() => {
      const timeline = gsap.timeline({
        paused: true,
        defaults: {
          duration: 0.15
        }
      });
      timeline
        .fromTo(
          ".item-child-grap",
          {
            yPercent: 0,
            skewY: 0,
            color: defaultColor
          },
          {
            yPercent: -100,
            skewY: 5,
            color: defaultColor,
            ease: "power4.easeIn"
          }
        )
        .fromTo(
          ".item-child-grap",
          {
            yPercent: 100,
            skewY: 5,
            color: "var(--color-primary-500)"
          },
          {
            yPercent: 0,
            skewY: 0,
            ease: "power4.easeOut",
            color: "var(--color-primary-500)"
          }
        )
        .progress(0);
      gsap.set(".item-child-grap", {
        yPercent: 0,
        skewY: 0,
        color: "var(--color-white-100)"
      });
      ref.current?.addEventListener("pointerenter", () => {
        if (onHoverStart) return;
        if (onHoverEnd) return;
        setOnHoverStart(true);
        timeline?.play().then(() => setOnHoverStart(false));
      });
      ref.current?.addEventListener("pointerleave", () => {
        if (onHoverEnd) return;
        if (onHoverStart) return;
        setOnHoverEnd(true);
        timeline?.reverse().then(() => setOnHoverEnd(false));
      });
      return () => {
        ref.current?.removeEventListener("mouseenter", () => {
          timeline?.play();
        });
        ref.current?.removeEventListener("mouseleave", () => {
          timeline?.reverse();
        });
        timeline?.kill();
      };
    }, ref);
    return () => {
      ctx.revert();
    };
  }, [ref, defaultColor]);
  return (
    <CursorContent
      name={`cursorPointer_header_email`}
      component="CursorEvent"
      props={{
        event: "pointer"
      }}
    >
      <div className="relative overflow-hidden" ref={ref}>
        <div className="flex w-auto cursor-pointer item-child-grap">
          {children}
        </div>
      </div>
    </CursorContent>
  );
};

export default Item;
