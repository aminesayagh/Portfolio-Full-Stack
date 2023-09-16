import { useRef, useEffect, useContext, useState } from 'react';
import { useTranslation } from 'next-i18next';
import { twMerge } from 'tailwind-merge';

import { Title, Text, Link } from '@/components/ui';
import { gsap } from '@/utils/gsap';
import { useIsomorphicLayoutEffect } from 'react-use';
import { ScrollProvider } from '@/context/ScrollContext';

import _ from 'lodash';

const Manifesto = () => {
    const { t } = useTranslation();
    const refs = useRef<HTMLSpanElement[]>([]);
    const body = useRef<React.JSX.Element[]>([]);
    const phrase = t('manifesto.description');
    const { scrollbar } = useContext(ScrollProvider);
    useEffect(() => {
        const splitLetters = (word: string) => {
            return _.map(word.split(''), (letter, index) => (
                <span ref={el => { refs.current.push(el as HTMLSpanElement) }} key={`letter_${index}`} >{letter}</span>
            ));
        };

        const elements = _.map(phrase.split(' '), (word, index) => {
            const letters = splitLetters(word);
            return <p key={`word_${index}`}className='flex flex-row gap-[0.09rem] letter_gsap'>{letters}</p>;
        });

        body.current = elements;
    }, [phrase, t])
    useIsomorphicLayoutEffect(() => {
        let ctx = gsap.context(() => {
            const letter = gsap.utils.toArray('.letter_gsap');
            gsap.fromTo(letter, {
                opacity: 0.1,
            }, {
                opacity: 0.9,
                ease: 'power4',
                stagger: 0.1,
                skewX: 0.3,
                duration: 0.5,
                scrollTrigger: {
                    trigger: '.manifesto_quote_gsap',
                    scrub: true,
                    start: 'top 75%',
                    end: 'center 50%',
                    markers: false,
                }
            })
            
            gsap.utils.toArray('.manifesto_description_gsap').map((box: any) => {
                gsap.fromTo(box, {
                    opacity: 0,
                    y: 30,
                }, {
                    opacity: 1,
                    ease: 'power1',
                    y: 0,
                    scrollTrigger: {
                        trigger: box,
                        start: 'top bottom-=100px',
                        end: 'top bottom-=260px',
                        toggleActions: 'play pause reverse pause',
                        scrub: true,
                        markers: false,
                    }
                });
            });
            gsap.fromTo('.manifesto_description_action_gsap', {
                opacity: 0,
            }, {
                opacity: 1,
                scrollTrigger: {
                    trigger: '.manifesto_description_action_gsap',
                    start: 'top bottom-=100px',
                    end: 'top bottom-=260px',
                    toggleActions: 'play pause reverse pause',
                    scrub: true,
                    markers: false,
                }
            })
        }, refDescription);
        return () => ctx.revert();
    }, [scrollbar, phrase, t]);

    const refDescription = useRef<HTMLDivElement>(null);
    return (
        <div className={twMerge('h-fit py-40')}  ref={refDescription} >
            <div data-scroll data-scroll-position='start' data-scroll-speed='1.1' className={twMerge(`grid grid-cols-12 gap-y-4 xxs:gap-y-5 xs:gap-y-8 mdl:gap-y-12`, 'h-fit strick')}>
                <div className={twMerge('flex flex-col gap-7', 'items-start justify-start manifesto_quote_gsap',
                    'col-start-1 col-span-12 xs:col-start-2 xs:col-span-11 md:col-start-2 md:col-span-10 mdl:col-start-2 mdl:col-span-10 xl:col-start-2 xl:col-span-9',
                )}>
                    <div className='flex flex-row gap-5 justify-center items-center'>
                        <Title h6 degree='4' weight='medium' >
                            {t(`manifesto.subtitle_1`)}
                        </Title>
                        <div className={twMerge('w-[0.3rem] h-[0.3rem] rounded-full bg-gray-500 items-center justify-start')} ></div>
                        <Title h6 degree='4' weight='medium' >
                            {t(`manifesto.subtitle_2`)}
                        </Title>
                    </div>
                    <Title h4 degree='1' weight='semibold' className='flex flex-row flex-wrap gap-x-[0.3rem]'>
                        <strong className='text-white-200 pr-2'>
                            {t(`manifesto.slogan`)}
                        </strong>
                        {body.current ? body.current.map((word, index) => <span key={index} className='mr-[0.3rem]' >{word}</span>) : null}
                    </Title>
                </div>
                <div className={twMerge(
                    'flex flex-row gap-12 items-start justify-between',
                    'mr-7 xl:mr-6 2xl:mr-0',
                    'col-start-1 col-span-12 xxs:col-start-2 xxs:col-span-11 xs:col-start-2 xs:col-span-10 sm:col-start-4 sm:col-span-9 md:col-start-5 md:col-span-7 lg:col-start-6 lg:col-span-6 xl:col-start-6 xl:col-span-5',
                )}>
                    <div className={twMerge('flex flex-col gap-5', 'manifesto_description_container_gsap')}>
                        <Text p degree='3' weight='medium' size='lg' className='manifesto_description_gsap' >
                            {t(`manifesto.who_i_am`)}
                        </Text>
                        <Text p degree='3' weight='medium' size='lg' className='manifesto_description_gsap'>
                            {t(`manifesto.what_i_do`)}
                        </Text>
                        <span data-scroll data-scroll-position='end' data-scroll-speed='0.8'>
                            <Text p degree='3' size='xl' weight='semibold'  className='textLink inline w-full whitespace-inherit-important manifesto_description_action_gsap' style={{
                                WebkitLineClamp: 2,
                                WebkitBoxOrient: 'vertical',
                                overflow: 'hidden',
                            }} >
                                {t(`manifesto.goal`)}
                                <Link degree='2' href='/contact' className='ml-2 text-primary-500 hover:text-primary-400/70 hover:underline transition-all duration-300' weight='bold' >
                                    {t(`manifesto.action`)}
                                </Link>
                                .
                            </Text>
                        </span>
                        <style jsx>{`
                            .textLink {
                                text-wrap: inherit !important;
                            }`}
                        </style>
                    </div>
                </div>
            </div>
        </div>

    )
}

export default Manifesto;