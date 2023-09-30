import React, { useMemo, useRef, useContext } from 'react';
import { twMerge } from 'tailwind-merge';
import { Title, Text } from '@/components/ui';

import { useTranslation } from 'next-i18next';
import { ScrollProvider } from '@/context/ScrollContext';
import { getProjectsByCategory } from '@/conf/projects';
import { gsap, Power4 } from '@/utils/gsap';
import { Image } from '@/components/ui';
import useGsap from '@/hook/useGsap';

const Case = ({ picture, index, id }: { picture?: string[], index: number, id: string }) => {
    const container = useRef<HTMLDivElement>(null);
    const { t } = useTranslation();
    const pic = useMemo(() => picture ? picture[0] : '', [picture]);

    useGsap(() => {
        if (index < 2) {
            gsap.timeline({
                scrollTrigger: {
                    trigger: container.current as any,
                    scrub: true,
                    start: 'top top',
                    end: 'bottom top',
                    toggleActions: 'play pause reverse pause',
                    markers: false,
                    invalidateOnRefresh: true,
                }
            }).fromTo(container.current?.children as any, {
                top: 0,
            }, {
                top: '100%',
                ease: 'none',
            })
        } else {
            gsap.fromTo(container.current?.children as any, {
                top: 0,
            }, {
                top: '100%',
                ease: 'none',
                scrollTrigger: {
                    trigger: container.current as any,
                    scrub: true,
                    start: 'top top',
                    end: 'bottom top',
                    toggleActions: 'play pause reverse pause',
                    markers: false,
                    invalidateOnRefresh: true,
                }
            })
        }
        const tl = gsap.timeline({
            scrollTrigger: {
                trigger: container.current as any,
                scrub: true,
                start: 'top top',
                end: 'bottom top',
                markers: false,
                invalidateOnRefresh: true,
            }
        })
        tl.fromTo(container.current?.children[0]?.children[0] as any, {
            scale: 1,
        }, {
            scale: 1.3,
            transformOrigin: 'center 10%',
            ease: 'Power3.easeIn'
        }).fromTo(container.current?.children[0]?.children[0] as any, {
            backgroundPosition: 'center 20%',
        }, {
            backgroundPosition: 'center 80%',
            ease: 'Power3.easeOut',
        }, 0).fromTo(container.current?.children[0]?.children[0] as any, {
            filter: 'blur(0px)',
        }, {
            filter: 'blur(10px)',
            ease: 'Power4.easeIn',
        }, '<')

        gsap.fromTo('.case-text-gsap', {
            xPercent: -100,
            opacity: 0,
        }, {
            xPercent: 0,
            opacity: 1,
            duration: 1,
            stagger: 0.2,
            ease: Power4.easeInOut,
            scrollTrigger: {
                trigger: container.current as any,
                start: 'top bottom-=35%',
                end: 'bottom center',
                markers: false,
                toggleActions: 'play none play none',
            }
        })
    }, container);

    return <div data-scroll className={twMerge('relative h-[110vh] xxs:h-[120vh] sm:h-[140vh] overflow-hidden')} ref={container} style={{
        zIndex: 10 + (index + 10),
    }} >
        <div className='absolute left-0 right-0 top-0 w-full h-screen'  >
            <Image src={pic} alt={t(`projects.${id}.description`)} className='h-screen object-cover' priority sizes='100vw' width='6000' height='4500' style={{
                zIndex: 10 + (index + 11)
            }} />
        </div>
        <div className='absolute top-0 left-0 right-0 w-full min-h-screen h-screen bg-no-repeat bg-cover' >
            <div data-scroll data-scroll-speed='3' className={twMerge(
                'relative w-fit flex flex-col justify-end h-full',
                'px-5 xs:px-10 lg:px-24 py-24 xs:py-20 mdl:py-28 lg:py-40',
                'gap-2 xs:gap-4 content-gsap'
            )}
                style={{
                    zIndex: 10 + (index + 14),
                }}
            >
                <div className='w-full overflow-hidden' >
                    <Title h1 degree='1' className='case-text-gsap' >
                        {t(`projects.${id}.title`)}
                    </Title>
                </div>
                <div className='w-full xs:w-8/12 md:w-1/2 overflow-hidden'>
                    <Text p size='md' degree='3' className='case-text-gsap'>
                        {t(`projects.${id}.description`)}
                    </Text>
                </div>
            </div>
            <div className={twMerge('absolute left-0 right-0 bottom-0 w-full h-80 xs:h-72', 'bg-gradient-to-t from-black-100/80 to-black-100/0')} style={{
                zIndex: 10 + (index + 12),
            }}></div>
        </div>
    </div>
}

const CaseMemo = React.memo(Case);
const Cases = () => {
    const { t } = useTranslation();
    const projects = useMemo(() => getProjectsByCategory('best'), []);

    return <div className={twMerge('flex flex-col gap-14 sm:gap-12 w-full h-fit')} >
        <div data-scroll className={twMerge('flex flex-col sm:flex-row justify-between items-start sm:items-end', 'gap-2 sm:gap-12', 'w-full')}>
            <Title h2 weight='bold' degree='2' className={'sm:w-min'}>
                {t('cases.title')}
            </Title>
            <div className='w-full xs:w-9/12 sm:w-7/12 md:w-6/12 lg:w-5/12 xl:w-4/12'>
                <Text p size='md' degree='3' weight='semibold' className='w-auto max-w-[38rem] sm:max-w-[36rem] my-2 md:my-4' >
                    {t('cases.description')}
                </Text>
            </div>
        </div>
        <div className={twMerge(`w-full flex flex-col gap-0 h-fit`, 'rounded-2xl overflow-hidden')}>
            {projects.map((project, index) => <CaseMemo key={project.id} picture={project?.picture} index={index} id={project.id} />)}
        </div>
    </div>
}

export default Cases;