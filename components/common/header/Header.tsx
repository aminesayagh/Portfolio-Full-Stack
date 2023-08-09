import { useState, useCallback, memo, useEffect, useLayoutEffect, useMemo, useRef } from 'react';
import { useRouter } from 'next/router';
import { useTranslation } from "next-i18next";
import { twMerge } from 'tailwind-merge';
import { gsap } from 'gsap';



import StyleAnimation from '@/styles/animation.module.scss';
import { Navbar, Logo, Link, Button, containerStyle, Modal, Text, Title } from "@/components/ui";
import { HamburgerMenu, SwitchLang } from '@/components/common';

import { getMenuItems } from '@/conf/router';
const menuHamburgerItems = getMenuItems('hamburger');
const menuSocialNetworks = getMenuItems('socialNetworks');


const GAP_SIZE = 'gap-8';

const BASE_LOCALE_MENU = 'header.menu';
const BASE_LOCALE_SOCIAL = 'header.socialNetwork';


const DURATION = 0.4;

const TRANSLATE_Y = -110;



const Header = () => {
    const { t } = useTranslation();
    const router = useRouter();
    let [openMenu, setOpenMenu] = useState<boolean>(false);
    const tl = useRef<gsap.core.Timeline>(gsap.timeline({ paused: true }));
    const ctx = useRef<any>(null);

    useLayoutEffect(() => {
        let selector = () => gsap.utils.selector('.modal-overlay');
        ctx.current = gsap.context((self) => {
            self.add('open', () => {
                tl.current.fromTo(['.modal-overlay', '.modal-content'], {
                    opacity: 1,
                    yPercent: TRANSLATE_Y,
                    transformOrigin: 'right top',
                    skewY: 2,
                    ease: 'power3.inOut'
                }, {
                    duration: DURATION,
                    yPercent: 0,
                    skewY: 0,
                    stagger: {
                        amount: .2
                    }
                }).to(['.subElement-item'], {
                    duration: DURATION / 2,
                    yPercent: 100,
                }, '<').from(['.modal-item'], {
                    duration: DURATION / 2,
                    yPercent: 100,
                    // delay: DELAY_2,
                    opacity: 0,
                    ease: 'power3.inOut',
                    stagger: {
                        amount: .2
                    }
                }).fromTo('.modal-close', {
                    display: 'none',
                    opacity: 0,
                }, {
                    opacity: 1,
                    duration: DURATION / 3,
                    display: 'block',
                }).from('.modal-description', {
                    duration: DURATION,
                    yPercent: 100,
                    ease: 'power3.inOut',
                }, '<').from('.modal-footer', {
                    duration: DURATION / 1.5,
                    yPercent: 100,
                    opacity: 0,
                    ease: 'power3.inOut',
                }, '<50%')
                tl.current.play();
            });
            self.add('close', () => {
                tl.current.reverse().then(() => {
                    setOpenMenu(false)
                    ctx.current.revert();
                });
            });
        });
        return () => {
            ctx.current.revert();
        }
    }, [])
    const menuHandler = useCallback(() => {
        if (!openMenu) {
            setOpenMenu(true);
        } else {
            ctx.current.close();
        }
    }, [router.asPath, openMenu]);
    useLayoutEffect(() => {
        if(openMenu) {
            ctx.current.open();
        }
    }, [openMenu])

    const onButtonClick = useCallback((path: string) => {
        if(!openMenu) {
            router.push(path);
        }else {
            tl.current.reverse().then(() => {
                setOpenMenu(false);
                router.push(path);
            });
        }
    }, [router.asPath, openMenu]);

    return (
        <Modal isOpenExternal={openMenu} menuHandler={menuHandler}  >
            <Navbar size='lg'>
                <Navbar.Content className={twMerge('flex-1', GAP_SIZE)}>
                    <Link href='/' size='xs'>{t('header.email')}</Link>
                    <span className="w-[1.2px] bg-gray-500 h-[18px] rotate-[25deg] block" />
                    <SwitchLang />
                </Navbar.Content>
                <Navbar.Brand >
                    <span onClick={() => onButtonClick('/')}>
                        <Logo onPress={() => onButtonClick('/')} size={60} alt={t('header.logo')} mode='dark' />
                    </span>
                </Navbar.Brand>
                <Navbar.Content className={twMerge('flex-1 justify-end overflow-hidden', GAP_SIZE)}>
                    <Button
                        onPress={() => onButtonClick('/contact')}
                        className={twMerge(
                            'py-2 border-none overflow-hidden',
                            'subElement-item',
                            StyleAnimation['underline-animation'],
                        )}
                    >
                        {t('header.action')}
                    </Button>
                    <Modal.Button>
                        {({ handler, isOpen }) => {
                            return <>
                                <div className={twMerge('flex flex-row items-center gap-6 justify-end')} >
                                    <span className='overflow-hidden'>

                                        <Text p size='xs' degree='3'  className={twMerge('mr-2 hidden', 'modal-close')}>{t('header.close')}</Text>
                                    </span>
                                    <HamburgerMenu isOpen={isOpen} setOpen={handler} />
                                </div>
                            </>
                        }}
                    </Modal.Button>
                    <Modal.Overlay className={twMerge('opacity-0 bg-primary-500 modal-overlay')}>
                        <Modal.Content isDismissable className={twMerge('bg-black-200 modal-content')}>
                            {({ handler }) => (
                                <div className={twMerge(
                                    'flex flex-col justify-between',
                                    'min-h-screen w-screen',
                                    'py-12',
                                    containerStyle({ size: 'lg' })
                                )}>
                                    <div></div>
                                    <div className={twMerge('flex flex-row justify-start', 'items-center')} >
                                        <ul className={twMerge('flex flex-col gap-4', 'w-8/12')}>
                                            {menuHamburgerItems.map((item, index) => {
                                                return <li key={index} className={twMerge('flex flex-col items-start', 'overflow-hidden')}>
                                                    <div className={twMerge('flex flex-row justify-start items-start relative cursor-pointer', 'modal-item')} >
                                                        <Button onPress={() => {
                                                            onButtonClick(item.link)
                                                        }} className={
                                                            twMerge(
                                                                'capitalize relative text-white-600 hover:text-primary-500',
                                                                'text-15xl font-bold leading-tight tracking-wide transition-colors duration-150'
                                                            )}>
                                                            {t(`${BASE_LOCALE_MENU}.${item.id}.attribute`)}
                                                        </Button>
                                                        {t(`${BASE_LOCALE_MENU}.${item.id}.more`) !== 'null' ? <Text size='xs' p degree='4' className='absolute left-[calc(100%_+_4px)] whitespace-nowrap top-[19%]'>{t(`${BASE_LOCALE_MENU}.${item.id}.more`)}</Text> : null}
                                                    </div>
                                                </li>
                                            })}
                                        </ul>
                                        <div className={twMerge('flex flex-col gap-4', 'w-3/12')} >
                                            <span className='overflow-hidden'>
                                                <Title h5 degree='2' weight='semibold' className='uppercase tracking-widest overflow-hidden modal-description' >
                                                    {t('header.description.title')}
                                                </Title>
                                            </span>
                                            <span className='overflow-hidden'>
                                                <Text p degree='4' size='sm' className='modal-description overflow-hidden'>
                                                    {t('header.description.content')}
                                                </Text>
                                            </span>
                                        </div>
                                    </div>
                                    <div className={twMerge('flex flex-row justify-between items-center')}>
                                        <div className={twMerge('flex flex-row justify-start items-center', 'overflow-hidden')}>
                                            <Text p degree='4' size='sm' className='modal-footer'>
                                                {t('header.copyright')}
                                            </Text>
                                        </div>
                                        <ul className={twMerge('flex flex-row items-center justify-end', GAP_SIZE)}>
                                            {menuSocialNetworks.map((item, index) => {
                                                return <li key={index} className='overflow-hidden'>
                                                    <Link href={item.link} className='modal-footer' >
                                                        {t(`${BASE_LOCALE_SOCIAL}.${item.id}`)}
                                                    </Link>
                                                </li>
                                            })}
                                        </ul>
                                    </div>
                                </div>
                            )}
                        </Modal.Content>
                    </Modal.Overlay>
                </Navbar.Content>
            </Navbar>
        </Modal>
    )
}

export default memo(Header);