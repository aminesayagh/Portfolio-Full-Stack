import { Key, createContext, useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { twMerge } from 'tailwind-merge';
import { Container, Title, Display, Text, Noise } from '@/components/ui';
import { AnimatePresence, motion } from 'framer-motion';
import { gsap } from '@/utils/gsap';
import { useIsomorphicLayoutEffect } from 'react-use';

export const LoadingContext = createContext<{
    addLoadingComponent: (key: Key) => void,
    removeLoadingComponent: (key: Key) => void
}>({
    addLoadingComponent: () => () => { },
    removeLoadingComponent: () => { },
});

type LoadingElement = {
    [key: Key]: boolean
}

export function LoadingProvider({ children }: {
    children: React.ReactNode
}) {
    const [isLoading, setIsLoading] = useState(true);
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
            removeLoadingComponent
        }}>
            <Preloader isLoading={isLoading} />
            {children}
        </LoadingContext.Provider>
    )
}
const LONG_LOADING_TIME = 400;
const MEDIUM_LOADING_TIME = 20;
const Preloader = ({ isLoading }: {
    isLoading: boolean
}) => {
    const { t } = useTranslation();
    const [percent, setPercent] = useState(2);
    useEffect(() => {
        console.log(isLoading, percent)
        let intervalId: NodeJS.Timeout;

        if (isLoading && percent < 100) {
            intervalId = setInterval(() => {
                setPercent((prevPercent) => Math.min(prevPercent + 1, 100));
            }, LONG_LOADING_TIME);
        } else if (!isLoading) {
            // Speed up percent increase
            intervalId = setInterval(() => {
                setPercent((prevPercent) => Math.min(prevPercent + 1, 100));
            }, MEDIUM_LOADING_TIME);
        }

        return () => clearInterval(intervalId);
    }, [isLoading, percent]);

    useIsomorphicLayoutEffect(() => {
        let ctx = gsap.context(() => {
            const delay = 0.5;
            const ease = 'power2.out';
            const duration = 0.34;
            gsap.set('.element-content-gsap', {
                yPercent: 24,
                opacity: 0,
            });
            const tl2 = gsap.timeline().fromTo('.element-content-gsap', {
                yPercent: 24,
                opacity: 0,
                delay: 0.2,
            }, {
                duration,
                yPercent: 0,
                stagger: 0.4,
                opacity: 1,
            })
            const tl = gsap.timeline({
                paused: true,
            }).fromTo('.item-gsap', {
                yPercent: 0,
            }, {
                duration,
                yPercent: -100,
                delay: delay * 2,
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
                tl2.kill();
            }
        });
        return () => ctx.revert();
    }, [])

    useEffect(() => {
        let ctx = gsap.context((self) => {

            const tl = gsap.timeline({
                paused: true,
            }).to(['.element-content-gsap', '.element-counter-gsap'], {
                yPercent: -10,
                duration: 0.4,
                opacity: 0,
            })
                .to('.element-container', {
                    duration: 0.5,
                    yPercent: -100,
                    ease: 'power2.out',
                }).to('.element-bg', {
                    duration: 0.5,
                    yPercent: -100,
                    ease: 'power2.out',
                });
            self.add('endPreload', (e: any) => {
                tl.play();
            });
            return () => {
                tl.kill();
            }
        })
        if (!isLoading && percent == 100) {
            ctx.endPreload();
        }
        return () => ctx.revert();
    }, [percent]);

    return (
        <div>
            <div className={twMerge('w-screen h-screen overflow-hidden', 'bg-white-400', 'z-preload fixed', 'element-container')}>
                <Container as='div' size='lg' className={twMerge('h-screen pt-8', 'flex flex-col justify-between')}>
                    <div className=''>
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
                        <Text degree='3' li size='sm' exchange >
                            { }
                        </Text>
                    </div>
                    <div className={twMerge('w-full', 'flex flex-row justify-end', 'relative -bottom-4')} >
                        <AnimatePresence mode='sync' >
                            <Display size='xl' exchange className='uppercase element-counter-gsap'>
                                <motion.span key={percent} initial={{ opacity: 1, y: '0' }} animate={{ opacity: 1, y: '-100%' }} exit={{ opacity: 0, y: '100%' }}>
                                    {percent}
                                </motion.span>
                                {t('loading.percent')}
                            </Display>
                        </AnimatePresence>
                    </div>
                </Container>
                <Noise />
            </div>
            <div className='fixed bg-primary-500 w-screen h-screen element-bg z-preloadBg'></div>
        </div>
    )
}