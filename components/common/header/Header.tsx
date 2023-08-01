import { useState } from 'react';
import { Navbar, Logo, Link, Button } from "@/components/ui";
import { HamburgerMenu, SwitchLang } from '@/components/common';
import { useTranslation } from "next-i18next";

import { useRouter } from 'next/router';

import { twMerge } from 'tailwind-merge';
import StyleAnimation from '@/styles/animation.module.scss';

import { motion } from 'framer-motion'
import { useHover } from 'react-aria';

const GAP_SIZE = 'gap-8';
const Header = () => {
    const { t } = useTranslation();
    const [hamburgerOpen, setHamburgerOpen] = useState(false);
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
                        )}>
                        {t('header.action')}
                    </Button>
                    <HamburgerMenu isOpen={hamburgerOpen} setOpen={setHamburgerOpen} />
                </Navbar.Content>
            </Navbar>
        </>
    )
}

export default Header;