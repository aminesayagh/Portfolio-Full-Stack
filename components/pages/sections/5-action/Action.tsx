

import React, { useRef, useContext } from "react";
import { useTranslation } from "next-i18next";
import { twMerge } from 'tailwind-merge';
import { Text, Display, Link } from '@/components/ui';
import { useHover } from 'react-aria';
import { useIsomorphicLayoutEffect } from "react-use";
import { gsap } from "@/utils/gsap";
import { ScrollProvider } from "@/context/ScrollContext";

const Action = () => {
    const { t } = useTranslation();

    const { scrollbar } = useContext(ScrollProvider);
    const refContainer = useRef<HTMLDivElement>(null);

    // useIsomorphicLayoutEffect(() => {
    //     const ctx = gsap.context(() => {
    //         gsap.fromTo(refContainer.current?.children[0] as any, {
    //             yPercent: -100,
    //             opacity: 0.2,
    //         }, {
    //             opacity: 1,
    //             yPercent: 0,
    //             ease: 'Power4.easeIn',
    //             scrollTrigger: {
    //                 trigger: refContainer.current?.children[0] as any,
    //                 scrub: true,
    //                 start: 'top bottom',
    //                 end: 'bottom top+=80%',
    //                 toggleActions: 'play pause reverse pause',
    //                 markers: true,
    //                 invalidateOnRefresh: true,
    //             }

    //         });
    //         gsap.fromTo('.quota_gsap', {
    //             xPercent: -100,
    //         }, {
    //             xPercent: 0,
    //             duration: 1,
    //             ease: 'Elastic.easeOut.config(1, 0.3)',
    //             scrollTrigger: {
    //                 trigger: '.quota_gsap' as any,
    //                 scrub: true,
    //                 start: 'top bottom',
    //                 end: 'bottom top+=80%',
    //                 markers: true,
    //             }
    //         });
    //     }, refContainer);
    //     return () => {
    //         ctx.revert();
    //     }
    // }, [scrollbar, refContainer.current])
    const { hoverProps, isHovered } = useHover({
        onHoverStart: () => {

        },
        onHoverEnd: () => {
        }
    })
    return <>
        <div className='relative h-[64vh]' ref={refContainer}>
            <div className='absolute left-0 top-0 right-0'>
                <div className={twMerge('flex flex-col gap-1 xs:gap-2 sm:gap-6', 'justify-center items-start xs:items-center place-content-start', 'h-[64vh]')} >
                    <Display size='lg' className={twMerge('uppercase text-start xs:text-center')} >
                        {t('contactCall.title')}
                    </Display>
                    <div className='flex flex-row justify-start xs:justify-center items-start relative'>
                        <Link href='/contact' {...hoverProps}>
                            <Display size='lg' weight='bold' className={twMerge('whitespace-nowrap-important uppercase text-primary-500')} >
                                {t('contactCall.action')}
                            </Display>
                        </Link>
                        <span className='overflow-hidden relative'>
                            <Text p degree='3' size='xxs' weight='medium' className={twMerge(
                                'absolute',
                                'quota_gsap',
                                'left-[-1.5%] xs:left-auto sm:left-[103%]',
                                'top-[100%] sm:top-[-6px]',
                                'xs:right-[-1%] md:right-auto', // right
                                'mt-3 xl:mt-4', // margin top
                                'ml-2 w-32 xl:w-40 4xl:w-52', // width
                                'text-start xs:text-end sm:text-start' // text alignment
                            )} >
                                {t('contactCall.description')}
                            </Text>
                        </span>
                    </div>
                </div>
            </div>
        </div>
    </>
}

export default Action;