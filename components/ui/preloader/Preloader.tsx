import { Key, createContext, useState, useEffect, useRef, ElementRef } from 'react';
import { useTranslation } from 'react-i18next';
import { twMerge } from 'tailwind-merge';
import { Container, Title, Display, Text, Noise } from '@/components/ui';
import { AnimatePresence, motion } from 'framer-motion';
import { gsap } from '@/utils/gsap';
import { useIsomorphicLayoutEffect } from 'react-use';

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

export function LoadingProvider({ children }: {
    children: React.ReactNode
}) {
    const [isLoading, setIsLoading] = useState(true);
    const [endLoading, setEndLoading] = useState(false);
    const [loadingComponentList, setLoadingComponentList] = useState<LoadingElement>({});
    const loadingState = () => {
        const inLoadingState = Object.values(loadingComponentList).filter((item) => item === true);
        if (inLoadingState.length > 0) {
            setIsLoading(true);
        } else {
            setIsLoading(false);
        }
    }
    const loadingExist = (key: Key) => {
        return !!loadingComponentList[key];
    }
    const addLoadingComponent = (key: Key) => {
        if (loadingExist(key)) return;
        loadingComponentList[key] = true;

        setLoadingComponentList(() => loadingComponentList);
        loadingState();
    }
    const removeLoadingComponent = (key: Key) => {
        if (!loadingExist(key)) return;
        loadingComponentList[key] = false;

        setLoadingComponentList((prev) => loadingComponentList);
        loadingState();
    }
    return (
        <LoadingContext.Provider value={{
            addLoadingComponent,
            removeLoadingComponent,
            isLoading,
            endLoading
        }}>
            <Preloader isLoading={isLoading} setEndLoading={setEndLoading} />
            {children}
        </LoadingContext.Provider>
    )
}
const LONG_LOADING_TIME = 400;
const MEDIUM_LOADING_TIME = 20;
const INITIAL_PERCENT = 2;
const Preloader = ({ isLoading, setEndLoading }: {
    isLoading: boolean,
    setEndLoading: (value: boolean) => void
}) => {
    const { t } = useTranslation();
    const [percent, setPercent] = useState(INITIAL_PERCENT);
    const ref = useRef<ElementRef<'div'>>(null);
    useEffect(() => {
        let intervalId: NodeJS.Timeout;
        if (percent == INITIAL_PERCENT) {
            setPercent((prevPercent) => Math.min(prevPercent + 1, 100));
        } else if (isLoading && percent < 100) {
            intervalId = setInterval(() => {
                setPercent((prevPercent) => Math.min(prevPercent + 1, 100));
            }, LONG_LOADING_TIME);
        } else if (!isLoading) {
            intervalId = setInterval(() => {
                setPercent((prevPercent) => Math.min(prevPercent + 3, 100));
            }, MEDIUM_LOADING_TIME);
        }
        return () => clearInterval(intervalId);
    }, [isLoading, percent]);

    useIsomorphicLayoutEffect(() => {
        let ctx = gsap.context(() => {
            const delay = 0.5;
            const ease = 'power2.out';
            const duration = 0.4;
            const tl = gsap.timeline({
                paused: true,
            }).fromTo('.item-gsap', {
                yPercent: 0,
            }, {
                delay: delay * 2,
                duration,
                yPercent: -100,
                ease,
            }).to('.item-gsap', {
                duration,
                delay,
                yPercent: -200,
                ease,
            }, '>').to('.item-gsap', {
                duration,
                delay,
                yPercent: -300,
                ease,
            }, '>').to('.item-gsap', {
                duration,
                delay,
                yPercent: -400,
                ease,
            }, '>').play();

            return () => {
                tl.kill();
            }
        }, ref);
        return () => ctx.revert();
    }, [])

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
            self.add('endPreload', (e: any) => {
                tl.play();
            });
            return () => {
                tl.kill();
            }
        }, ref)
        if (!isLoading && percent == 100) {
            ctx.endPreload();
        }
        return () => ctx.revert();
    }, [percent]);

    return (
        <div ref={ref} >
            <div className={twMerge('w-screen h-screen overflow-hidden', 'bg-white-400', 'z-preload fixed', 'element-container')}>
                <Container as='div' size='lg' className={twMerge('h-screen pt-8', 'flex flex-col justify-between')}>
                    <div className='flex flex-col gap-1'>
                        <span className='py-1 element-content-gsap opacity-0'>
                            <Title h6 degree='4' exchange >
                                {t('loading.intro')}
                            </Title>
                        </span>
                        <ul className='flex flex-col h-[15%] overflow-hidden element-content-gsap opacity-0'>
                            {
                                Array.from({ length: 5 }).map((_, index) => (
                                    <Text key={index} degree='0' li size='md' weight='bold' className={twMerge('item-gsap capitalize', index == 4 ? 'text-primary-500' : 'text-black-300/80')}  >
                                        {t(`loading.message_${index + 1}`)}
                                    </Text>
                                ))
                            }
                        </ul>
                    </div>
                    <div className={twMerge('w-full', 'flex flex-row justify-end', 'relative')} >
                        <AnimatePresence mode='sync' >
                            <motion.p className={twMerge(
                                'uppercase element-counter-gsap',
                                'font-sans font-black text-black-500',
                                'text-[10rem] tracking-wider align-baseline leading-[70%]'
                            )}>
                                <motion.span key={percent} initial={{ opacity: 1, y: '0' }} animate={{ opacity: 1, y: '-100%' }} exit={{ opacity: 0, y: '100%' }}>
                                    {percent}
                                </motion.span>
                                {t('loading.percent')}
                            </motion.p>
                        </AnimatePresence>
                    </div>
                </Container>
                <Noise />
            </div>
            <div className='fixed bg-primary-500 w-screen h-screen element-bg z-preload_bg'></div>
        </div>
    )
}