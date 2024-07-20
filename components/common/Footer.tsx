import _ from "lodash";
import { useTranslation } from "next-i18next";
import {
  ElementRef,
  useRef,
  useEffect,
  useCallback,
  memo,
  useState,
  Fragment
} from "react";
import { useIsomorphicLayoutEffect } from "react-use";
import { twMerge } from "tailwind-merge";

import Button from "@/components/ui/button";
import { Icon } from "@/components/ui/icon";
import { Link, text, TextPropsExtended } from "@/components/ui/typography";
import { getMenuItems } from "@/conf/router";
import { useEventListener } from "@/hook/useEventListener";
import { useLenis } from "@/lib/Lenis";
import { gsap } from "utils/gsap";

const menuSocialNetworks = getMenuItems("socialNetworks");
const BASE_LOCALE_SOCIAL = "socialNetwork";

const ICON_SIZE_CLASS_NAME = "w-5 h-5 lg:w-6 lg:h-6";

const FollowUs = () => {
  const ref = useRef<ElementRef<"div">>(null);

  const ctx = useRef<gsap.Context | null>(null);

  useIsomorphicLayoutEffect(() => {
    if (!menuSocialNetworks.length) return;
    ctx.current = gsap.context(self => {
      const tl = gsap
        .timeline({
          paused: true
        })
        .fromTo(
          ".fallow-button-gsap",
          {
            xPercent: 0
          },
          {
            xPercent: 100,
            duration: 0.2,
            ease: "Power4.out"
          }
        )
        .to(".fallow-button-gsap", {
          width: 0,
          duration: 0.01
        })
        .fromTo(
          ".social-button-gsap",
          {
            xPercent: -100,
            opacity: 0
          },
          {
            opacity: 1,
            xPercent: 0,
            stagger: -0.07,
            duration: 0.3
          }
        );

      self.add("followButtonShow", () => {
        tl.play();
      });
      self.add("followButtonHide", () => {
        tl.reverse();
      });

      gsap.set(".social-button-gsap", {
        xPercent: -100,
        opacity: 0
      });
      gsap.set(".fallow-button-gsap", {
        xPercent: 0
      });
      return () => {
        tl.kill();
      };
    }, ref);
    return () => {
      ctx.current?.revert();
    };
  }, [ref, menuSocialNetworks.length]);
  const handler = useCallback(() => {
    if (!ctx.current) return;
    ctx.current["followButtonShow"]();
  }, [ctx]);
  const handlerLeave = useCallback(() => {
    if (!ctx.current) return;
    ctx.current["followButtonHide"]();
  }, [ctx]);
  useEventListener("mouseenter", handler, ref);
  useEventListener("mouseleave", handlerLeave, ref);

  const { t } = useTranslation();
  return (
    <div ref={ref} className="flex flex-row items-center justify-end gap-4">
      <ul className="flex flex-row items-center gap-8">
        {menuSocialNetworks.map((item, index) => (
          <li key={index} className="overflow-hidden list-none">
            <Link
              size="sm"
              href={item.link}
              degree="4"
              weight="semibold"
              className="social-button-gsap"
            >
              {t(`${BASE_LOCALE_SOCIAL}.${item.id}.key`)}
            </Link>
          </li>
        ))}
      </ul>
      <span className="flex overflow-hidden">
        <p
          className={text(
            {
              size: "sm",
              degree: "3",
              weight: "semibold"
            },
            "fallow-button-gsap whitespace-nowrap-important"
          )}
        >
          {t("footer.socialNetwork")}
        </p>
      </span>
      <Icon
        name="IconShare"
        size="24"
        className={twMerge("stroke-gray-400", ICON_SIZE_CLASS_NAME)}
      />
    </div>
  );
};

// const FollowUs = memo(FollowUs);

const TextAnimated = ({
  lang,
  phrase,
  className,
  ...props
}: {
  lang: string;
  phrase: string;
  className?: string;
} & TextPropsExtended) => {
  const container = useRef<ElementRef<"div">>(null);
  const refs = useRef<ElementRef<"div">[]>([]);
  const [body, setBody] = useState<React.JSX.Element[] | null>(null);

  useIsomorphicLayoutEffect(() => {
    if (!body) return;
    const ctx = gsap.context(() => {
      gsap.fromTo(
        ".word-gsap",
        {
          y: "100%"
        },
        {
          y: "0%",
          stagger: 0.04,
          duration: 0.3,
          ease: "power2.out",
          scrollTrigger: {
            trigger: container.current,
            start: "top bottom-=80px",
            toggleActions: "play none reverse reverse"
          }
        }
      );
    }, container);
    return () => {
      ctx.revert();
    };
  }, [body, lang]);
  useEffect(() => {
    setBody(null);
    const splitWords = _.map(phrase.split(" "), (word, index) => {
      return (
        <div key={index} className="py-px overflow-y-animate">
          <div
            ref={ref => {
              if (!ref) return;
              refs.current[index] = ref;
            }}
            className="word-gsap will-change-transform-animation"
          >
            {word}
          </div>
        </div>
      );
    });
    setBody(splitWords);
  }, [phrase, lang]);

  return (
    <span ref={container}>
      {/* <Text
        div
        className={twMerge("flex flex-row flex-wrap", className)}
        {...props}
      >
        {body
          ? body.map((word, index) => (
              <Fragment key={index}>{word} </Fragment>
            ))
          : null}
      </Text> */}
      <div
        className={text(
          {
            size: props.size,
            degree: props.degree,
            weight: props.weight
          },
          "flex flex-row flex-wrap",
          className
        )}
      >
        {body
          ? body.map((word, index) => <Fragment key={index}>{word} </Fragment>)
          : null}
      </div>
    </span>
  );
};

const GoToTop = ({ handler, name }: { handler: () => void; name: string }) => {
  const ref = useRef<HTMLButtonElement | null>(null);
  const ctx = useRef<gsap.Context | null>(null);

  useIsomorphicLayoutEffect(() => {
    ctx.current = gsap.context(self => {
      const tlIcon = gsap
        .timeline({
          paused: true
        })
        .fromTo(
          ".icon_gsap",
          {
            opacity: 1,
            yPercent: 0,
            xPercent: 0
          },
          {
            opacity: 0,
            yPercent: -100,
            xPercent: 100,
            duration: 0.3
          }
        )
        .fromTo(
          ".icon_gsap",
          {
            opacity: 0,
            yPercent: 100,
            xPercent: -100
          },
          {
            opacity: 1,
            yPercent: 0,
            duration: 0.3,
            xPercent: 0
          }
        );
      const tlText = gsap
        .timeline({
          paused: true
        })
        .fromTo(
          ".text_gsap",
          {
            opacity: 1,
            yPercent: 0
          },
          {
            opacity: 0,
            yPercent: -100,
            duration: 0.3
          }
        )
        .fromTo(
          ".text_gsap",
          {
            opacity: 0,
            yPercent: 100
          },
          {
            opacity: 1,
            yPercent: 0,
            duration: 0.3
          }
        );
      tlIcon.play();
      tlText.play();
      self.add("handlerGoToTop", () => {
        tlIcon.progress(0);
        tlText.progress(0);
        tlIcon.play();
        tlText.play();
      });
      self.add("handlerGoToTopLeave", () => {
        tlIcon.reverse();
        tlText.reverse();
      });
      return () => {
        tlIcon.kill();
        tlText.kill();
      };
    }, ref);

    return () => {
      ctx.current?.revert();
    };
  }, [ref]);

  const handlerMouse = useCallback(() => {
    if (!ctx.current) return;
    ctx.current["handlerGoToTop"]();
  }, [ctx]);
  const handlerMouseLeave = useCallback(() => {
    if (!ctx.current) return;
    ctx.current["handlerGoToTopLeave"]();
  }, [ctx]);

  useEventListener("mouseenter", handlerMouse, ref);
  useEventListener("mouseleave", handlerMouseLeave, ref);

  return (
    <Button
      ref={ref}
      onPress={() => handler()}
      className={twMerge(
        "flex flex-row justify-start items-center",
        "gap-6 md:gap-8",
        "uppercase"
      )}
    >
      <Icon
        name="IconArrowUpRight"
        size="24"
        className={twMerge("stroke-gray-400 icon_gsap", ICON_SIZE_CLASS_NAME)}
      />
      <p
        className={text(
          {
            size: "sm",
            weight: "semibold",
            degree: "3"
          },
          "text_gsap"
        )}
      >
        {name}
      </p>
    </Button>
  );
};

const GoToTopMemo = memo(GoToTop);

const Footer = () => {
  const {
    t,
    i18n: { language }
  } = useTranslation();
  // const { scrollTo } = useLocomotiveScroll();
  const lenis = useLenis();

  const goToTop = useCallback(() => {
    lenis && lenis.scrollTo(0);
  }, [lenis]);

  return (
    <>
      <div
        className={twMerge(
          language == "en"
            ? "max-w-[16rem] xxs:w-8/12 xs:max-w-[46vw] sm:max-w-[40vw] md:max-w-[32vw] mdl:max-w-[30vw] xl:max-w-[20vw] 2xl:max-w-[28vw] 3xl:max-w-[22rem]"
            : "max-w-[16rem] xxs:w-9/12 xs:max-w-[46vw] sm:max-w-[40vw] md:max-w-[32vw] mdl:max-w-[30vw] xl:max-w-[20vw] 2xl:max-w-[28vw] 3xl:max-w-[22rem]"
        )}
      >
        <TextAnimated
          lang={language}
          degree="3"
          weight="medium"
          size="md"
          className="justify-start max-w-xs uppercase gap-x-2"
          phrase={t("footer.state")}
        />
      </div>
      <div
        className={twMerge(
          "flex flex-row flex-wrap sm:flex-nowrap justify-between",
          "gap-y-4",
          "pb-10 pt-6"
        )}
      >
        <div className={twMerge("flex flex-row flex-1", "order-2 sm:order-1")}>
          <GoToTopMemo handler={goToTop} name={t("footer.action")} />
        </div>
        <div className="flex flex-row items-center justify-start flex-none order-1 grow-0 sm:justify-center sm:order-2">
          {/* <Text p degree="3" weight="semibold" size="sm" className="uppercase">
            {t("footer.name")}
          </Text> */}
          <p
            className={text(
              {
                size: "sm",
                degree: "3",
                weight: "semibold"
              },
              "uppercase"
            )}
          >
            {t("footer.name")}
          </p>
          <p
            className={text(
              {
                size: "sm",
                degree: "3",
                weight: "semibold"
              },
              "ml-2"
            )}
          >
            {t("footer.copy")}
          </p>
        </div>
        <div className="flex-1 order-3">
          <FollowUs />
        </div>
      </div>
    </>
  );
};

const FooterMemo = memo(Footer);
export default FooterMemo;
