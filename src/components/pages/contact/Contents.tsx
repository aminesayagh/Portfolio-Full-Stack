"use client";

import React, { useMemo, useRef } from "react";

import { useTranslations } from "next-intl";
import { useIsomorphicLayoutEffect } from "react-use";
import { cn } from "@/lib/utils";

import Container from "@/components/ui/container";
import { text, Link, display } from "@/components/ui/typography";
import { getMenuItems } from "@/i18n/routing";
import { useTime } from "@/hook";
import { gsap } from "@/utils/gsap";

import AgencyList from "./AgencyList";
import ContactForm from "./ContactForm";

const GRID_DEFAULT_CLASS = "col-start-1 col-span-12";

const ContactPage = () => {
  const t = useTranslations();
  const contactRef = useRef<HTMLDivElement>(null);

  const socialNetworkItems = useMemo(() => getMenuItems("socialNetwork"), []);

  const timer = useTime({
    city: "Casablanca",
    country: "Africa",
    format: "HH:mm"
  });

  useIsomorphicLayoutEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap
        .timeline({
          scrollTrigger: {
            trigger: "#contact",
            start: "top 60%",
            toggleActions: "play play restart play",
            markers: false
          }
        })
        .from(".splitText_gsap", {
          yPercent: 220,
          skewY: 7,
          duration: 1.2,
          ease: "Power4.easeOut",
          delay: 0.2
        });
      return () => tl.kill();
    });
    return () => ctx.revert();
  }, []);
  return (
    <div ref={contactRef}>
      <Container
        as="section"
        size="lg"
        data-scroll-section
        id="contact"
        className={cn("flex flex-col gap-12", "items-stretch")}
      >
        <section className={cn("flex flex-col gap-14 xl:gap-20 py-40")}>
          {/* title */}
          <div className="grid grid-cols-12 gap-4 overflow-hidden">
            <h1
              className={display(
                {
                  size: "xl",
                  weight: "bold"
                },
                "col-start-1 col-span-12",
                "mdl:col-start-4 mdl:col-span-9",
                "lg:col-start-3 lg:col-span-10",
                "splitText_gsap"
              )}
            >
              {t("contact.title")}
            </h1>
          </div>
          {/* form */}
          <div
            className={cn(
              "grid grid-cols-12 gap-y-10 gap-x-0 xxs:gap-8 sm:gap-3 md:gap-8 mdl:gap-4 xl:gap-8",
              "grid-rows-[repeat(3,_minmax(0,_auto))] xxs:grid-rows-[repeat(2,_minmax(0,_auto))] sm:grid-rows-2"
            )}
          >
            <div
              className={cn(
                "flex flex-col gap-3",
                GRID_DEFAULT_CLASS,
                "xxs:col-start-1 xxs:col-span-4",
                "sm:col-start-10 sm:col-span-3",
                "mdl:col-start-1 mdl:col-span-2",
                "row-start-1 row-span-1"
              )}
            >
              <p
                className={text(
                  {
                    size: "sm",
                    weight: "medium",
                    degree: "2"
                  },
                  "uppercase text-start"
                )}
              >
                {t("contact.subtitle")}
              </p>
              <hr className="relative h-[2px] w-4 bg-gray-200" />
            </div>
            <div
              className={cn(
                GRID_DEFAULT_CLASS,
                "xxs:col-start-1 xxs:col-span-12",
                "xs:col-start-1 xs:col-span-11",
                "sm:col-start-1 sm:col-span-9",
                "mdl:col-start-4 mdl:col-span-9",
                "lg:col-start-3 lg:col-span-9",
                "xl:col-start-3 xl:col-span-8",
                "row-start-3 row-span-1",
                "xxs:row-start-2 xxs:row-span-1",
                "sm:row-start-1 sm:row-span-2"
              )}
            >
              <ContactForm />
            </div>
            <div
              className={cn(
                "flex flex-col sm:justify-end items-start xl:items-end",
                GRID_DEFAULT_CLASS,
                "xxs:col-start-8 xxs:col-span-4",
                "sm:col-start-10 sm:col-span-3",
                "mdl:col-start-1 mdl:col-span-3",
                "lg:col-start-1 lg:col-span-2",
                "xl:col-start-11 xl:col-span-2",
                "row-start-2 row-span-1",
                "xxs:row-start-1 xxs:row-span-1",
                "sm:row-start-2 sm:row-span-1"
              )}
            >
              <div className="flex flex-col gap-1">
                <p
                  className={text({
                    size: "sm",
                    degree: "2",
                    weight: "medium"
                  })}
                  suppressHydrationWarning
                >
                  {t("contact.localTime")} {timer?.formattedTime}
                </p>
                <p
                  className={text({
                    size: "sm",
                    degree: "2",
                    weight: "medium"
                  })}
                  suppressHydrationWarning
                >
                  {t("contact.gmtTime")}({timer?.gmtOffset})
                </p>
              </div>
            </div>
          </div>
          <span className="h-6 md:h-10" />
          {/* repped */}
          <div
            className={cn("grid grid-cols-12 gap-x-0 gap-y-8 xs:gap-8")}
          >
            <div
              className={cn(
                "flex flex-col",
                "gap-3",
                "col-start-1 col-span-12",
                "sm:col-start-1 sm:col-span-2"
              )}
            >
              <p
                className={text(
                  {
                    size: "sm",
                    degree: "2",
                    weight: "medium"
                  },
                  "uppercase text-start"
                )}
              >
                {t("contact.reppedBy")}
              </p>
              <hr className="relative h-[2px] w-4 bg-gray-200" />
            </div>
            <div
              className={cn(
                GRID_DEFAULT_CLASS,
                "xs:col-start-1 xs:col-span-11",
                "sn:col-start-1 sm:col-span-9",
                "mdl:col-start-3 mdl:col-span-8",
                "lg:col-start-3 lg:col-span-7",
                "xl:col-start-3 xl:col-span-6"
              )}
            >
              <AgencyList />
            </div>
            <div
              className={cn(
                "flex flex-row flex-wrap sm:flex-col gap-x-10 xs:gap-x-12 gap-y-4 sm:gap-4 justify-start xs:justify-end items-end",
                GRID_DEFAULT_CLASS,
                "xs:col-start-1 xs:col-span-11",
                "sm:col-start-11 sm:col-span-2"
              )}
            >
              {socialNetworkItems.map((item, index) => (
                <Link
                  key={item.path + "_" + index}
                  weight="medium"
                  href={item.path}
                  size="sm"
                  degree="2"
                >
                  {t(`socialNetwork.${item.id}.name`)}
                </Link>
              ))}
            </div>
          </div>
        </section>
      </Container>
    </div>
  );
};

export default ContactPage;
