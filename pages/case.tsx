import { Container } from '@/components/ui';
import { Head } from '@/components/common';
import { useRef } from 'react';
import { Noise } from '@/components/ui';
import '@/utils/i18n';
import ScrollContextProvider from '@/context/ScrollContext';
import AnimationConf from '@/context/AnimationConf';
import { useEffect } from 'react';
import { Header, Footer } from '@/components/common';
import { useIsomorphicLayoutEffect } from 'react-use';
import { gsap } from 'gsap';
import '@/components/InitGsap';

import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import { twMerge } from 'tailwind-merge';
import { ScrollTrigger } from 'gsap/dist/ScrollTrigger';


const Test = () => {
    let ref = useRef(null);
    useIsomorphicLayoutEffect(() => {
        let ctx = gsap.context(() => {
            gsap.set('.section' as any, {
                x: 0,
                top: 0,
                left: 0,
            })
            let tl = gsap.timeline({
                
            });
            tl.to('.section', {
                yPercent: 100,
            })
            
            ScrollTrigger.create({
                animation: tl.current,
                scrub: true,
                start: 'start start',
                end: 'bottom bottom',
                toggleActions: 'restart reverse reverse reverse',
                trigger: '.section' as any,
                pin: '.section' as any,
            })
        });
        return () => ctx.revert();
    }, []);
    
    return <div className='h-[300vh] relative' >
        <section className={twMerge('section h-screen w-full', 'left-0 right-0', 'flex justify-center items-start', 'absolute left-0 right-0')} style={{ backgroundColor: 'red' }}ref={ref}>
            One
        </section>
    </div>
}

export default function Case() {
    return (
        <>
            <Head title={"Mohamed Amine SAYAGH - Full Stack Web Developer"}
                description={"Mohamed Amine SAYAGH - Full Stack Web Developer"}
                keywords="Mohamed Amine SAYAGH - Full Stack Web Developer"
                author="Mohamed Amine SAYAGH"
                logo='/favicon.svg'
            />
            <ScrollContextProvider >
                <AnimationConf >
                    <Header />
                    <div id='scroller'>
                        <div >

                            <div className='h-[200vh]'>

                            </div>
                            <Test />
                            <div className='h-[200vh]'>

                            </div>
                        </div>
                    </div>
                    <Noise />
                </AnimationConf>
            </ScrollContextProvider>
        </>
    )
}

import nextI18NextConfig from '../next-i18next.config.js'

export async function getStaticProps({ locale }: any) {
  return {
    props: {
      ...(await serverSideTranslations(locale, ['common'], nextI18NextConfig)),
    },
  };
}