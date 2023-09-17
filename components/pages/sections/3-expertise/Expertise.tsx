
import { useTranslation } from "next-i18next";
import { twMerge } from "tailwind-merge";
import {memo, useRef, useContext } from 'react';
import { gsap } from '@/utils/gsap';
import { useIsomorphicLayoutEffect } from 'react-use';


import { Title, Text } from '@/components/ui';
import { rounded } from "@/components/style";
import { split } from "lodash";
import { useHover } from "react-aria";
import { useMedia, useWindowSize } from "react-use";
import { ScrollProvider } from '@/context/ScrollContext';


const Icon = () => {
    return (
        <svg width="60" height="60" viewBox="0 0 60 60" fill="none" className='w-12 h-12 lg:w-16 lg:h-16' xmlns="http://www.w3.org/2000/svg">
            <path d="M60 23.8709C60 10.9849 49.5198 0.5 36.6401 0.5C35.7469 0.5 34.8553 0.551619 33.9668 0.654857C33.0768 0.756531 32.1977 0.909823 31.3265 1.11317C30.4552 1.31808 29.5996 1.57148 28.758 1.87338C27.9165 2.17527 27.0937 2.52565 26.2928 2.92296C25.4904 3.31871 24.7145 3.76138 23.9637 4.24785C23.2129 4.73275 22.4918 5.26146 21.802 5.83083C21.1122 6.39864 20.4567 7.00555 19.8358 7.65157C19.2148 8.29603 18.6344 8.97333 18.0917 9.68505C15.4982 11.2289 13.2848 13.1983 11.4516 15.5946C10.5835 16.1108 9.75129 16.6786 8.95667 17.3012C8.16205 17.9237 7.41123 18.5964 6.70421 19.3159C5.99718 20.0354 5.33865 20.7988 4.73017 21.6043C4.1217 22.4099 3.5664 23.2499 3.06742 24.1274C2.56687 25.0049 2.12576 25.9106 1.7441 26.8444C1.36086 27.7798 1.0402 28.734 0.782105 29.7101C0.522446 30.6861 0.328484 31.6747 0.197091 32.6758C0.067261 33.6769 0.00156451 34.6827 0 35.6932C0 48.5792 10.4802 59.0625 23.3599 59.0625C24.2547 59.0625 25.1447 59.0109 26.0347 58.9092C26.9232 58.806 27.8023 58.6527 28.6735 58.4493C29.5448 58.246 30.4004 57.9926 31.242 57.6891C32.0835 57.3872 32.9063 57.0384 33.7072 56.6411C34.5096 56.2438 35.2855 55.8027 36.0363 55.3162C36.7871 54.8297 37.5082 54.3026 38.198 53.7332C38.8878 53.1639 39.5433 52.5569 40.1642 51.9125C40.7852 51.268 41.3656 50.5892 41.9083 49.8774C44.5002 48.3336 46.7136 46.3642 48.5484 43.9679C49.4165 43.4532 50.2487 42.8839 51.0433 42.2613C51.8379 41.6387 52.5888 40.9677 53.2958 40.2466C54.0028 39.5271 54.6614 38.7637 55.2698 37.9597C55.8783 37.1542 56.4336 36.3126 56.9326 35.4351C57.4331 34.5576 57.8742 33.6519 58.2559 32.7181C58.6391 31.7842 58.9598 30.8285 59.2179 29.8524C59.4776 28.8764 59.6715 27.8878 59.8029 26.8867C59.9327 25.8856 59.9984 24.8798 60 23.8709ZM17.2063 10.9192C16.626 11.7889 16.1067 12.693 15.6468 13.6331C14.6645 13.9788 13.7087 14.3871 12.7796 14.861C14.0842 13.3547 15.5608 12.0407 17.2063 10.9192ZM36.6338 46.6708C24.0669 46.6708 13.8417 36.4409 13.8417 23.8677C13.8417 22.1768 14.0278 20.5063 14.4017 18.856C14.774 17.2058 15.3246 15.6181 16.0535 14.0914C18.4233 13.2874 20.8588 12.887 23.3599 12.8901C35.9252 12.8901 46.152 23.1185 46.152 35.6932C46.1536 37.3841 45.9675 39.0562 45.5952 40.7065C45.2229 42.3567 44.6739 43.946 43.9449 45.4726C41.5767 46.2766 39.1412 46.6755 36.6401 46.6739L36.6338 46.6708ZM43.582 46.1812C42.9861 47.3278 42.2978 48.4149 41.5173 49.4442C39.7716 50.4734 37.9212 51.254 35.9643 51.7873C34.0091 52.3192 32.0178 52.5851 29.9922 52.582C17.4237 52.582 7.20006 42.3536 7.20006 29.7789C7.1985 28.5463 7.29704 27.32 7.4957 26.103C7.69435 24.886 7.98999 23.6926 8.38417 22.5225C8.77679 21.3541 9.26169 20.2247 9.83889 19.1344C10.4176 18.0442 11.0793 17.0087 11.8254 16.0264C12.9345 15.3725 14.092 14.8172 15.2964 14.3605C13.9449 17.3857 13.2708 20.5532 13.2723 23.8662C13.2723 36.7522 23.7525 47.2371 36.6323 47.2371C39.0052 47.2402 41.3249 46.8882 43.5899 46.1828L43.582 46.1812ZM46.7105 35.6901C46.7105 22.8041 36.2303 12.3192 23.3505 12.3192C20.9808 12.3176 18.6657 12.6696 16.4023 13.375C16.9998 12.23 17.6881 11.1413 18.4671 10.1121C20.2127 9.08283 22.0648 8.30228 24.02 7.77045C25.9753 7.23706 27.9665 6.9727 29.9922 6.97583C42.559 6.97583 52.7843 17.2042 52.7843 29.7773C52.7859 31.0099 52.6873 32.2363 52.4887 33.4532C52.29 34.6718 51.9944 35.8652 51.6018 37.0337C51.2076 38.2037 50.7227 39.3331 50.1455 40.4234C49.5683 41.5136 48.9051 42.5491 48.1589 43.5314C47.0499 44.1853 45.8924 44.739 44.6879 45.1958C46.041 42.1737 46.7183 39.0062 46.7183 35.6932L46.7105 35.6901ZM23.3599 58.4947C10.7915 58.4947 0.567809 48.2647 0.567809 35.6932C0.567809 34.7656 0.62412 33.8427 0.736743 32.9214C0.849366 32.0016 1.0183 31.0928 1.24198 30.1934C1.46567 29.2924 1.74409 28.4102 2.07414 27.5452C2.40576 26.6786 2.78899 25.8371 3.22384 25.0174C3.65712 24.1994 4.1389 23.4094 4.66917 22.6492C5.19944 21.889 5.77507 21.1648 6.39293 20.475C7.01236 19.7852 7.67089 19.1344 8.36853 18.526C9.06617 17.9159 9.79978 17.3512 10.5662 16.8304C9.28359 18.7465 8.30909 20.8066 7.63961 23.0137C6.97169 25.2192 6.63851 27.4748 6.64164 29.7805C6.64164 42.6664 17.1203 53.1513 30 53.1513C31.8395 53.1529 33.6524 52.9402 35.4419 52.51C37.2298 52.0814 38.9426 51.4495 40.5819 50.6126C40.0485 51.2289 39.4854 51.8155 38.8894 52.3724C38.295 52.9277 37.6709 53.4501 37.0202 53.9397C36.3679 54.4293 35.6922 54.8814 34.993 55.2974C34.2922 55.7151 33.5727 56.0921 32.8312 56.4315C32.0898 56.7709 31.3343 57.0681 30.56 57.3262C29.7873 57.5843 29.0036 57.8002 28.2074 57.9738C27.4112 58.1474 26.6072 58.2773 25.797 58.3649C24.9867 58.4525 24.1749 58.4947 23.3599 58.4947ZM42.7859 48.6417C43.3677 47.7736 43.8871 46.8679 44.3454 45.9278C45.3324 45.5837 46.2897 45.1754 47.2204 44.7015C45.9158 46.2078 44.4392 47.5202 42.7937 48.6417H42.7859ZM49.4275 42.7321C50.7086 40.816 51.6847 38.7543 52.3526 36.5488C53.0205 34.3417 53.3537 32.0861 53.3521 29.7805C53.3521 16.8945 42.8735 6.41272 29.9922 6.41272C28.1542 6.40959 26.3397 6.62232 24.5519 7.05248C22.7624 7.48107 21.0496 8.11301 19.4119 8.94987C19.9437 8.33357 20.5084 7.74699 21.1043 7.19013C21.7003 6.63327 22.3244 6.11082 22.9751 5.62123C23.6274 5.13163 24.3047 4.67957 25.0039 4.26193C25.7047 3.84585 26.4258 3.46887 27.1672 3.12944C27.9087 2.79 28.6657 2.49124 29.4384 2.23471C30.2112 1.97662 30.9964 1.76075 31.7926 1.58713C32.5888 1.41506 33.3928 1.28367 34.203 1.19764C35.0133 1.11004 35.8251 1.06781 36.6401 1.06781C49.2054 1.06781 59.4322 11.2962 59.4322 23.8709C59.4322 24.7969 59.3759 25.7213 59.2633 26.6411C59.1506 27.5609 58.9817 28.4712 58.758 29.3706C58.5343 30.2701 58.2559 31.1523 57.9259 32.0189C57.5942 32.8839 57.211 33.7254 56.7777 34.5451C56.3429 35.3631 55.8611 36.1531 55.3308 36.9133C54.8006 37.6735 54.2249 38.3977 53.6071 39.0891C52.9876 39.7789 52.3291 40.4281 51.6315 41.0381C50.9338 41.6466 50.2002 42.2113 49.4338 42.7321H49.4275Z" fill="#3B3D3E" />
        </svg>
    )
}
const IconMemo = memo(Icon);

const ExpertiseHead = () => {
    const { t } = useTranslation();
    return (
        <>
            <div className={twMerge('flex flex-col sm:flex-row gap-5 sm:gap-0 items-start sm:items-end justify-between', 'w-full')}>
                <div className='block sm:hidden'>
                    <IconMemo />
                </div>
                <div className={twMerge('w-full xxs:w-9/12 sm:w-4/12 mdl:w-5/12')}>
                    <Title h2 weight='bold' degree='1' exchange className="capitalize">{t('experience.title')}</Title>
                </div>
                <div className={twMerge('w-11/12 xxs:w-10/12 sm:w-7/12 md:w-8/12 mdl:w-1/2 xl:w-5/12', 'flex flex-col gap-4 mdl:gap-5', 'sm:items-end')}>
                    <div className='hidden sm:block'>
                        <IconMemo />
                    </div>
                    <Text p weight='medium' degree='3' size='md' className='text-start sm:text-end' exchange>{t('experience.description')}</Text>
                </div>
            </div>
        </>
    )
}
const ExpertiseHeadMemo = memo(ExpertiseHead);

const BORDER_CARD_CLASS_NAME = 'rounded-xl border border-dashed border-black-500'
const Card = ({ title, description, number }: { title: string, description: string, number: string }) => {

    let { hoverProps, isHovered } = useHover({
        onHoverStart: (e) => {
            gsap.to(e.target, {
                scale: 1.05,
                yPercent: -10,
                rotate: 1.6,
                duration: 0.3,
                ease: 'power4.out',
                transformOrigin: 'bottom right'
            })
        },
        onHoverEnd: (e) => {
            gsap.to(e.target, {
                scale: 1,
                yPercent: 0,
                rotate: 0,
                duration: 0.3,
                ease: 'power4.out'
            })
        }
    });

    return <>
        <div className={twMerge(
            'flex flex-col gap-8 sm:gap-12 lg:gap-16 justify-between items-baseline',
            'p-5 sm:p-7 lg:p-5 xl:p-6',
            'transition-colors duration-300 ease-in-out relative',
            isHovered ? 'bg-black-200' : 'bg-transparent',
            BORDER_CARD_CLASS_NAME,
            'w-full h-full'
        )} {...hoverProps} >
            <div className={twMerge('flex flex-row justify-between items-start', 'gap-4', 'w-full')}>
                <Title h5 weight='bold' degree='2' className="max-w-[12rem] transition-all duration-100 delay-100" exchange={!isHovered} >{title}</Title>
                <Text p weight='bold' degree='3' size="lg" exchange={!isHovered} className='opacity-60 duration-100 delay-100'>{number}</Text>
            </div>
            <div className="max-w-[18rem]">
                <Text p weight='medium' degree='3' size="sm" exchange={!isHovered} className='duration-100 delay-100'>{description}</Text>
            </div>
        </div>
    </>
}
const CardMemo = memo(Card);

const EmptyCard = () => {
    return <>
        <div className={twMerge('h-full w-full col-span-1 row-span-1', 'opacity-60 relative', BORDER_CARD_CLASS_NAME)}>
            <span></span>
        </div>
    </>
}
const EmptyCardMemo = memo(EmptyCard);

const CardElement = ({ i }: { i: number }) => {
    const { t } = useTranslation();
    let ref = useRef<HTMLDivElement>(null);

    const isLg = useMedia('(min-width: 1024px)', true);
    const isXs = useMedia('(min-width: 475px)', true);

    const { scrollbar } = useContext(ScrollProvider);

    useIsomorphicLayoutEffect(() => {
        let ctx = gsap.context(() => {
            let space = 40;
            if(isLg) {
            } else if(isXs) {
                space = 35;
            } else {
                space = 30;
            }
            gsap.fromTo(ref.current, {
                y: space * (i % 2 === 0 ? 1 : -1),
            }, {
                y: -1 * space * (i % 2 === 0 ? 1 : -1),
                ease: 'power4.out',
                scrollTrigger: {
                    trigger: '.container-expertise-gsap',
                    start: 'top bottom-=20%',
                    end: 'bottom top-=20%',
                    scrub: true
                }
            });
        });
        return () => ctx.revert();
    }, [ref.current, scrollbar])

    if (i >= 4) return <div key={i} className={`expertise-card-gsap`} ref={ref}>
        <EmptyCardMemo />
    </div>
    return (
        <div className={`expertise-card-gsap relative`} key={i} ref={ref}>
            <CardMemo title={t(`experience.stages.${i + 1}.title`)} description={t(`experience.stages.${i + 1}.description`)} number={t(`experience.stages.${i + 1}.count`)} />
        </div>
    )
}
const CardElementMemo = memo(CardElement);

const ExpertiseStages = () => {

    return (
        <>
            <div className={twMerge(
                'grid',
                'grid-cols-1 xs:grid-cols-2 lg:grid-cols-4',
                'grid-rows-5 xs:grid-rows-3 lg:grid-rows-2',
                'gap-6 xs:gap-3 sm:gap-5 lg:gap-3 xl:gap-4 2xl:gap-5 4xl:gap-6',
                'relative -mb-[42vh] sm:-mb-[34vh] lg:-mb-[40vh] xl:-mb-[36vh] 3xl:-mb-[32vh]',
                'w-full relative z-[60]',
            )}>
                {Array.apply('', Array(8)).map((_, i) => {
                    return <CardElementMemo key={i} i={i} />
                })}
            </div>
        </>
    )
}
const ExpertiseStagesMemo = memo(ExpertiseStages);

const Expertise = () => {
    return (
        <>
            <div className={twMerge('flex flex-col', 'gap-16 lg:gap-28 2xl:gap-44', 'justify-center items-center h-full', rounded({ size: 'xl' }), 'overflow-hidden container-expertise-gsap')}>
                <ExpertiseHeadMemo />
                <ExpertiseStagesMemo />
                <div className={twMerge('absolute w-full h-[26vh] bottom-0 left-0 z-999999999', 'bg-gradient-to-t from-black-100/25 via-black-100/10 to-black-100/0')}></div>
            </div>
        </>
    )
}

export default Expertise;