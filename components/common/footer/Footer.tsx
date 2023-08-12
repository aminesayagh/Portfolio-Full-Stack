import { useTranslation } from 'next-i18next';
import { twMerge } from 'tailwind-merge';

import { Text, Icon, Container, Button } from '@/components/ui';

const FollowUs = () => {
    const { t } = useTranslation();
    return (
        <div className='flex flex-row justify-end items-center gap-4'>
            <Text p degree='3' weight='semibold' size='sm' >
                {t('footer.socialNetwork')}
            </Text>
            <Icon name='IconShare' size='24' className='stroke-gray-400' />
        </div>
    )
}

const Footer = () => {
    const { t } = useTranslation();
    return (<>
        <Container as='footer' size='lg' className={twMerge('flex flex-col gap-12')}>  
            <div className={twMerge('max-w-[28vw]')} >
                <Text p degree='3' weight='medium' size='md' className='uppercase' >
                    {t('footer.state')}
                </Text>
            </div>
            
            <div className={twMerge('flex flex-row justify-between', 'pb-10 pt-6')}>
                <div className={twMerge('flex flex-row')} >
                    <Button onPress={() => {

                    }} className={twMerge('flex flex-row justify-start items-center', 'gap-8', 'uppercase')}>
                        <Icon name='IconArrowUpRight' size='24' className='stroke-gray-400' />
                        <Text p size='sm' weight='semibold' degree='3' >
                            {t('footer.action')}
                        </Text>
                    </Button>
                </div>  
                <div className='flex flex-row justify-center items-center'>
                    <Text p degree='3' weight='semibold' size='sm' className='uppercase'>
                        {t('footer.name')}
                    </Text>
                    <Text p degree='3' weight='semibold' size='sm' className={twMerge('ml-2')} >
                        {t('footer.copy')}
                    </Text>
                </div>
                <div>
                    <FollowUs />
                </div>
            </div>
        </Container>
    </>)
}

export default Footer;