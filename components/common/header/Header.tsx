import { useEffect, useState } from 'react';
import { useTranslation } from "next-i18next";

import { useRouter } from 'next/router';

import { twMerge } from 'tailwind-merge';
import StyleAnimation from '@/styles/animation.module.scss';
import { Navbar, Logo, Link, Button, containerStyle, Modal } from "@/components/ui";
import { HamburgerMenu, SwitchLang } from '@/components/common';

const GAP_SIZE = 'gap-8';

const MENU_ITEMS = {
    manifesto: {
        attribute: 'manifesto',
        link: '/#manifesto',
    },
    experience: {
        attribute: 'experience',
        link: '/#experience',
    },
    cases: {
        attribute: 'cases',
        link: '/#cases',
    },
    contact: {
        attribute: 'contact',
        link: '/contact',
    }
} as const;

const BASE_LOCALE_MENU = 'header.menu';

type MenuItems = keyof typeof MENU_ITEMS;
const menuItems: MenuItems[] = Object.keys(MENU_ITEMS) as MenuItems[];


const Header = () => {
    const { t } = useTranslation();
    let [ openMenu, setOpenMenu ] = useState<boolean>(false);
    const router = useRouter();
    return (
        <>
            <Navbar size='lg'>
                <Navbar.Content className={twMerge('flex-1', GAP_SIZE)}>
                    <Link href='/' size='xs'>{t('header.email')}</Link>
                    <span className="w-[1.2px] bg-gray-500 h-[18px] rotate-[25deg] block" />
                    <SwitchLang />
                </Navbar.Content>
                <Navbar.Brand >
                    <Logo size={60} href='/' alt={t('header.logo')} mode='dark' />
                </Navbar.Brand>
                <Navbar.Content className={twMerge('flex-1 justify-end', GAP_SIZE)}>
                    <Button
                        onPress={() => router.push('/contact')}
                        className={twMerge(
                            'py-2 border-none',
                            StyleAnimation['underline-animation'],
                        )}
                    >
                        {t('header.action')}
                    </Button>
                    <Modal isOpenExternal={openMenu} setOpenExternal={setOpenMenu} >
                        <Modal.Button>
                            <HamburgerMenu isOpen={openMenu} setOpen={setOpenMenu} />
                        </Modal.Button>
                        <Modal.Overlay>
                            <Modal.Content isDismissable >
                                <div className={twMerge(
                                    'flex flex-col justify-between', 
                                    'min-h-screen w-screen',
                                    containerStyle({ size: 'lg' })
                                )}>
                                    <div></div>
                                    <ul>
                                        {menuItems.map((item, index) => {
                                            return <li key={index} >
                                                <Link href={MENU_ITEMS[item].link} className='uppercase' >
                                                    {t(`${BASE_LOCALE_MENU}.${MENU_ITEMS[item].attribute}.attribute`)}
                                                </Link>
                                                
                                            </li>
                                        })}
                                    </ul>
                                    <div>
                                        <div>

                                        </div>
                                        <div>

                                        </div>
                                    </div>
                                </div>
                            </Modal.Content>
                        </Modal.Overlay>
                    </Modal>
                </Navbar.Content>
            </Navbar>
        </>
    )
}

export default Header;