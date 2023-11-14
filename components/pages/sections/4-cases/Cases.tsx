import React, { ElementRef, useMemo, useRef } from 'react';
import { twMerge } from 'tailwind-merge';

import Title from '@/components/ui/typography/Title';
import Text from '@/components/ui/typography/Text';
import Image from '@/components/ui/image';

import { useTranslation } from 'next-i18next';
import { getProjectsByCategory } from '@/conf/projects';
import { gsap, Power4 } from '@/utils/gsap';
import { useIsomorphicLayoutEffect } from 'react-use';
import { ScrollTrigger } from '@/utils/gsap';

const Case = ({ picture, index, id }: { picture?: string[], index: number, id: string }) => {
    const container = useRef<ElementRef<'div'>>(null);
    const { t } = useTranslation();

    useIsomorphicLayoutEffect(() => {
        const ctx = gsap.context(() => {
            let tl2: gsap.core.Timeline = gsap.timeline({}).to('.fixed-gsap' as any, {
                ease: 'none',
            });
            ScrollTrigger.create({
                animation: tl2,
                pin: true,
                trigger: container.current as any,
                scrub: true,
                pinType: 'fixed',
                start: 'top top',
                end: 'bottom top',
                toggleActions: 'play pause reverse pause',
                markers: false,
                invalidateOnRefresh: true,
            });

            const tl = gsap.timeline({});
            tl.fromTo('.image-gsap' as any, {
                scale: 1,
            }, {
                scale: 1.3,
                transformOrigin: 'center 10%',
                ease: 'Power3.easeIn'
            }).fromTo('.image-gsap' as any, {
                backgroundPosition: 'center 20%',
            }, {
                backgroundPosition: 'center 80%',
                ease: 'Power3.easeOut',
            }, 0).fromTo('.image-gsap' as any, {
                filter: 'blur(0px)',
            }, {
                filter: 'blur(10px)',
                ease: 'Power4.easeIn'
            }, '<');

            ScrollTrigger.create({
                animation: tl,
                trigger: container.current as any,
                scrub: true,
                start: 'top top',
                end: 'bottom top',
                invalidateOnRefresh: true,
            });


            const tlCase = gsap.timeline().fromTo('.case-text-gsap', {
                xPercent: -100,
                opacity: 0,
            }, {
                xPercent: 0,
                opacity: 1,
                duration: 1,
                stagger: 0.2,
                ease: Power4.easeInOut,
            });

            ScrollTrigger.create({
                animation: tlCase,
                trigger: container.current as any,
                start: 'top bottom-=35%',
                end: 'bottom center',
                markers: false,
                toggleActions: 'play none play none',
                invalidateOnRefresh: true,
            });

            return () => {
                tl.kill();
                tl2?.kill();
                tlCase.kill();
            }
        }, container);
        return () => {
            ctx.revert();
        }
    }, [container.current, picture, index, id]);

    const zIndexContainer = useMemo(() => 10 + (index + 10), [index]);
    const zIndexImage = useMemo(() => 10 + (index + 11), [index]);
    const zIndexContent = useMemo(() => 10 + (index + 14), [index]);
    const zIndexGradient = useMemo(() => 10 + (index + 13), [index]);
    const title = useMemo(() => t(`projects.${id}.title`), [t, id]);
    const description = useMemo(() => t(`projects.${id}.description`), [t, id]);
    const pic = useMemo(() => picture ? picture[0] : '', [picture]);

    return <div data-scroll className={twMerge('relative h-[110vh] xxs:h-[120vh] sm:h-[140vh] overflow-hidden will-change-transform-animation')} ref={container} style={{
        zIndex: zIndexContainer,
    }} >
        <div className='absolute fixed-gsap left-0 right-0 top-0 w-full h-screen'  >
            <Image src={pic} alt={description} className='h-screen object-cover image-gsap' priority sizes='100vw' width='6000' height='4500' style={{
                zIndex: zIndexImage,
            }} />
        </div>
        <div className='absolute fixed-gsap top-0 left-0 right-0 w-full min-h-screen h-screen bg-no-repeat bg-cover' >
            <div data-scroll data-scroll-speed='3' className={twMerge(
                'relative w-fit flex flex-col justify-end h-full',
                'px-5 xs:px-10 lg:px-24 py-32 xs:py-24 mdl:py-32',
                'gap-2 xs:gap-4 content-gsap will-change-transform-animation'
            )}
                style={{
                    zIndex: zIndexContent,
                }}
            >
                <div className='w-full overflow-hidden' >
                    <Title h1 degree='1' className='case-text-gsap will-change-transform-animation' >
                        {title}
                    </Title>
                </div>
                <div className='w-full xs:w-8/12 md:w-1/2 hidden sm:block overflow-hidden'>
                    <Text p size='md' degree='2' className='case-text-gsap will-change-transform-animation'>
                        {description}
                    </Text>
                </div>
            </div>
            <div className={twMerge('absolute left-0 right-0 bottom-0 w-full h-80 xs:h-72', 'bg-gradient-to-t from-black-100/80 to-black-100/0')} style={{
                zIndex: zIndexGradient,
            }}></div>
        </div>
    </div>
}


const CaseHead = () => {
    const { t } = useTranslation();

    return <>
        <Title h2 weight='bold' degree='2' className='sm:w-min'>
            {t('cases.title')}
        </Title>
        <div className='w-full xs:w-9/12 sm:w-7/12 md:w-6/12 lg:w-5/12 xl:w-4/12'>
            <Text p size='md' degree='3' weight='semibold' className='w-auto max-w-[38rem] sm:max-w-[36rem] my-2 md:my-4' >
                {t('cases.description')}
            </Text>
        </div>
    </>
}

const CaseHeadMemo = React.memo(CaseHead);

const Cases = () => {
    const projectsImported = useMemo(() => getProjectsByCategory('best'), []);

    return <div className='flex flex-col gap-14 sm:gap-12 w-full h-fit'>
        <div data-scroll className='flex flex-col sm:flex-row justify-between items-start sm:items-end gap-2 sm:gap-12 w-full'>
            <CaseHeadMemo />
        </div>
        <div className='w-full flex flex-col gap-0 h-fit rounded-2xl overflow-hidden'>
            {projectsImported.map((project, index) => <Case key={project.id} picture={project?.picture} index={index} id={project.id} />)}
        </div>
    </div>
}

export default Cases;