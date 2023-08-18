import { useTranslation } from 'next-i18next';
import { twMerge } from 'tailwind-merge';

import { Text, Icon, Container, Button } from '@/components/ui';
import { useRouter } from 'next/router';
import { MENU_ITEMS } from '@/conf/router';

const ICON_SIZE_CLASS_NAME = 'w-5 h-5 lg:w-6 lg:h-6';
const FollowUs = () => {
    const { t } = useTranslation();
    return (
        <div className='flex flex-row justify-end items-center gap-4'>
            <Text p degree='3' weight='semibold' size='sm' >
                {t('footer.socialNetwork')}
            </Text>
            <Icon name='IconShare' size='24' className={twMerge('stroke-gray-400', ICON_SIZE_CLASS_NAME)} />
        </div>
    )
}

const Footer = () => {
    const { t } = useTranslation();
    const router = useRouter();

    return (<>
        <Container as='footer' size='lg' className={twMerge('flex flex-col gap-8 md:gap-12')}>  
            <div className={twMerge('max-w-[14rem] xxs:w-8/12 xs:max-w-[46vw] sm:max-w-[40vw] md:max-w-[30vw] mdl:max-w-[26vw] xl:max-w-[20vw] 2xl:max-w-[28vw]')} >
                <Text p degree='3' weight='medium' size='md' className='uppercase' >
                    {t('footer.state')}
                </Text>
            </div>
            
            <div className={twMerge('flex flex-row flex-wrap sm:flex-nowrap justify-between', 'gap-y-4', 'pb-10 pt-6')}>
                <div className={twMerge('flex flex-row', 'w-1/2 sm:w-auto', 'order-2 sm:order-1')} >
                    <Button onPress={() => {
                        router.push(MENU_ITEMS.intro.link)
                    }} className={twMerge('flex flex-row justify-start items-center', 'gap-6 md:gap-8', 'uppercase')}>
                        <Icon name='IconArrowUpRight' size='24' className={twMerge('stroke-gray-400', ICON_SIZE_CLASS_NAME)} />
                        <Text p size='sm' weight='semibold' degree='3' >
                            {t('footer.action')}
                        </Text>
                    </Button>
                </div>  
                <div className='flex flex-row justify-start sm:justify-center items-center w-full sm:w-auto order-1 sm:order-2'>
                    <Text p degree='3' weight='semibold' size='sm' className='uppercase'>
                        {t('footer.name')}
                    </Text>
                    <Text p degree='3' weight='semibold' size='sm' className={twMerge('ml-2')} >
                        {t('footer.copy')}
                    </Text>
                </div>
                <div className='w-1/2 sm:w-auto order-3'>
                    <FollowUs />
                </div>
            </div>
        </Container>
    </>)
}

export default Footer;