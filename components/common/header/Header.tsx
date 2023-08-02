import { useEffect, useState } from 'react';
import { Navbar, Logo, Link, Button } from "@/components/ui";
import { HamburgerMenu, SwitchLang } from '@/components/common';
import { useTranslation } from "next-i18next";

import { useRouter } from 'next/router';

import { twMerge } from 'tailwind-merge';
import StyleAnimation from '@/styles/animation.module.scss';
import { Modal } from '@/components/ui';


const GAP_SIZE = 'gap-8';
const Header = () => {
    const { t } = useTranslation();
    let [openMenu, setOpenMenu] = useState<boolean>(false);
    const router = useRouter();
    useEffect(() => {
        console.log(openMenu);
    }, [openMenu])
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
                                <div className="flex flex-col gap-6">
                                    <Link href='/'>{t('header.home')}</Link>
                                    <Link href='/about'>{t('header.about')}</Link>
                                    <Link href='/contact'>{t('header.contact')}</Link>
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