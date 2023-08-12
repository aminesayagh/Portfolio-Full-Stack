import { useTranslation } from 'next-i18next';
import { twMerge } from 'tailwind-merge';

import { Title, Text, Image } from '@/components/ui';

const LINE_CLASSNAME = 'flex flex-row justify-between items-start gap-4';
import { useMeasure } from "react-use";

const Manifesto = () => {
    const { t } = useTranslation();
    const [ref, { width }] = useMeasure<HTMLDivElement>();

    return (<>
        <div className={twMerge('flex flex-col gap-4')} >
            <div className={twMerge(LINE_CLASSNAME)} >
                <div className={twMerge('p-4')} >
                    <svg width="60" height="61" viewBox="0 0 60 61" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M59.8496 29.0557C59.7496 29.0135 59.6605 29.0307 59.5839 29.1073L50.3171 38.3741V19.5966C50.3171 19.4888 50.2655 19.4137 50.1655 19.3731C50.0654 19.3309 49.9763 19.3481 49.8997 19.4247L40.6329 28.6915V9.914C40.6251 9.8124 40.5735 9.7421 40.4797 9.7061C40.3844 9.6686 40.3 9.6842 40.2249 9.753L30.9581 19.0198V0.242357C30.955 0.136058 30.905 0.0625863 30.8081 0.0219423C30.7096 -0.0187017 30.622 -0.00306872 30.5454 0.0704023L0.0704022 30.5579C-0.00306944 30.6345 -0.0187013 30.7221 0.0219423 30.819C0.0625863 30.9175 0.136058 30.9675 0.242357 30.9691H19.0089L9.75301 40.2359C9.67641 40.3125 9.65921 40.4016 9.69986 40.5016C9.74207 40.6017 9.8171 40.6517 9.92496 40.6517H28.6883L19.4294 49.9185C19.3528 49.9966 19.3356 50.0842 19.3762 50.1842C19.4184 50.2843 19.4919 50.3343 19.6013 50.3343H38.3678L29.1073 59.6011C29.0322 59.6792 29.0135 59.7668 29.0557 59.8668C29.0963 59.9669 29.1714 60.0169 29.2792 60.0169H59.7558C59.8231 60.0169 59.8809 59.9934 59.9278 59.9465C59.9762 59.8981 59.9997 59.8418 59.9997 59.773V29.2902C60.0044 29.1776 59.9544 29.0995 59.8496 29.0557ZM0.831692 30.4814L30.4751 0.83169V19.5075L19.4966 30.4814H0.831692ZM30.4751 20.1875V30.4814H20.186L30.4751 20.1875ZM10.5112 40.1655L19.6982 30.9691H30.719C30.7862 30.9691 30.844 30.9456 30.8909 30.8987C30.9394 30.8503 30.9628 30.7924 30.9628 30.7252V19.7045L40.1546 10.5096V29.1839L29.1792 40.1655H10.5112ZM40.1546 29.8717V40.164H29.8654L40.1546 29.8717ZM20.1891 49.845L29.3777 40.6532H40.3984C40.4657 40.6532 40.5219 40.6298 40.5704 40.5813C40.6173 40.5344 40.6423 40.4766 40.6423 40.4094V29.384L49.8325 20.1875V38.8618L38.8587 49.845H20.1891ZM49.8325 39.5527V49.845H39.5449L49.8325 39.5527ZM59.512 59.5245H29.8733L39.0603 50.3327H50.0764C50.1436 50.3327 50.2014 50.3093 50.2499 50.2608C50.2968 50.2139 50.3202 50.1561 50.3202 50.0889V39.065L59.512 29.8717V59.5245Z" fill="#F1F1F1" />
                    </svg>
                </div>
                <div className={twMerge('flex flex-col', 'w-min')} ref={ref}>
                    <div className={twMerge('w-max')} >
                        <Title h1 weight='bold' degree='1' className='uppercase'>{t('manifesto.title_1')}</Title>
                    </div>
                    <div className={twMerge('flex flex-row gap-4', 'justify-between items-center', 'w-fit')} >
                        <Text p size='md' weight='semibold' degree='3'>{t('manifesto.slogan')}</Text>
                        <div className='rounded-lg'>
                            <Image src='/images/2.png' width={400} height={120} className='h-20 object-cover rounded-xl' alt={t('manifesto.image_alt')} />
                        </div>
                        <Title h1 weight='bold' degree='1' className='uppercase'>{t('manifesto.title_2')}</Title>
                    </div>
                    <div className={twMerge('w-full mt-8 mb-12')} >
                        <hr className={twMerge('border-gray-600/80 relative', '')} />
                    </div>
                </div>
            </div>
            <div className='flex flex-row justify-between items-start'>
                <div className={twMerge('flex flex-col p-4')}>
                    <Text p size='md' weight='semibold' degree='3'>{t('manifesto.subtitle_1')}</Text>
                    <Text p size='md' weight='semibold' degree='3'>{t('manifesto.subtitle_2')}</Text>
                </div>
                <Title h3 weight='semibold' degree='3' style={{ width: `${width}px` }}>{t('manifesto.content')}</Title>
            </div>
        </div>
    </>)
}

export default Manifesto;