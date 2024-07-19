import { useTranslation } from "next-i18next";
import { ElementRef, useMemo, useRef, memo } from "react";
import { useIsomorphicLayoutEffect } from "react-use";
import { twMerge } from "tailwind-merge";

import Image from "@/components/ui/image";
import { text, title } from "@/components/ui/typography";
import { getProjectsByCategory } from "@/conf/projects";
import { useLenis } from "@/lib/Lenis";
import { gsap, Power4, ScrollTrigger } from "@/utils/gsap";

const Case = ({
  picture,
  index,
  id
}: {
  picture?: [string];
  index: number;
  id: string;
}) => {
  const container = useRef<ElementRef<"div">>(null);
  const { t } = useTranslation();
  const lenis = useLenis();

  useIsomorphicLayoutEffect(() => {
    const ctx = gsap.context(() => {
      const tl2: gsap.core.Timeline = gsap
        .timeline({
          paused: true
        })
        .to(".fixed-gsap", {
          ease: "none"
        });

      const isTouchDevice =
        "ontouchstart" in window || navigator.maxTouchPoints > 0;
      ScrollTrigger.create({
        animation: tl2,
        pin: true,
        pinnedContainer: container.current,
        trigger: container.current,
        scrub: true,
        pinType: isTouchDevice ? undefined : "fixed",

        start: "top top",
        end: index < 2 ? "bottom top" : "bottom bottom",
        toggleActions: "play pause reverse pause",
        invalidateOnRefresh: true
      });

      const tl = gsap.timeline({
        paused: true
      });
      tl.fromTo(
        ".image-gsap",
        {
          scale: 1
        },
        {
          scale: 1.3,
          transformOrigin: "center 10%",
          ease: "Power3.easeIn"
        }
      )
        .fromTo(
          ".image-gsap",
          {
            backgroundPosition: "center 20%"
          },
          {
            backgroundPosition: "center 80%",
            ease: "Power3.easeOut"
          },
          0
        )
        .fromTo(
          ".image-gsap",
          {
            filter: "blur(0px)"
          },
          {
            filter: "blur(10px)",
            ease: "Power4.easeIn"
          },
          "<"
        );

      ScrollTrigger.create({
        animation: tl,
        trigger: container.current,
        scrub: true,
        start: "top top",
        end: "bottom top",
        invalidateOnRefresh: true
      });

      const tlCase = gsap
        .timeline({
          paused: true,
          scrollTrigger: {
            trigger: container.current,
            start: "top bottom-=35%",
            end: "bottom center",
            markers: false,
            toggleActions: "play none play none",
            invalidateOnRefresh: true
          }
        })
        .fromTo(
          ".case-text-gsap",
          {
            xPercent: -100,
            opacity: 0
          },
          {
            xPercent: 0,
            opacity: 1,
            duration: 1,
            stagger: 0.2,
            ease: Power4.easeInOut
          }
        );

      return () => {
        tl.kill();
        tl2?.kill();
        tlCase.kill();
      };
    }, container);
    return () => {
      ctx.revert();
    };
  }, [container, lenis, picture, index, id]);

  const zIndexContainer = useMemo(() => 10 + (index + 10), [index]);
  const zIndexImage = useMemo(() => 10 + (index + 11), [index]);
  const zIndexContent = useMemo(() => 10 + (index + 14), [index]);
  const zIndexGradient = useMemo(() => 10 + (index + 13), [index]);
  const name = useMemo(() => t(`projects.${id}.title`), [t, id]);
  const description = useMemo(() => t(`projects.${id}.description`), [t, id]);
  const pic = useMemo<string>(() => (picture ? picture[0] : ""), [picture]);

  return (
    <div
      data-scroll
      className={twMerge(
        "relative h-[110vh] xxs:h-[120vh] sm:h-[140vh] overflow-hidden will-change-transform-animation"
      )}
      ref={container}
      style={{
        zIndex: zIndexContainer
      }}
    >
      <div className="absolute inset-x-0 top-0 w-full h-screen fixed-gsap">
        <Image
          src={pic}
          alt={description}
          className="object-cover h-screen image-gsap"
          priority={false}
          loading="lazy"
          sizes="100vw"
          width="6000"
          height="4500"
          style={{
            zIndex: zIndexImage
          }}
        />
      </div>
      <div className="absolute inset-x-0 top-0 w-full h-screen min-h-screen bg-no-repeat bg-cover fixed-gsap">
        <div
          data-scroll
          data-scroll-speed="3"
          className={twMerge(
            "relative w-fit flex flex-col justify-end h-full",
            "px-5 xs:px-10 lg:px-24 py-32 xs:py-24 mdl:py-32",
            "gap-2 xs:gap-4 content-gsap will-change-transform-animation"
          )}
          style={{
            zIndex: zIndexContent
          }}
        >
          <div className="w-full overflow-hidden">
            {/* <Title h1 degree='1' className='case-text-gsap will-change-transform-animation' >
                        {name}
                    </Title> */}
            <h1
              className={title(
                {
                  size: "h1",
                  degree: "1"
                },
                "case-text-gsap will-change-transform-animation"
              )}
            >
              {name}
            </h1>
          </div>
          <div className="hidden w-full overflow-hidden xs:w-8/12 md:w-1/2 sm:block">
            <p
              className={text(
                {
                  size: "md",
                  degree: "2"
                },
                "case-text-gsap will-change-transform-animation"
              )}
            >
              {description}
            </p>
          </div>
        </div>
        <div
          className={twMerge(
            "absolute inset-x-0 w-full h-80 -bottom-2 xs:h-72",
            "bg-gradient-to-t from-black-100/80 to-black-100/0"
          )}
          style={{
            zIndex: zIndexGradient
          }}
        ></div>
      </div>
    </div>
  );
};

const CaseHead = () => {
  const { t } = useTranslation();

  return (
    <>
      <h2
        className={title(
          {
            size: "h2",
            weight: "bold",
            degree: "2"
          },
          "sm:w-min"
        )}
      >
        {t("cases.title")}
      </h2>
      <div className="w-full xs:w-9/12 sm:w-7/12 md:w-6/12 lg:w-5/12 xl:w-4/12">
        <p
          className={text(
            {
              size: "md",
              degree: "3",
              weight: "semibold"
            },
            "w-auto max-w-[38rem] sm:max-w-xl my-2 md:my-4"
          )}
        >
          {t("cases.description")}
        </p>
      </div>
    </>
  );
};

const CaseHeadMemo = memo(CaseHead);

const Cases = () => {
  const projectsImported = useMemo(() => getProjectsByCategory("best"), []);

  return (
    <div className="flex flex-col w-full gap-14 sm:gap-12 h-fit">
      <div
        data-scroll
        className="flex flex-col items-start justify-between w-full gap-2 sm:flex-row sm:items-end sm:gap-12"
      >
        <CaseHeadMemo />
      </div>
      <div className="flex flex-col w-full gap-0 overflow-hidden h-fit rounded-2xl">
        {projectsImported.map((project, index) => (
          <Case
            key={project.id}
            picture={project?.picture}
            index={index}
            id={project.id}
          />
        ))}
      </div>
    </div>
  );
};

export default Cases;
