import { twMerge } from "tailwind-merge";
import React, { useRef, useContext, useEffect, useLayoutEffect, useMemo } from "react";
import { Text, Button, Display, Icon, Link, Fit } from '@/components/ui';
import { useTranslation } from "next-i18next";
import { gsap } from '@/utils/gsap';
import { MENU_ITEMS } from "@/conf/router";
import { ScrollProvider } from '@/context/ScrollContext';
import { useIsomorphicLayoutEffect } from "react-use";
import { useHover } from "react-aria";
import { useRouter } from 'next/router';

const GsapMagic = ({ children }: { children: React.ReactElement }) => {
    const ref = useRef<HTMLDivElement>(null);
    const xTo = useMemo(() => ref.current && gsap.quickTo(ref.current, 'x', { duration: 1, ease: 'elastic.out(1, 0.3)' }), [ref.current]);
    const yTo = useMemo(() => ref.current && gsap.quickTo(ref.current, 'y', { duration: 1, ease: 'elastic.out(1, 0.3)' }), [ref.current]);
    const { scrollbar } = useContext(ScrollProvider);

    useIsomorphicLayoutEffect(() => {
        const ctx = gsap.context(() => {
            if (!!ref.current) {
                const mouseMove = (e: any) => {
                    const { clientX, clientY } = e;
                    // @ts-ignore
                    const { left, top, width, height } = ref.current?.getBoundingClientRect();
                    const x = clientX - (left + width / 2);
                    const y = clientY - (top + height / 2);
                    xTo && xTo(x);
                    yTo && yTo(y);
                }
                const mouseLeave = (e: any) => {
                    xTo && xTo(0);
                    yTo && yTo(0);
                }

                ref.current.addEventListener('mousemove', mouseMove);
                ref.current.addEventListener('mouseleave', mouseLeave);
                return () => {
                    ref.current?.removeEventListener('mousemove', mouseMove);
                    ref.current?.removeEventListener('mouseleave', mouseLeave);
                }
            }
        });
        return () => ctx.revert();
    }, [scrollbar])
    return <div ref={ref} >
        {children}
    </div>
}

const GsapCircleBlue = ({ children, ...props }: { children: React.ReactElement, className: string }) => {
    const circle = useRef<HTMLDivElement>(null);
    const tl = useMemo(() => gsap.timeline({ paused: true }), []);
    const getPosition = (e: any) => {
        const { clientX, clientY } = e; // get the mouse position relative to the circle element
        const { left, top, width, height } = circle.current?.getBoundingClientRect() as DOMRect;
        const x = clientX - left;
        const y = clientY - top;
        return { x, y };
    }
    useIsomorphicLayoutEffect(() => {
        if (!!circle.current) {
            const mouseEnter = (e: any) => {
                const { x, y } = getPosition(e);

                // init the animation
                tl.clear();
                tl.fromTo(circle.current, {
                    background: `radial-gradient(circle at ${x}px ${y}px, #7E74F1 0%, #FEFEFE 0%)`,
                }, {
                    background: `radial-gradient(circle at ${x}px ${y}px, #7E74F1 100%, #FEFEFE 0%)`,
                    duration: 0.4,
                    ease: 'power4.out',
                });
                tl.play();

            }
            const mouseLeave = (e: any) => {
                const { x, y } = getPosition(e);

                tl.clear();
                tl.fromTo(circle.current, {
                    background: `radial-gradient(circle at ${x}px ${y}px, #7E74F1 100%, #FEFEFE 0%)`,
                }, {
                    background: `radial-gradient(circle at ${x}px ${y}px, #7E74F1 0%, #FEFEFE 0%)`,
                    duration: 0.4,
                    ease: 'power4.out',
                });
                tl.play();
            }

            circle.current.addEventListener('pointerenter', mouseEnter);
            circle.current.addEventListener('mouseleave', mouseLeave);
            return () => {
                circle.current?.removeEventListener('pointerenter', mouseEnter);
                circle.current?.removeEventListener('mouseleave', mouseLeave);
            }
        }
    }, []);

    return React.cloneElement(children, { ref: circle, className: twMerge(children.props.className, 'relative rounded-full bg-white-100') })
}

const ButtonNext = () => {
    return <GsapMagic>
        <GsapCircleBlue className="rounded-full bg-white-100">
            <div className={twMerge('', 'rounded-full overflow-hidden next_button_gsap')}  >
                <div className=' [&>*]:stroke-black-200 [&>*]:hover:stroke-black-200 transition-colors duration-300 p-3 xxs:p-3 xs:p-4 md:p-5 xl:p-6'>
                    <Icon name='IconCornerLeftDown' className='stroke-1 w-8 h-8 xxs:w-7 xxs:h-7 xs:w-8 xs:h-8 xl:w-10 xl:h-10' />
                </div>
            </div>
        </GsapCircleBlue>
    </GsapMagic>
}

const DISPLAY_1_CLASS_NAME = 'capitalize';
const DISPLAY_2_CLASS_NAME = 'uppercase italic text-primary-500';
const FullStack = ({ className }: { className: string }) => {
    const { t } = useTranslation();

    return (
        <>
            <div className={twMerge(
                className,
                'flex flex-col items-start xs:items-end justify-end',
                'pb-[1%] xxs:pb-[2%] xs:pb-[4.2%] lg:pb-[5.5%] xl:pb-[6.5%] 2xl:pb-2',
                'space-y-0 xs:-space-y-1 md:space-y-0 mdl:-space-y-1 lg:-space-y-[3%] xl:-space-y-[3%] 2xl:-space-y-[4.62%] 3xl:-space-y-2 4xl:space-y-0'
            )} >
                <span className='overflow-hidden'>
                    <Display size='md' weight='semibold' className={twMerge(DISPLAY_2_CLASS_NAME, 'tracking-[-0.05rem] sm:tracking-wider', 'splitText_fullStack_gsap')}>{t('intro.title.2_1')}</Display>
                </span>
                <span className='overflow-hidden'>
                    <Display size='md' weight='semibold' className={twMerge(DISPLAY_2_CLASS_NAME, 'tracking-[-0.05rem] sm:tracking-wider', 'splitText_fullStack_gsap')}>{t('intro.title.2_2')}</Display>
                </span>
            </div>
        </>
    )
}
const Title = () => {
    const { t, i18n } = useTranslation();

    return (<>
        {/* title 1  */}
        <div className={twMerge(
            // col
            'col-start-1 col-span-12',
            'xs:col-start-1 xs:col-span-9',
            'mdl:col-start-1 mdl:col-span-6',
            'xl:col-start-1 xl:col-span-6',
            '4xl:col-start-1 4xl:col-span-6',
            // row
            'row-start-1 row-span-1',
            'overflow-hidden',
        )} >
            <Fit weight='bold' degree='1' className={twMerge(DISPLAY_1_CLASS_NAME, 'splitText_gsap intro_scroll_gsap')}>{t('intro.title.1')}</Fit>
        </div>
        {/* description */}
        <div className={twMerge('flex flex-row xxs:flex-col justify-between items-start xs:hidden',
            'col-start-1 col-span-12 xxs:col-span-4 row-start-3 row-span-1 xxs:row-start-2 xxs:row-span-1')}>
            <div className='justify-items-start order-2 xxs:order-1 flex'>
                <ButtonNext />
            </div>
            <FullStack className='flex order-1 xxs:order-3' />
        </div>

        <div className={twMerge(
            // flex
            'flex flex-col xs:flex-row justify-between mdl:justify-end',
            'gap-6 xxs:gap-8 xs:gap-4 mdl:gap-2 lg:gap-4 2xl:gap-8 4xl:gap-28', // gap
            'pl-0 lg:pl-4 xl:pl-0', // pl
            'pt-0 xs:pt-2 xl:pt-3', // pt
            // grid position
            'max-w-[20rem] xxs:max-w-full',
            'col-start-1 col-span-12',
            'xxs:col-start-5 xxs:col-span-8', // none
            'xs:col-start-1 xs:col-span-12', // xxs
            'sm:col-start-2 sm:col-span-11', // sm
            'md:col-start-4 md:col-span-9', // md
            'mdl:col-start-7 mdl:col-span-6', // mdl
            i18n.language == 'en' ? 'xl:col-start-8 xl:col-span-5' : 'xl:col-start-7 xl:col-span-6', // xl
            '4xl:col-span-6 4xl:col-start-7', // 4xl
            // row grid
            'row-start-2 row-span-1', // none
            'mdl:row-start-1 mdl:row-span-1', //mdl
            // children
            "[&>*]:w-full [&>*]:xxs:w-11/12 [&>*]:xs:w-5/12 [&>*]:sm:w-5/12 [&>*]:mdl:w-1/2 [&>*]:xl:w-full [&>*]:4xl:w-4/12",
            '[&>*>span]:max-w-[14rem]',
            "[&>*]:flex [&>*]:flex-row [&>*]:justify-start [&>*]:sm:justify-end",
            "[&>*]:mdl:ml-2 [&>*]:lg:ml-0"
        )} >
            <div >
                <span data-scroll className='overflow-hidden h-fit'>
                    <Text p weight='semibold' size='sm' className={twMerge('text-start sm:text-end', 'w-full splitText_description_gsap')} degree="2">{t('intro.descriptions.1')}</Text>
                </span>
            </div>
            <div>
                <span data-scroll className='overflow-hidden h-fit'>
                    <Text p weight='semibold' size='sm' className={twMerge('text-start sm:text-end', 'w-full splitText_description_gsap')} degree='2'>{t('intro.descriptions.2')}</Text>
                </span>
            </div>
        </div>
        {/* button next */}
        <div className={twMerge(
            'mdl:w-2/12',
            'hidden xs:flex flex-col items-end mdl:items-start justify-end w-fit mdl:w-fit',
            'mt-1 lg:mt-4',
            'mb-0 xxs:mb-3 mdl:mb-0 lg:mb-4',
            'col-start-11 col-span-2',
            'mdl:col-span-2 mdl:col-start-1',
            'row-start-1 row-span-1',
            'mdl:row-start-2 mdl:row-span-1',
            'justify-self-end mdl:justify-self-start'
        )} >
            <ButtonNext />
        </div>
        <div className={twMerge(
            'hidden xs:flex',
            'row-start-3 row-span-1',
            'mdl:row-start-2 mdl:row-span-1',
            'col-start-1 col-span-3',
            'mdl:col-start-5 mdl:col-span-2',
            i18n.language == 'en' ? 'xl:col-start-5 xl:col-span-2' : 'xl:col-start-4 xl:col-span-2',
            'justify-self-end'
        )}>
            <FullStack className='hidden xxs:flex w-min' />
        </div>
        {/* DEVELOPER */}
        <div className={twMerge(
            'flex flex-col xxs:flex-row justify-start xs:justify-end',
            'row-start-4 row-span-1',
            'xxs:row-start-3 xxs:row-span-1',
            'mdl:row-start-2 mdl:row-span-1',
            'col-start-1 col-span-12',
            'xs:col-start-4 xs:col-span-9',
            'mdl:col-start-7 mdl:col-span-6', // xs
            i18n.language == 'en' ? 'xl:col-start-7 xl:col-span-6' : 'xl:col-start-6 xl:col-span-7', // xl
            'gap-2 sm:gap-1 md:gap-5 mdl:gap-8', // gap
            'justify-end mdl:justify-center items-end mdl:items-center',
            'overflow-hidden'
        )}>
            <Fit weight='bold' degree='1' className={twMerge(DISPLAY_1_CLASS_NAME, 'splitText_gsap')}>{t('intro.title.3')}</Fit>
        </div>
    </>)
}

const menuItems = {
    "1": MENU_ITEMS.manifesto.id,
    "2": MENU_ITEMS.experience.id,
    "3": MENU_ITEMS.cases.id,
    "4": MENU_ITEMS.contact.id
} as const;
const menuKeys = ['manifesto', 'experience', 'cases', 'contact'];

type MenuItems = keyof typeof menuItems;

const Item = ({ children }: {
    children: React.ReactElement,
}) => {
    let { isHovered, hoverProps } = useHover({
        onHoverStart: (e) => {
            gsap.timeline().itemMenuHoverPlay(e.target.children[0])
        },
        onHoverEnd: (e) => {
            gsap.timeline().itemMenuHoverReverse(e.target.children[0]);
        }
    });
    return <div {...hoverProps} className='cursor-pointer'>{
        children
    }</div>
}
const Menu = () => {
    const { t } = useTranslation();
    const { scrollbar } = useContext(ScrollProvider);
    const router = useRouter();
    const goToSection = (section: string) => {
        if(section == 'contact') {
            router.push('/contact');
        }
        scrollbar && scrollbar.scrollTo(`#${section}`, { duration: 500 });
    }
    return (<>
        <div className={twMerge('flex flex-row flex-wrap justify-between items-start w-full gap-y-6')} >
            {Array.apply(null, Array(4)).map((_, i) => {
                if (i > 3) return null;
                return <div key={i} className={twMerge('flex flex-col justify-start items-start gap-1 w-1/2 sm:w-auto md:w-1/4')} >
                    <Text p weight='medium' size='sm' degree='3' className='number_menu_gsap' >{`0${i + 1}`}</Text>
                    <span className='overflow-hidden'>
                        <Item>
                            <Button degree='1' size='sm' weight='semibold' onPress={() => goToSection(menuItems[`${i + 1}` as MenuItems] as string)} className='uppercase item_menu_gsap' >
                                {t(`header.menu.${menuKeys[i]}.attribute`)}
                            </Button>
                        </Item>
                    </span>
                </div>
            })}
        </div>
        <span className='overflow-hidden'>
            <Text p weight='medium' size='sm' degree='3' className={twMerge('w-max whitespace-nowrap-important', 'pr-1 hidden xxs:flex sm:hidden md:flex', 'item_menu_gsap')} >
                {t('intro.copy')}
            </Text>
        </span>
    </>)
}

const MenuMemo = React.memo(Menu);



const Intro = () => {
    const introRef = useRef<HTMLDivElement>(null);
    const { scrollbar } = useContext(ScrollProvider);
    useEffect(() => {
        let ctx = gsap.context(() => {
            
            gsap.timeline({
                scrollTrigger: {
                    trigger: introRef.current,
                    toggleActions: 'play play restart play',
                    start: 'top 60%'
                }
            }).from('.splitText_gsap', {
                yPercent: 170,
                skewY: 16,
                duration: 1,
                ease: 'power4.out',
                delay: 0.3,
                stagger: {
                    amount: 0.4
                }
            }).from('.splitText_fullStack_gsap', {
                yPercent: 120,
                duration: 0.9,
                ease: 'power4.out',
            }, '<90%').from('.splitText_description_gsap', {
                yPercent: 105,
                duration: 0.9,
                ease: 'power4.out',
                stagger: {
                    amount: 0.1
                }
            }, '<').from('.next_button_gsap', {
                opacity: 0,
                duration: 0.4,
                ease: 'power4.out',
            }, '<').from('.number_menu_gsap', {
                opacity: 0,
                duration: 0.3,
            }, '<').fromTo('.item_menu_gsap', {
                yPercent: 105,
            }, {
                yPercent: 0,
                duration: 0.4,
                ease: 'power4.out',
            }, '<60%');

        });
        return () => ctx.revert();
    }, [scrollbar]);
    return (<>
        <div className={twMerge('pt-28 sm:pt-36 mdl:pt-40', 'flex flex-col gap-20 xs:gap-32 xl:gap-40')} ref={introRef}>
            <div className={twMerge(
                'flex flex-row flex-wrap',
                'grid grid-cols-12 grid-row-4 xxs:grid-row-3 mdl:grid-row-2',
                'gap-x-3 md:gap-x-4 gap-y-6 xxs:gap-y-8 xs:gap-y-6 sm:gap-y-8 mdl:gap-y-8 lg:gap-y-10',
                'justify-items-stretch'
            )} >
                <Title />
            </div>
            <div className={twMerge('flex flex-row justify-between items-end', 'gap-0 xl:gap-6 4xl:gap-20')} >
                <MenuMemo />
            </div>
        </div>
    </>)
}

export default Intro;