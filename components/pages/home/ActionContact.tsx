import { useTranslation } from "next-i18next";
import React, { useRef } from "react";
import { useIsomorphicLayoutEffect } from "react-use";
import { twMerge } from "tailwind-merge";

import { CursorContent } from "@/components/ui/cursor";
import { Icon } from "@/components/ui/icon";
import { display, Link, text } from "@/components/ui/typography";
import { useLenis } from "@/lib/Lenis";
import { gsap } from "@/utils/gsap";

const CLASS_GSAP = {
  title: "contact-title-gsap",
  quota: "contact_quota_gsap",
  arrow: "contact-arrow-gsap"
};

const Action = () => {
  const { t, i18n } = useTranslation();
  const refContainer = useRef<HTMLDivElement>(null);
  const lenis = useLenis();

  useIsomorphicLayoutEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap
        .timeline({
          paused: true,
          scrollTrigger: {
            trigger: refContainer.current,
            scrub: true,
            start: "top center",
            end: "top top",
            toggleActions: "play pause reverse reverse",
            invalidateOnRefresh: true
          }
        })
        .fromTo(
          CLASS_GSAP.title,
          {
            yPercent: -100
          },
          {
            yPercent: 0,
            duration: 1,
            stagger: 0.4,
            ease: "Power3.easeOut"
          }
        )
        .fromTo(
          ".contact_quota_gsap",
          {
            opacity: 0,
            left: "-100%"
          },
          {
            opacity: 1,
            left: "0%"
          },
          "-=0.7"
        )
        .fromTo(
          ".contact-arrow-gsap",
          {
            opacity: 0,
            xPercent: -50
          },
          {
            xPercent: 0,
            duration: 0.5,
            opacity: 1,
            ease: "elastic.out(1, 0.6)"
          },
          "-=0.2"
        );

      return () => {
        tl.kill();
      };
    }, refContainer);
    return () => {
      ctx.revert();
    };
  }, [refContainer.current, lenis]);

  return (
    <div
      ref={refContainer}
      className={twMerge(
        "h-[64vh] flex flex-col gap-1 xs:gap-2 sm:gap-6",
        "justify-center items-start xs:items-center place-content-start"
      )}
    >
      <span className="overflow-hidden">
        <h1
          className={display(
            {
              size: "lg",
              weight: "bold"
            },
            "uppercase text-start xs:text-center",
            "contact-title-gsap will-change-transform-animation"
          )}
        >
          {t("contactCall.title")}
        </h1>
      </span>
      <div className="relative flex flex-row items-start justify-start xs:justify-center">
        <div
          className={twMerge(
            "absolute hidden xxs:block",
            "left-[103%] xs:right-[103%] rotate-180	xs:rotate-0",
            "right-auto xs:left-auto xs:top-1 will-change-transform-animation contact-arrow-gsap"
          )}
        >
          <Icon
            name="IconArrowBigRightFilled"
            className="w-[2.8rem] xs:w-12 md:w-14 lg:w-16 xl:w-20 [&>*]:fill-primary-400"
          />
        </div>
        <CursorContent
          name="CursorActionIconContactAction"
          component="CursorActionIcon"
          props={{
            degree: -45,
            iconName: "IconArrowUpRight"
          }}
          className="overflow-hidden"
        >
          <Link href="/contact">
            <h1
              className={display(
                {
                  size: "lg",
                  weight: "bold"
                },
                "whitespace-nowrap-important uppercase text-primary-400",
                "contact-title-gsap will-change-transform-animation"
              )}
            >
              {t("contactCall.action")}
            </h1>
          </Link>
        </CursorContent>
        <p
          className={text(
            {
              size: i18n.language == "en" ? "xxs" : "xs",
              degree: "3",
              weight: "medium"
            },
            "absolute left-[-1.5%] xs:left-auto sm:left-[103%]",
            "top-[100%] sm:top-[-6px]",
            "xs:right-[-1%] md:right-auto", // right
            "mt-3 xl:mt-4", // margin top
            "ml-2",
            i18n.language == "en"
              ? "w-32 xl:w-40 4xl:w-52"
              : "w-36 xl:w-46 4xl:w-52", // width
            "text-start xs:text-end sm:text-start"
          )}
        >
          {t("contactCall.description")}
        </p>
      </div>
    </div>
  );
};

export default Action;
