"use client";
import React, {
  useState,
  useCallback,
  memo,
  useEffect,
  useRef,
  useMemo
} from "react";

import { useTranslations } from "next-intl";
import { useIsomorphicLayoutEffect } from "react-use";
import { twMerge } from "tailwind-merge";

import { useRouter, usePathname } from "@/i18n/routing";
import HamburgerMenu from "@/components/common/HamburgerMenu";
import Button from "@/components/ui/button";
import { containerStyle } from "@/components/ui/container";
import Logo from "@/components/ui/logo";
import Navbar from "@/components/ui/navbar";
import Modal from "@/components/ui/overlay/modal";
import { usePreloader } from "@/components/ui/preloader";
import { text, title, Link } from "@/components/ui/typography";
import { getMenuItems } from "@/conf/router";
import { useLenis } from "@/lib/Lenis";
import { gsap, Power3, ScrollTrigger } from "@/utils/gsap";

import SwitchLang from "./SwitchLang";

const GAP_SIZE_LG = "gap-4 sm:gap-6 lg:gap-7 xl:gap-8";
const GAP_SIZE_XL = "gap-8 mdl:gap-12";
const BASE_LOCALE_MENU = "header.menu";
const BASE_LOCALE_SOCIAL = "socialNetwork";

const DURATION = 0.4;
const TRANSLATE_Y = -110;

const menuHamburgerItems = getMenuItems("hamburger");
const menuSocialNetworks = getMenuItems("socialNetworks");

const Header = () => {
  const t = useTranslations();
  const router = useRouter();
  const pathname = usePathname();
  const [openMenu, setOpenMenu] = useState<boolean>(false);
  const { endLoading } = usePreloader();
  const lenis = useLenis();

  const tl = useRef<gsap.core.Timeline>(gsap.timeline({ paused: true }));
  const ctx = useRef<gsap.Context>(null);

  useIsomorphicLayoutEffect(() => {
    ctx.current = gsap.context(self => {
      self.add("open", () => {
        tl.current
          .fromTo(
            [".modal-overlay", ".modal-content"],
            {
              opacity: 1,
              yPercent: TRANSLATE_Y,
              transformOrigin: "right top",
              skewY: 2,
              onStartParams: []
            },
            {
              duration: DURATION,
              ease: Power3.easeInOut,
              yPercent: 0,
              skewY: 0,
              stagger: {
                amount: 0.2
              }
            }
          )
          .to(
            [".subElement-item"],
            {
              duration: DURATION / 2,
              yPercent: 100,
              ease: Power3.easeInOut
            },
            "<"
          )
          .from(".modal-item", {
            duration: DURATION / 2,
            yPercent: 100,
            opacity: 0,
            ease: Power3.easeInOut,
            stagger: {
              amount: 0.2
            }
          })
          .fromTo(
            ".modal-close",
            {
              display: "none",
              opacity: 0
            },
            {
              opacity: 1,
              ease: Power3.easeInOut,
              duration: DURATION / 2,
              display: "block"
            }
          )
          .from(
            ".modal-description",
            {
              duration: DURATION,
              yPercent: 100,
              opacity: 0,
              ease: Power3.easeInOut
            },
            "<"
          )
          .from(
            ".modal-footer",
            {
              duration: DURATION / 2,
              yPercent: 100,
              opacity: 0,
              transformOrigin: "center bottom",
              ease: Power3.easeInOut
            },
            "<50%"
          )
          .from(
            ".modal-item-info",
            {
              xPercent: -100,
              transformOrigin: "left center",
              ease: Power3.easeInOut,
              duration: DURATION / 2
            },
            "<25%"
          );
        tl.current.play();
      });
      self.add("close", () => {
        tl.current
          .reverse()
          .then(() => {
            const current = ctx.current;
            if (!current) return null;
            setOpenMenu(false);
            current.revert(); // revert timeline to the beginning
            return null;
          })
          .catch(err => console.error(err));
      });
    });
    return () => {
      const currentCtx = ctx.current;
      const currentTl = tl.current;
      if (currentCtx) currentCtx.revert();
      if (currentTl) currentTl.kill();
    };
  }, []);
  useIsomorphicLayoutEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap
        .timeline({
          paused: true
        })
        .from(".navbar_gsap", {
          delay: 0.3,
          yPercent: 160,
          duration: 0.5
        });
      const scrollTrigger = ScrollTrigger.create({
        trigger: ".navbar_gsap",
        markers: false,
        toggleActions: "play pause none pause",
        animation: tl
      });
      scrollTrigger.disable();
      if (endLoading) {
        scrollTrigger.enable();
        tl.play();
        return () => {
          tl.kill();
        };
      }
      return null;
    });
    return () => ctx.revert();
  }, [endLoading]);
  const menuHandler = useCallback(() => {
    if (!openMenu) {
      setOpenMenu(true);
    } else {
      const current = ctx.current;
      if (current) {
        current["close"]();
      }
    }
  }, [openMenu, ctx]);
  useEffect(() => {
    if (openMenu) {
      const current = ctx.current;
      if (current) current["open"]();
    }
  }, [openMenu]);

  const idTimeout = useRef<NodeJS.Timeout | null>(null);

  const scrollToId = useCallback(
    (path: string, id: string | null = null) => {
      router.push(path);
      if (id && lenis && lenis.scrollTo) {
        lenis.scrollTo(`#${id}`);
      }
    },
    [lenis]
  );

  const onButtonClick = useCallback(
    (path: string, id?: string) => {
      if (!openMenu) {
        router.push(path);
      } else {
        tl.current
          .reverse()
          .then(() => {
            setOpenMenu(false);
            idTimeout.current = setTimeout(() => {
              scrollToId(path, id);
            }, 20);
            return null; // Return value to satisfy promise/always-return
          })
          .catch(err => console.error(err));
      }
    },
    [openMenu, scrollToId, idTimeout]
  );

  useEffect(() => {
    return () => {
      if (!!idTimeout.current) clearTimeout(idTimeout.current);
    };
  }, []);

  const pageName = useMemo(() => pathname.split("/")[1], [router]);
  return (
    <Modal isOpenExternal={openMenu} menuHandler={menuHandler}>
      <Navbar size="lg" inTopOfScroll={openMenu} className="overflow-hidden">
        <span className="flex flex-row items-center justify-between w-full navbar_gsap">
          <Navbar.Brand>
            <span>
              <Logo href="/" size={64} alt={t("header.logo")} mode="dark" />
            </span>
          </Navbar.Brand>
          <Navbar.Content
            className={twMerge(
              "flex-1 justify-end overflow-hidden",
              GAP_SIZE_LG
            )}
          >
            {!openMenu && <SwitchLang />}
            <span
              className={twMerge(
                "w-[1.4px] bg-gray-200 h-[13px] rotate-[25deg] hidden mdl:block",
                openMenu ? "hidden w-0" : ""
              )}
            />
            <Button
              onPress={() =>
                onButtonClick(pageName !== "contact" ? "/contact" : "/")
              }
              size="sm"
              degree="1"
              className={text(
                {
                  size: "xs",
                  degree: "1",
                  weight: "semibold"
                },
                "py-2 border-none overflow-hidden",
                "subElement-item hidden sm:block",
                openMenu ? "hidden w-0" : ""
              )}
            >
              {pageName !== "contact" ? t("header.action") : t("header.home")}
            </Button>
            <Button
              // on press scroll to the project section
              onPress={() => scrollToId("/#cases")}
              size="sm"
              degree="1"
              className={text(
                {
                  size: "xs",
                  degree: "1",
                  weight: "semibold"
                },
                "py-2 border-none overflow-hidden",
                "subElement-item hidden sm:block",
                openMenu ? "hidden w-0" : "",
                "relative transition-colors duration-300",
                "hover:text-primary-500",
                "after:content-[''] after:w-full after:absolute after:bottom-0 after:left-0 after:h-[4px] after:bg-primary-500",
                "hover:after:animate-underline",
                "not-hover:after:animate-underlineExit"
              )}
            >
              {t("header.project")}
            </Button>
            <Modal.Button>
              {({ handler, isOpen }) => {
                return (
                  <div
                    className={twMerge(
                      "flex flex-row items-center gap-6 justify-end"
                    )}
                  >
                    <button
                      className="hidden overflow-hidden cursor-pointer xxs:block"
                      onClick={() => handler()}
                      aria-label="menu"
                      aria-haspopup="true"
                    >
                      <p
                        className={text(
                          {
                            size: "xs",
                            degree: "3",
                            weight: "semibold"
                          },
                          "mr-2 hidden",
                          "modal-close"
                        )}
                      >
                        Menu
                      </p>
                    </button>
                    <HamburgerMenu isOpen={isOpen} setOpen={handler} />
                  </div>
                );
              }}
            </Modal.Button>
            <Modal.Overlay
              className={twMerge(
                "opacity-0 fixed left-0 top-0 w-full min-h-full bg-primary-500 modal-overlay"
              )}
            >
              {/* <Cursor > */}
              <Modal.Content
                isDismissable
                className={twMerge("body-background modal-content")}
              >
                {({}) => (
                  <div
                    className={twMerge(
                      "flex flex-col justify-between",
                      "min-h-screen w-screen",
                      "py-8 sm:py-12",
                      containerStyle({ size: "lg" })
                    )}
                  >
                    <div className="h-5 xxs:h-0" />
                    <div
                      className={twMerge(
                        "flex flex-col sm:flex-row sm:justify-between",
                        "gap-10 sm:gap-0",
                        "items-start sm:items-end md:items-center"
                      )}
                    >
                      <ul
                        className={twMerge(
                          "flex flex-col gap-6 lg:gap-4",
                          "w-full sm:w-8/12"
                        )}
                      >
                        {menuHamburgerItems.map((item, index) => {
                          return (
                            <li
                              key={item.id + "_" + index}
                              className={twMerge(
                                "flex flex-col items-start",
                                "overflow-hidden"
                              )}
                            >
                              <div
                                className={twMerge(
                                  "flex flex-row justify-start items-start relative cursor-pointer",
                                  "modal-item"
                                )}
                              >
                                <Button
                                  size="auto"
                                  onPress={() => {
                                    onButtonClick(item.link, item.id);
                                  }}
                                  degree="1"
                                  name="menuItem"
                                  className={twMerge(
                                    "capitalize relative text-white-600 bg-black-100 z-10 hover:text-primary-500",
                                    "text-7xl sm:text-8xl mdl:text-9xl lg:text-15xl xl:text-[5rem] font-bold leading-tight tracking-wide transition-colors duration-150"
                                  )}
                                >
                                  {t(
                                    `${BASE_LOCALE_MENU}.${item.id}.attribute`
                                  )}
                                </Button>
                                <span className="overflow-hidden">
                                  {t(`${BASE_LOCALE_MENU}.${item.id}.more`) !==
                                  "null" ? (
                                    <p
                                      className={text(
                                        {
                                          size: "xs",
                                          degree: "4",
                                          weight: "semibold"
                                        },
                                        "absolute overflow-hidden left-[calc(100%_+_4px)] w-full top-[19%] modal-item-info"
                                      )}
                                    >
                                      {t(`${BASE_LOCALE_MENU}.${item.id}.more`)}
                                    </p>
                                  ) : null}
                                </span>
                              </div>
                            </li>
                          );
                        })}
                      </ul>
                      <div
                        className={twMerge(
                          "flex flex-col gap-2 xxs:gap-4",
                          "w-full xxs:max-w-[75%] sm:max-w-[32%] mdl:w-min"
                        )}
                      >
                        <span className="overflow-hidden mdl:w-max">
                          <h6
                            className={title(
                              {
                                size: "h6",
                                degree: "2",
                                weight: "bold"
                              },
                              "overflow-hidden tracking-widest uppercase modal-description"
                            )}
                          >
                            {t("header.description.title")}
                          </h6>
                        </span>
                        <span className="mr-1 overflow-hidden w-fit mdl:mr-6">
                          {/* <Text
                            p
                            degree="4"
                            size="xs"
                            className="overflow-hidden modal-description"
                          >
                            {t("header.description.content")}
                          </Text> */}
                          <p
                            className={text(
                              {
                                size: "xs",
                                degree: "4",
                                weight: "semibold"
                              },
                              "overflow-hidden modal-description"
                            )}
                          >
                            {t("header.description.content")}
                          </p>
                        </span>
                      </div>
                    </div>
                    <div
                      className={twMerge(
                        "flex flex-col xxs:flex-row justify-between items-start xxs:items-end",
                        "gap-2 xxs:gap-0"
                      )}
                    >
                      <div
                        className={twMerge(
                          "flex flex-row justify-start items-center",
                          "order-2 xxs:order-1",
                          "overflow-hidden"
                        )}
                      >
                        <p
                          className={text(
                            {
                              size: "sm",
                              degree: "4",
                              weight: "semibold"
                            },
                            "modal-footer"
                          )}
                        >
                          {t("header.copyright")}
                        </p>
                      </div>
                      <ul
                        className={twMerge(
                          "flex flex-row items-center justify-end order-1 xxs:order-2",
                          GAP_SIZE_XL
                        )}
                      >
                        {menuSocialNetworks.map((item, index) => (
                          <li key={item.id + "_" + index} className="overflow-hidden">
                            <Link
                              size="sm"
                              href={item.link}
                              degree="4"
                              weight="semibold"
                              className="modal-footer"
                            >
                              {t(`${BASE_LOCALE_SOCIAL}.${item.id}.key`)}
                            </Link>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                )}
              </Modal.Content>
            </Modal.Overlay>
          </Navbar.Content>
        </span>
      </Navbar>
    </Modal>
  );
};

const HeaderMemo = memo(Header);
export default HeaderMemo;
