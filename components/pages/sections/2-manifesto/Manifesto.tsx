import { useRef, useEffect, useState, ElementRef } from 'react';
import { useTranslation } from 'next-i18next';
import { twMerge } from 'tailwind-merge';

import { Title, Text, Link } from '@/components/ui';
import { gsap } from '@/utils/gsap';

import _ from 'lodash';
import useGsap from '@/hook/useGsap';

const Manifesto = () => {
    const { t, i18n } = useTranslation();
    const refs = useRef<ElementRef<'span'>[]>([]);
    const refDescription = useRef<ElementRef<'div'>>(null);
    const [body, setBody] = useState<React.JSX.Element[] | null>(null);
    const [phrase, setPhrase] = useState(t('manifesto.description'));

    useEffect(() => {
        setPhrase(t('manifesto.description'));
    }, [i18n.language, phrase, t]);
    useEffect(() => {
        setBody(null);

        const splitLetters = (word: string) => {
            return _.map(word.split(''), (letter, index) => (
                <span ref={el => { refs.current.push(el as HTMLSpanElement) }} key={`letter_${index}`} >{letter}</span>
            ));
        };

        const elements = _.map(phrase.split(' '), (word, index) => {
            const letters = splitLetters(word);
            return <p key={`word_${index}`} className='flex flex-row gap-[0.09rem] letter_gsap will-change-transform-animation'>{letters}</p>;
        });
        setBody(() => elements);
    }, [phrase])
    useGsap(() => {
        if (refs.current.length > 0) {
            const descriptions = gsap.utils.toArray('.manifesto_description_gsap');
            const letters = gsap.utils.toArray('.letter_gsap');
            const tl = gsap.timeline({
                scrollTrigger: {
                    trigger: '.manifesto_quote_gsap',
                    scrub: true,
                    start: 'top bottom-=100px',
                    end: 'center top+=100px',
                    markers: false,
                    invalidateOnRefresh: true,
                    toggleActions: 'play pause reverse pause',
                }
            }).fromTo(letters, {
                opacity: 0.1,
            }, {
                opacity: 0.9,
                ease: 'power4',
                stagger: 0.2,
                skewX: 0.3,
                duration: 0.5,
            }).fromTo(descriptions[0] as any, {
                opacity: 0,
                y: 30,
            }, {
                opacity: 1,
                ease: 'power1',
                y: 0
            }, "-=50%").fromTo(descriptions[1] as any, {
                opacity: 0,
                y: 30,
            }, {
                opacity: 1,
                ease: 'power1',
                y: 0,
            }).fromTo('.manifesto_description_action_gsap', {
                opacity: 0,
            }, {
                opacity: 1,
            });
            return () => {
                tl.kill();
            }
        }
    }, refDescription);

    return <div data-scroll data-scroll-sticky data-scroll-target="#manifesto" data-scroll-speed="4" className='h-fit py-20 xxs:py-28 md:py-32 2xl:py-40 relative' ref={refDescription} >
        <div className={twMerge(`grid grid-cols-12 gap-y-8 xxs:gap-y-12 xs:gap-y-8 mdl:gap-y-12`, 'h-fit strick')}>
            <div className={twMerge('flex flex-col gap-6 xs:gap-7 items-start justify-start manifesto_quote_gsap will-change-transform-animation',
                'col-start-1 col-span-12 xs:col-start-2 xs:col-span-11 md:col-start-2 md:col-span-10 mdl:col-start-2 mdl:col-span-10 xl:col-start-2 xl:col-span-9',
            )}>
                <div className='flex flex-row gap-5 justify-center items-center'>
                    <Title h6 degree='4' weight='medium' >
                        {t(`manifesto.subtitle_1`)}
                    </Title>
                    <div className='w-[0.3rem] h-[0.3rem] rounded-full bg-gray-500 items-center justify-start' ></div>
                    <Title h6 degree='4' weight='medium' >
                        {t(`manifesto.subtitle_2`)}
                    </Title>
                </div>
                <Title h4 degree='1' weight='semibold' className={twMerge(
                    'flex flex-row flex-wrap',
                    i18n.language == 'en' ?
                        'gap-y-[0.01rem] xxs:gap-y-[0.04rem] gap-x-[0.06rem] sm:gap-y-[0.07rem] sm:gap-x-[0.1rem] mdl:gap-y-[0.08rem] mdl:gap-x-[0.16rem] lg:gap-y-[0.15rem] lg:gap-x-[0.23rem]' :
                        'gap-y-[0rem] xxs:gap-y-[0.03rem] gap-x-[0.06rem] sm:gap-y-[0.06rem] sm:gap-x-[0.1rem] mdl:gap-y-[0.07rem] mdl:gap-x-[0.16rem] lg:gap-y-[0.13rem] lg:gap-x-[0.23rem]'
                )}>
                    <strong className='text-white-200 pr-2'>
                        {t(`manifesto.slogan`)}
                    </strong>
                    {body ? body.map((word, index) => <span key={index} className='mr-[0.3rem]' >{word}</span>) : null}
                </Title>
            </div>
            <div className={twMerge(
                'flex flex-row gap-12 items-start justify-between',
                'mr-7 xl:mr-6 2xl:mr-0',
                'col-start-1 col-span-12 xxs:col-start-2 xxs:col-span-11 xs:col-start-2 xs:col-span-10 sm:col-start-4 sm:col-span-9 md:col-start-5 md:col-span-7 lg:col-start-6 lg:col-span-6 xl:col-start-6 xl:col-span-5',
            )}>
                <div className={twMerge('flex flex-col gap-4 xxs:gap-5', 'manifesto_description_container_gsap will-change-transform-animation')}>
                    <Text p degree='3' weight='medium' size='lg' className='manifesto_description_gsap will-change-transform-animation' >
                        {t(`manifesto.who_i_am`)}
                    </Text>
                    <Text p degree='3' weight='medium' size='lg' className='manifesto_description_gsap will-change-transform-animation'>
                        {t(`manifesto.what_i_do`)}
                    </Text>
                    <span
                        data-scroll
                        data-scroll-position='start'
                        data-scroll-speed='0.4'
                        className='mt-[1.6%] 3xl:mt-[3%]'
                    >
                        <Text p degree='3' size='xl' weight='semibold'
                            className='textLink inline w-full whitespace-inherit-important manifesto_description_action_gsap will-change-transform-animation' style={{
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
}

export default Manifesto;