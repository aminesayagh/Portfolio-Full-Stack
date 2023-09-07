import { useMemo, useRef, useContext, useLayoutEffect, useState, useEffect } from 'react';
import { twMerge } from 'tailwind-merge';
import { useIsomorphicLayoutEffect } from 'react-use';
import { useTranslation } from 'next-i18next';
import { gsap } from 'gsap';

import { Title, Text } from '@/components/ui';
import { getProjectsByCategory } from '@/conf/projects';
import { ScrollProvider } from '@/context/ScrollContext';

const Case = ({ picture, height }: { picture?: string[], height: string }) => {
    let ref = useRef<HTMLDivElement>(null);
    
    useIsomorphicLayoutEffect(() => {
        let ctx = gsap.context(() => {
            gsap.to('.image_gsap_container', {
                height: 0,
                ease: 'none',
                scrollTrigger: {
                    trigger: '.image_gsap_container' as any,
                    scrub: 1,
                    snap: {
                        snapTo: 1 / 3,
                        duration: 0.1,
                        delay: 0.1,
                        ease: 'power1.inOut',
                    },
                    start: 'top top',
                    end: () => window.innerHeight * 3,
                }
            })
            let tl = gsap.timeline({
                scrollTrigger: {
                    trigger: ref.current as any,
                    start: 'top top',
                    end: 'bottom top',
                    scrub: true,
                    // markers: true,
                    toggleActions: 'play none reverse none',
                    invalidateOnRefresh: true,
                }
            });
            tl.fromTo(ref.current as any, {
                backgroundSize: '100%'
            }, {
                backgroundSize: '105%',
                ease: 'power4',
                scrollTrigger: {
                    trigger: ref.current as any,
                    scrub: 1,
                    start: 'top bottom',
                    markers: false,
                }
            }).fromTo(ref.current as any, {
                backgroundPosition: 'center 70%',
            }, {
                backgroundPosition: 'center 20%',
                ease: 'power1',
                scrollTrigger: {
                    trigger: ref.current as any,
                    start: 'top bottom',
                    markers: false,
                }
            }, '<')
        }, ref);
        return () => ctx.revert();
    }, [ref.current]);

    return <div
        className={twMerge(
            'flex flex-col items-center justify-center',
            'bg-no-repeat bg-cover',
            'w-full',
            'image_gsap',
        )}
        ref={ref}
        style={{
            backgroundImage: `url(${!!picture ? picture[0] : ''})`,
            height
        }}
    >

    </div>
}
const Cases = () => {
    const { t } = useTranslation();
    const projects = useMemo(() => getProjectsByCategory('best'), []);
    const containerRef = useRef<HTMLDivElement>(null);

    useLayoutEffect(() => {
        let ctx = gsap.context((self) => {
            gsap.set('.image_gsap_container', {
                zIndex: (i, target, targets) => targets.length - i,
                
            })

            let sections = gsap.utils.toArray('.image_gsap_container');
            sections.map((section: any, i) => {
                if(i == 2) return;
                gsap.to(section, {
                    height: 0,
                    ease: 'none',
                    scrollTrigger: {
                        trigger: section as any,
                        scrub: 1,
                        snap: {
                            snapTo: 1 / (sections.length - 1),
                            duration: 0.1,
                            delay: 0.1,
                            ease: 'power1.inOut',
                        },
                        markers: true,
                        start: i == 0 ? 'top top' : undefined,
                        // end: () => window.innerHeight * (sections.length - 1),

                    }
                })
            });
        });
        return () => ctx.revert();
    }, [containerRef.current]);
    return (
        <>
            <div className={twMerge('flex flex-col gap-14 sm:gap-12 w-full')}>
                <div className={twMerge('flex flex-col sm:flex-row justify-between items-start sm:items-end', 'gap-2 sm:gap-12', 'w-full')}>
                    <Title h2 weight='bold' degree='2' className={'sm:w-min'}>
                        {t('cases.title')}
                    </Title>
                    <div className='w-full xs:w-9/12 sm:w-7/12 md:w-6/12 lg:w-5/12 xl:w-4/12'>
                        <Text p size='md' degree='3' weight='semibold' className='w-auto max-w-[38rem] sm:max-w-[36rem] my-2 md:my-4' >
                            {t('cases.description')}
                        </Text>
                    </div>
                </div>
                <div className={twMerge('w-full flex flex-col gap-0 h-fit')} ref={containerRef} >
                    {projects.map((project, index) => {
                        let height = '100vh';
                        if(index == 0){
                            height = '120vh';
                        } else if(index == 1) {
                            height = '140vh';
                        } else {
                            height = '110vh';
                        }

                        return <div key={index} style={{
                            height,
                        }} className={twMerge(
                            'w-full', 'overflow-hidden',
                            `image_gsap_container`,
                        )} ><Case picture={project?.picture} height={height}/></div>
                    })}
                </div>
            </div>
        </>
    )
}

export default Cases;