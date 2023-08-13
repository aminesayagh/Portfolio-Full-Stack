
import { twMerge } from "tailwind-merge";

import { Text, Button, Display, Icon, Link } from '@/components/ui';
import { useTranslation } from "next-i18next";
import { MENU_ITEMS } from "@/conf/router";

const ButtonNext = () => {
    return <>
        <Button className={twMerge('bg-white-200', 'rounded-full')}>
            <div className='p-3 xs:p-4 md:p-5 xl:p-6'>
                <Icon name='IconCornerLeftDown' className='stroke-black-200 stroke-1 w-6 h-6 xs:w-8 xs:h-8 xl:w-10 xl:h-10' />
            </div>
        </Button>
    </>
}

const DISPLAY_1_CLASS_NAME = 'capitalize';
const DISPLAY_2_CLASS_NAME = 'uppercase italic text-primary-500';
const FullStack = ({ className }: { className: string }) => {
    const { t } = useTranslation();

    return (
        <>
            <div className={twMerge(className, 'flex-col items-start xs:items-end pt-1 sm:pt-2 xl:pt-3')} >
                <Display size='md' weight='semibold' className={twMerge(DISPLAY_2_CLASS_NAME, 'tracking-[-0.05rem] sm:tracking-wider')}>{t('intro.title.2_1')}</Display>
                <Display size='md' weight='semibold' className={twMerge(DISPLAY_2_CLASS_NAME, 'tracking-[-0.05rem] sm:tracking-wider')}>{t('intro.title.2_2')}</Display>
            </div>
        </>
    )
}
const Title = () => {
    const { t } = useTranslation();

    return (<>
        {/* title 1  */}
        <div className={twMerge('col-start-1 col-span-12 mdl:col-span-7', '4xl:col-span-6 4xl:col-start-1', 'row-start-1 row-span-1')} >
            <Display fitty size='xl' className={twMerge(DISPLAY_1_CLASS_NAME, 'tracking-wider xxs:tracking-normal')}>{t('intro.title.1')}</Display>
        </div>
        {/* description */}
        <div className='flex flex-col justify-between items-start xxs:hidden col-start-1 col-span-4 row-start-2 row-span-1'>
            <div className='justify-items-start'>
                <ButtonNext />
            </div>

            <FullStack className='flex' />
        </div>

        <div className={twMerge(
            // flex
            'flex flex-col xxs:flex-row justify-between mdl:justify-end gap-6 xxs:gap-8 xs:gap-4 mdl:gap-4 xl:gap-8 4xl:gap-28',
            'pl-0 lg:pl-4 xl:pl-0 pt-0 xxs:pt-2 xl:pt-3',
            // grid position
            'col-start-5 col-span-8',
            'xxs:col-start-1 xxs:col-span-12',
            'sm:col-start-2 sm:col-span-11',
            'md:col-start-3 md:col-span-10', // none
            'mdl:col-start-7 mdl:col-span-6', // mdl
            '2xl:col-start-8 2xl:col-span-5', // 2xl
            '4xl:col-span-6 4xl:col-start-7', // 4xl
            // "row-start-3 row-span-1",
            'row-start-2 row-span-1', // none
            'mdl:row-start-1 mdl:row-span-1', //mdl
            // children
            "[&>*]:w-full [&>*]:xss:w-1/2 [&>*]:sm:w-5/12 [&>*]:mdl:w-[45%] [&>*]:lg:w-full [&>*]:xl:w-5/12 [&>*]:2xl:w-1/2 [&>*]:4xl:w-4/12",
            "[&>*]:flex [&>*]:flex-row [&>*]:justify-end"
        )} >
            <div>

                <Text p weight='semibold' size='sm' className={twMerge('text-start sm:text-end', '')} degree="2">{t('intro.descriptions.1')}</Text>
            </div>
            <div>
                <Text p weight='semibold' size='sm' className={twMerge('text-start sm:text-end', 'w-full')} degree='2'>{t('intro.descriptions.2')}</Text>
            </div>
        </div>
        {/* button next */}
        <div className={twMerge(
            'mdl:w-2/12',
            'hidden xxs:flex flex-col items-end mdl:items-start justify-end w-fit mdl:w-fit',
            'mt-1 mdl:mt-4',
            'mb-0 xxs:mb-3 mdl:mb-0 lg:mb-4',
            'col-start-11 col-span-2',
            'mdl:col-span-2 mdl:col-start-1',
            'row-start-1 row-span-1',
            'mdl:row-start-2 mdl:row-span-1',
            'justify-self-end mdl:justify-self-start'
        )} >
            <ButtonNext />
        </div>
        <div className={twMerge('col-start-5 col-span-2')}>
            <FullStack className='hidden xxs:flex w-min' />
        </div>
        <div className={twMerge(
            'flex flex-col xxs:flex-row justify-start xs:justify-end',
            'col-start-1 col-span-12',
            'xs:col-start-7 xs:col-span-6',
            'gap-2 sm:gap-1 md:gap-5 mdl:gap-8'
        )}>
            <Display fitty size='xl' className={twMerge(DISPLAY_1_CLASS_NAME)}>{t('intro.title.3')}</Display>
            {/* <div className='w-auto'>
            </div> */}
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
            <div className={twMerge(
                'flex flex-row flex-wrap gap-y-8',
                'grid grid-cols-12 grid-row-3 mdl:grid-row-2',
                'gap-x-4 gap-y-8 xs:gap-y-6 sm:gap-y-8 lg:gap-y-10',
                'justify-items-stretch'
            )} >
                <Title />
            </div>
            <div className={twMerge('flex flex-row justify-between items-end', 'gap-60')} >
                <Menu />
            </div>
        </div>
    </>)
}

export default Intro;