
import { Navbar, Logo,  Link } from "@/components/ui";
import { SwitchLang } from '@/components/common';
import { useTranslation } from "react-i18next";

const Header = () => {
    const { t } = useTranslation();

    return (
        <>
            <Navbar >
                <Navbar.Content >
                    <Link href='/'>{}</Link>
                    <span className="h-full w-1" />
                    <SwitchLang />
                </Navbar.Content>
                <Navbar.Brand >
                    <Logo href='/' alt='' mode='dark'/> 
                </Navbar.Brand>
                <Navbar.Content>
                </Navbar.Content>
            </Navbar>
        </>
    )
}

export default Header;