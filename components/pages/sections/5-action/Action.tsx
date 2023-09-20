

import React, { useRef, useContext } from "react";
import { useTranslation } from "next-i18next";
import { twMerge } from 'tailwind-merge';
import { Text, Display, Link } from '@/components/ui';
import { useHover } from 'react-aria';
import { useIsomorphicLayoutEffect } from "react-use";
import { gsap } from "@/utils/gsap";
import { ScrollProvider } from "@/context/ScrollContext";
import useGsap from "@/hook/useGsap";

const Action = () => {
    const { t, i18n } = useTranslation();
    const refContainer = useRef<HTMLDivElement>(null);

    useGsap(() => {
        gsap.timeline({
            scrollTrigger: {
                trigger: refContainer.current as any,
                scrub: true,
                start: 'top center+=20%',
                end: 'top top+=10%',
                toggleActions: 'play pause reverse pause',
                markers: false,
                invalidateOnRefresh: true,
            }
        }).fromTo('.contact-title-gsap', {
            yPercent: -100,
        }, {
            yPercent: 0,
            duration: 1,
            stagger: 0.4,
            ease: 'Power3.easeOut',
        }).fromTo('.contact_quota_gsap', {
            opacity: 0,
            left: "-100%",
        }, {
            opacity: 1,
            left: "0%"
        }, '-=0.5')
    }, refContainer);
    return <>
        <div className='relative h-[64vh]' ref={refContainer}>
            <div className='absolute left-0 top-0 right-0'>
                <div className={twMerge('flex flex-col gap-1 xs:gap-2 sm:gap-6', 'justify-center items-start xs:items-center place-content-start', 'h-[64vh]')} >
                    <span className='overflow-hidden'>
                        <Display size='lg' className={twMerge('uppercase text-start xs:text-center', 'contact-title-gsap')} >
                            {t('contactCall.title')}
                        </Display>
                    </span>
                    <div className='flex flex-row justify-start xs:justify-center items-start relative'>
                        <Link href='/contact' className='overflow-hidden'>
                            <Display size='lg' weight='bold' className={twMerge('whitespace-nowrap-important uppercase text-primary-500', 'contact-title-gsap')} >
                                {t('contactCall.action')}
                            </Display>
                        </Link>
                        <Text p degree='3' size={i18n.language == 'en' ? 'xxs' : 'xs'} weight='medium' className={twMerge(
                            'absolute',
                            'left-[-1.5%] xs:left-auto sm:left-[103%]',
                            'top-[100%] sm:top-[-6px]',
                            'xs:right-[-1%] md:right-auto', // right
                            'mt-3 xl:mt-4', // margin top
                            'ml-2',
                            i18n.language == 'en' ? 'w-32 xl:w-40 4xl:w-52' : 'w-36 xl:w-46 4xl:w-52', // width
                            'text-start xs:text-end sm:text-start'
                        )} >
                            <span className='contact_quota_gsap'>
                                {t('contactCall.description')}
                            </span>
                        </Text>
                    </div>
                </div>
            </div>
        </div>
    </>
}

export default Action;