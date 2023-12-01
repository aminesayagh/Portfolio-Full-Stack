import { Key, createContext, useState, useEffect, useRef, ElementRef, Suspense, useCallback } from 'react';
import { useTranslation } from 'next-i18next';
import { twMerge } from 'tailwind-merge';
import { AnimatePresence, motion } from 'framer-motion';

import Container from '@/components/ui/container';
import Title from '@/components/ui/typography/Title';
import Text from '@/components/ui/typography/Text';
import Noise from '@/components/ui/noise';

import { gsap, TimelineMax } from '@/utils/gsap';
import { useIsomorphicLayoutEffect } from 'react-use';
import { useRouter } from 'next/router';
const END_LOADING_IN = 99;
export const LoadingContext = createContext<{
    addLoadingComponent: (key: Key) => void,
    removeLoadingComponent: (key: Key) => void,
    isLoading: boolean,
    endLoading: boolean
}>({
    addLoadingComponent: () => { },
    removeLoadingComponent: () => { },
    isLoading: true,
    endLoading: false
});

type LoadingElement = {
    [key: Key]: boolean
}

export function LoadingProvider({ fontReady, children }: {
    children: React.ReactNode,
    fontReady: boolean
}) {
    const [isLoading, setIsLoading] = useState(true);
    const [endLoading, setEndLoading] = useState(false);
    const [loadingComponentList, setLoadingComponentList] = useState<LoadingElement>({});
    const { asPath } = useRouter();
    const loadingState = useCallback(() => {
        const loadingValues = Object.values(loadingComponentList);
        const inLoadingState = loadingValues.filter((item) => item === true);
        if (inLoadingState.length > 1 && !loadingComponentList['loadingProvider']) {
            setIsLoading(true);
        } else {
            setIsLoading(false);
        }
    }, [setIsLoading, loadingComponentList])

    useEffect(() => {
        // add data set of loading to document html
        const html = document.querySelector('html');
        if (html) {
            html.dataset.is_loading = (!endLoading).toString();
        }
    }, [endLoading])
    const loadingExist = useCallback((key: Key) => {
        return !!loadingComponentList[key];
    }, [loadingComponentList])

    const addLoadingComponent = useCallback((key: Key) => {
        if (loadingExist(key)) return;
        loadingComponentList[key] = true;

        setLoadingComponentList(() => loadingComponentList);
        loadingState();
    }, [loadingComponentList, loadingState, loadingExist])

    const removeLoadingComponent = useCallback((key: Key) => {
        if (!loadingExist(key)) return;
        loadingComponentList[key] = false;

        setLoadingComponentList(() => loadingComponentList);
        loadingState();
    }, [loadingComponentList, loadingState, loadingExist])

    useEffect(() => {
        const timer = setTimeout(() => {
            const values = Object.values(loadingComponentList);
            if (values.length == 1 && loadingComponentList['loadingProvider']) {
                setIsLoading(false);
            }
        }, 1000);
        return () => {
            clearTimeout(timer);
        }
    }, []);

    useEffect(() => {
        addLoadingComponent('loadingProvider');

        return () => {
            removeLoadingComponent('loadingProvider');
        }
    }, [asPath])
    return (
        <LoadingContext.Provider value={{
            addLoadingComponent,
            removeLoadingComponent,
            isLoading,
            endLoading
        }}>
            <Preloader isLoading={isLoading} setEndLoading={setEndLoading} fontReady={fontReady} />
            <Suspense >
                {children}
            </Suspense>
        </LoadingContext.Provider>
    )
}
const LONG_LOADING_TIME = 200;
const MEDIUM_LOADING_TIME = 20;
const INITIAL_PERCENT = 2;

const Percent = ({ isLoading, setEndLoadingProgress }: { isLoading: boolean, setEndLoadingProgress: (b: boolean) => void }) => {
    const [percent, setPercent] = useState(INITIAL_PERCENT);

    useEffect(() => {
        let intervalId: NodeJS.Timeout;
        let interval = 1;
        if (percent == INITIAL_PERCENT) {
            setPercent((prevPercent) => Math.min(prevPercent + interval, END_LOADING_IN));
        } else if (isLoading && percent < END_LOADING_IN) {
            intervalId = setInterval(() => {
                setPercent((prevPercent) => Math.min(prevPercent + interval, END_LOADING_IN));
            }, LONG_LOADING_TIME);
        } else if (!isLoading) {
            interval = interval + 0.3;
            intervalId = setInterval(() => {
                setPercent((prevPercent) => Math.min(prevPercent + interval, END_LOADING_IN));
                if (percent >= END_LOADING_IN) {
                    setEndLoadingProgress(true);
                }
            }, MEDIUM_LOADING_TIME);
        }
        return () => {
            clearInterval(intervalId);
        }
    }, [isLoading, percent, setEndLoadingProgress]);

    return <motion.span key={percent} initial={{ opacity: 1, y: '0' }} animate={{ opacity: 1, y: '-100%' }} exit={{ opacity: 0, y: '100%' }}>
        {
            percent < 100 ? percent.toFixed(0) : 100
        }
    </motion.span>
}

const Preloader = ({ isLoading, setEndLoading, fontReady }: {
    isLoading: boolean,
    fontReady: boolean,
    setEndLoading: (value: boolean) => void
}) => {
    const { t } = useTranslation();
    const ref = useRef<ElementRef<'span'>>(null);
    const [endLoadingProgress, setEndLoadingProgress] = useState(false);

    useIsomorphicLayoutEffect(() => {
        let ctx = gsap.context(() => {
            const tl = gsap.timeline({
                repeat: -1,
                paused: true,
                repeatDelay: 0.5,
            })
            const DELAY = 1.4;
            const OFFSET = 0.3;
            const FRAME_DURATION = 0.2;
            tl.to('.item-gsap', {
                keyframes: [
                    { top: '100%', duration: FRAME_DURATION },
                    { top: '0%' },
                    { top: '-100%', delay: DELAY, duration: FRAME_DURATION },
                ],
                ease: 'power2.out',
                stagger: DELAY + OFFSET,
            });

            if (fontReady) {
                tl.play();
            }

            return () => {
                tl.kill();
            }
        }, ref);
        return () => ctx.revert();
    }, [ref, fontReady]);

    useIsomorphicLayoutEffect(() => {
        let ctx = gsap.context((self) => {

            const skew = 2;
            const tl = gsap.timeline({
                paused: true,
            }).fromTo(['.element-content-gsap', '.element-counter-gsap'], {
                yPercent: 0,
                opacity: 1,
            }, {
                yPercent: -10,
                duration: 0.4,
                opacity: 0
            })
                .fromTo('.element-container', {
                    yPercent: 0,
                    skewY: 0
                }, {
                    duration: 0.5,
                    yPercent: -120,
                    ease: 'power2.out',
                    skewY: skew,
                    onComplete: () => {
                        setEndLoading(true);
                    }
                }).fromTo('.element-bg', {
                    yPercent: 0,
                    skewY: 0,
                }, {
                    skewY: skew,
                    duration: 0.5,
                    yPercent: -120,
                    ease: 'power2.out',
                });
            self.add('endPreload', () => {
                tl.play();
            });
            return () => {
                tl.kill();
            }
        }, ref)
        if (endLoadingProgress) {
            ctx.endPreload();
        }
        return () => ctx.revert();
    }, [ref, isLoading, setEndLoading, endLoadingProgress]);
    return (
        <span ref={ref} className='contents'>
            <div className={twMerge('w-screen cursor-none  h-screen overflow-hidden', 'z-preload bg-white-400', ' fixed', 'element-container')}>
                <Container as='div' size='lg' className={twMerge('h-screen pt-4 sm:pt-8', 'flex flex-col justify-between')}>
                    <div className='flex flex-col gap-0 sm:gap-1 text-loader-gsap'>
                        <span className='py-1 element-content-gsap'>
                            {<Title h6 degree='4' exchange suppressHydrationWarning>
                                {t('loading.intro')}
                            </Title>}
                        </span>
                        <ul className='h-[1.5rem] overflow-hidden element-content-gsap relative'>
                            {
                                Array.from({ length: 5 }).map((_, index) => (
                                    <Text
                                        suppressHydrationWarning
                                        key={index}
                                        degree='0' li size='md' weight='bold'
                                        className={twMerge(
                                            'item-gsap capitalize will-change-transform-animation absolute left-0 right-0 top-[100%]',
                                            index == 4 ? 'text-primary-500' : 'text-black-300/80'
                                        )}  >
                                        {t(`loading.message_${index + 1}`)}
                                    </Text>
                                ))
                            }
                        </ul>
                    </div>
                    <div className={twMerge('w-full', 'text-loader-gsap', 'flex flex-row justify-end', 'relative')} >
                        <AnimatePresence mode='sync' >
                            <motion.p className={twMerge(
                                'uppercase element-counter-gsap',
                                'font-sans font-black text-black-500 will-change-transform-animation',
                                'text-[4.1rem] xxs:text-[6rem] md:text-[7.4rem] lg:text-[8.4rem] xl:text-[10rem] align-baseline leading-[70%]'
                            )}>
                                <Percent isLoading={isLoading} setEndLoadingProgress={setEndLoadingProgress} />
                                {t('loading.percent')}
                            </motion.p>
                        </AnimatePresence>
                    </div>
                </Container>
                <Noise />
            </div>
            <div className='fixed bg-primary-500 w-screen h-screen element-bg z-preload_bg'></div>
        </span>
    )
}