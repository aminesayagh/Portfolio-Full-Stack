
import { twMerge } from "tailwind-merge";

import { Text, Button, Display, Icon, Link } from '@/components/ui';
import { useTranslation } from "next-i18next";


const ButtonNext = () => {
    return <>
        <Button >
            <Icon name='IconCornerLeftDown' size='20' />
        </Button>
    </>
}

const Title = () => {
    const { t } = useTranslation();

    return (<>
        {/* title 1  */}
        <div className={twMerge('')} >
            <Display  >{t('home.title.1')}</Display>
        </div>
        {/* description */}
        <div className={twMerge('')} >
            <Text p weight='semibold' degree="2">{t('home.descriptions.1')}</Text>
            <Text p weight='semibold' degree='2'>{t('home.descriptions.2')}</Text>
        </div>
        {/* button next */}
        <div className={twMerge('')} >
            <ButtonNext />
        </div>
        <div className={twMerge('flex flex-row')}>
            <div className={twMerge('')} >
                <Display >{t('home.title.2')}</Display>
            </div>
            <div className={twMerge('')} >
                <Display >{t('home.title.3')}</Display>
            </div>
        </div>
    </>)
}

const menuItems = {
    "1": '#manifest',
    "2": "#experience",
    "3": "#cases",
    "4": "#contact"
} as const;

type MenuItems = keyof typeof menuItems;
const Menu = () => {
    const { t } = useTranslation();

    return (<>
        <div className={twMerge('')} >
            <div className={twMerge('')} >
                {Array.apply(null, Array(4)).map((_, i) => {
                    if(i > 3) return null;
                    return <div key={i} className={twMerge('flex flex-col justify-start items-start gap-2')} >
                        <Text p degree='3'>{`0${i + 1}`}</Text>
                        <Link degree='1' href={menuItems[`${i+1}` as MenuItems]} className={''} >{t('')}</Link>
                    </div>
                })}
            </div>
            <div className={twMerge('')} >
                {t('home.copy')}
            </div>
        </div>
    </>)
}

const Intro = () => {
    return (<>
        <div className={twMerge()} >
            <div className={twMerge('')} >
                <Title />
            </div>
            <div className={twMerge('')} >
                <Menu />
            </div>
        </div>
    </>)
}

export default Intro;