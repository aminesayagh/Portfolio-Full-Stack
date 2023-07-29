
import { Navbar, Logo,  Link, Button } from "@/components/ui";
import { HamburgerMenu, SwitchLang } from '@/components/common';
import { useTranslation } from "react-i18next";

import { useRouter } from 'next/router';

const Header = () => {
    const { t } = useTranslation();
    const router = useRouter();
    return (
        <>
            <Navbar size='lg'>
                <Navbar.Content className='flex-1'>
                    <Link href='/'>{t('header.email')}</Link>
                    <span className="h-full w-1 rotate-45 origin-center" />
                    <SwitchLang />
                </Navbar.Content>
                <Navbar.Brand >
                    <Logo href='/' alt={t('header.logo')} mode='dark'/> 
                </Navbar.Brand>
                <Navbar.Content className='flex-1'>
                    <Button onPress={() => router.push('/contact')}>
                        {t('header.action')}
                    </Button>
                    <HamburgerMenu />
                </Navbar.Content>
            </Navbar>
        </>
    )
}

export default Header;