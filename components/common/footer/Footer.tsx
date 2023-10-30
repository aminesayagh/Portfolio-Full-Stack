import React, { ElementRef, useContext, useMemo, useRef, useEffect, ReactPropTypes, useCallback } from 'react';
import { memo } from 'react';
import { useTranslation } from 'next-i18next';
import { twMerge } from 'tailwind-merge';

import { Text, Icon, Button } from '@/components/ui';
import { ScrollProvider } from '@/context/AnimationConf';
import { gsap } from 'utils/gsap';
import useGsap from '@/hook/useGsap';


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

const TextAnimated = ({ phrase, className, ...props }: { phrase: string } & Omit<React.ComponentProps<typeof Text>, 'div' | 'children'>) => {
    const container = useRef<ElementRef<'div'>>(null);
    useGsap(() => {
        gsap.fromTo('.word-gsap', {
            y: '100%',
        }, {
            y: '0%',
            stagger: 0.04,
            duration: 0.3,
            ease: 'power2.out',
            scrollTrigger: {
                trigger: container.current,
                start: 'top bottom-=80px',
                toggleActions: 'play none reverse reverse'
            }
        })
    }, container);
    return <span ref={container} ><Text div className={twMerge('flex flex-row flex-wrap', className)} {...props}>
        {phrase.split(' ').map((word, index) => {
            return <div key={index} className='overflow-y-animate py-px' >
                <div className='word-gsap will-change-transform-animation'>
                    {word}
                </div>
            </div>
        })}
    </Text></span>
}

const GoToTop = ({ handler, text }: { handler: () => void, text: string }) => {
    const ref = useRef<HTMLButtonElement | null>(null);

    useEffect(() => {
        const tlIcon = gsap.timeline({ 
            paused: true
        }).fromTo('.icon_gsap', {
            opacity: 1,
            yPercent: 0,
            xPercent: 0
        }, {
            opacity: 0,
            yPercent: -100,
            xPercent: 100,
            duration: 0.3,
        }).fromTo('.icon_gsap', {
            opacity: 0,
            yPercent: 100,
            xPercent: -100
            }, {
            opacity: 1,
            yPercent: 0,
            duration: 0.3,
            xPercent: 0,
        });
        const tlText = gsap.timeline({
            paused: true,
        }).fromTo('.text_gsap', {
            opacity: 1,
            yPercent: 0,
        }, {
            opacity: 0,
            yPercent: -100,
            duration: 0.3
        }).fromTo('.text_gsap', {
            opacity: 0,
            yPercent: 100,
        }, {
            opacity: 1,
            yPercent: 0, 
            duration: 0.3
        })
        tlIcon.play();
        tlText.play();
        const handler = () => {
            tlIcon.progress(0);
            tlText.progress(0);
            tlIcon.play();
            tlText.play();
        }
        const handlerLeave = () => {
            tlIcon.reverse();
            tlText.reverse();
        }

        ref.current?.addEventListener('mouseenter', handler);
        ref.current?.addEventListener('mouseleave', handlerLeave);
        return () => {
            ref.current?.removeEventListener('mousemove', handler);
            ref.current?.removeEventListener('mouseleave', handlerLeave);
        }
    }, [])

    return <Button ref={ref} onPress={() => handler()} className={twMerge('flex flex-row justify-start items-center', 'gap-6 md:gap-8', 'uppercase')}>
        <Icon name='IconArrowUpRight' size='24' className={twMerge('stroke-gray-400 icon_gsap', ICON_SIZE_CLASS_NAME)} />
        <Text p size='sm' weight='semibold' degree='3' className='text_gsap' >
            {text}
        </Text>
    </Button>
}

const Footer = () => {
    const { t } = useTranslation();
    const { scrollbar } = useContext(ScrollProvider);

    const goToSection = useCallback(() => {
        scrollbar && scrollbar.scrollTo(0, { duration: 1000 });
    }, [scrollbar]);

    return (<>
        <div className={twMerge(
            'max-w-[14rem] xxs:w-8/12 xs:max-w-[46vw] sm:max-w-[40vw] md:max-w-[30vw] mdl:max-w-[26vw] xl:max-w-[20vw] 2xl:max-w-[28vw] 3xl:max-w-[22rem]'
        )} >
            <TextAnimated degree='3' weight='medium' size='md' className='uppercase max-w-xs justify-start gap-x-2' phrase={t('footer.state')} />
        </div>

        <div className={twMerge('flex flex-row flex-wrap sm:flex-nowrap justify-between', 'gap-y-4', 'pb-10 pt-6')}>
            <div className={twMerge('flex flex-row', 'w-1/2 sm:w-auto', 'order-2 sm:order-1')} >
                {/* <Button onPress={() => goToSection()} className={twMerge('flex flex-row justify-start items-center', 'gap-6 md:gap-8', 'uppercase')}>
                    <Icon name='IconArrowUpRight' size='24' className={twMerge('stroke-gray-400', ICON_SIZE_CLASS_NAME)} />
                    <Text p size='sm' weight='semibold' degree='3' >
                        {t('footer.action')}
                    </Text>
                </Button> */}
                <GoToTop handler={goToSection} text={t('footer.action')}/>
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
    </>)
}

export default memo(Footer);