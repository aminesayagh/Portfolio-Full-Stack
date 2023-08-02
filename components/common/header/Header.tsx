import { useEffect, useState } from 'react';
import { useTranslation } from "next-i18next";

import { useRouter } from 'next/router';

import { twMerge } from 'tailwind-merge';

import StyleAnimation from '@/styles/animation.module.scss';
import { Navbar, Logo, Link, Button, containerStyle, Modal, Text } from "@/components/ui";
import { HamburgerMenu, SwitchLang } from '@/components/common';

import { getMenuItems } from '@/conf/router';
const menuHamburgerItems = getMenuItems('hamburger');


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

const SOCIAL_NETWORKS = {
    instagram: {
        link: 'https://www.instagram.com/',
    },
    linkedin: {
        link: 'https://www.linkedin.com/',
    },
    github: {
        link: 'https://www.github.com/'
    }
} as const;

const socialNetwork = Object.keys(SOCIAL_NETWORKS) as (keyof typeof SOCIAL_NETWORKS)[];

const BASE_LOCALE_MENU = 'header.menu';
const BASE_LOCALE_SOCIAL = 'header.socialNetwork';



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
                            <Modal.Content isDismissable className={twMerge('bg-black-200')}>
                                <div className={twMerge(
                                    'flex flex-col justify-between', 
                                    'min-h-screen w-screen',
                                    'py-12',
                                    containerStyle({ size: 'lg' })
                                )}>
                                    <div></div>
                                    <ul>
                                        {menuHamburgerItems.map((item, index) => {
                                            return <li key={index} >
                                                <Link href={item.link} className='uppercase' >
                                                    {t(`${BASE_LOCALE_MENU}.${item.id}.attribute`)}
                                                </Link>
                                            </li>
                                        })}
                                    </ul>
                                    <div className={twMerge('flex flex-row justify-between items-center')}>
                                        <div className={twMerge('flex flex-row justify-start items-center')}>
                                            <Text p degree='4' size='sm'>
                                                {t('header.copyright')}
                                            </Text>
                                        </div>
                                        <ul className={twMerge('flex flex-row gap-8 items-center justify-end')}>
                                            {socialNetwork.map((item, index) => {
                                                return <li key={index}>
                                                    <Link href={SOCIAL_NETWORKS[item].link} >
                                                        {t(`${BASE_LOCALE_SOCIAL}.${item}`)}
                                                    </Link>
                                                </li>
                                            })}
                                        </ul>
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