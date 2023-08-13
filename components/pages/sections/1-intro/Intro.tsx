
import { twMerge } from "tailwind-merge";

import { Text, Button, Display, Icon, Link } from '@/components/ui';
import { useTranslation } from "next-i18next";
import { MENU_ITEMS } from "@/conf/router";

const ButtonNext = () => {
    return <>
        <Button className={twMerge('bg-white-200', 'rounded-full')}>
            <div className='p-6'>
                <Icon name='IconCornerLeftDown' size='44' className='stroke-black-200 stroke-1' />
            </div>
        </Button>
    </>
}

const DISPLAY_1_CLASS_NAME = 'capitalize';
const DISPLAY_2_CLASS_NAME = 'uppercase italic text-primary-500';

const Title = () => {
    const { t } = useTranslation();

    return (<>
        {/* title 1  */}
        <div className={twMerge('col-span-6 col-start-1', 'row-start-1 row-span-1')} >
            <Display size='xl' className={twMerge(DISPLAY_1_CLASS_NAME)}>{t('intro.title.1')}</Display>
        </div>
        {/* description */}
        <div className={twMerge('flex flex-row justify-between gap-4', 'col-span-6 col-start-7', 'row-start-1 row-span-1')} >
            <Text p weight='semibold' size='sm' className='text-end' degree="2">{t('intro.descriptions.1')}</Text>
            <Text p weight='semibold' size='sm' className='text-end' degree='2'>{t('intro.descriptions.2')}</Text>
        </div>
        {/* button next */}
        <div className={twMerge('w-2/12', 'flex flex-col items-start justify-end w-fit', 'my-4', 'col-span-2 col-start-1', 'row-start-2 row-span-1')} >
            <ButtonNext />
        </div>
        <div className={twMerge('flex flex-row justify-end ', 'col-start-3 col-span-10', 'gap-8')}>
            <div className={twMerge('flex flex-col items-end pt-3')} >
                <Display size='md' weight='semibold' className={DISPLAY_2_CLASS_NAME}>{t('intro.title.2_1')}</Display>
                <Display size='md' weight='semibold' className={DISPLAY_2_CLASS_NAME}>{t('intro.title.2_2')}</Display>
            </div>
            <div className={twMerge('')} >
                <Display size='xl' className={DISPLAY_1_CLASS_NAME}>{t('intro.title.3')}</Display>
            </div>
        </div>
    </>)
}

const menuItems = {
    "1": MENU_ITEMS.manifesto.link,
    "2": MENU_ITEMS.experience.link,
    "3": MENU_ITEMS.cases.link,
    "4": MENU_ITEMS.contact.link
} as const;
const menuKeys = ['manifesto', 'experience', 'cases', 'contact'];

type MenuItems = keyof typeof menuItems;
const Menu = () => {
    const { t } = useTranslation();

    return (<>
        <div className={twMerge('flex flex-row justify-between items-start w-full')} >
            {Array.apply(null, Array(4)).map((_, i) => {
                if (i > 3) return null;
                return <div key={i} className={twMerge('flex flex-col justify-start items-start gap-1')} >
                    <Text p weight='medium' size='sm' degree='3'>{`0${i + 1}`}</Text>
                    <Link degree='1' size='sm' weight='semibold' href={menuItems[`${i + 1}` as MenuItems]} className='uppercase' >{t(`header.menu.${menuKeys[i]}.attribute`)}</Link>
                </div>
            })}
        </div>
        <Text p weight='medium' size='sm' degree='3' className={twMerge('w-max whitespace-nowrap-important')} >
            {t('intro.copy')}
        </Text>
    </>)
}

const Intro = () => {
    return (<>
        <div className={twMerge('pt-40', 'flex flex-col gap-40')} >
            <div className={twMerge('flex flex-row flex-wrap gap-y-8', 'grid grid-cols-12 grid-row-2', 'gap-x-4 gap-y-16')} >
                <Title />
            </div>
            <div className={twMerge('flex flex-row justify-between items-end', 'gap-60')} >
                <Menu />
            </div>
        </div>
    </>)
}

export default Intro;