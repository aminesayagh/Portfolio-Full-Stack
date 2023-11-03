import Container from "@/components/ui/container";
import Title from '@/components/ui/typography/Title';
import Text from '@/components/ui/typography/Text';
import Display from '@/components/ui/typography/Display';

import Head from '@/components/common/head';

import React from "react";
import { twMerge } from 'tailwind-merge';

import AnimationConf from '@/context/AnimationConf';

const listText = 'flex flex-col gap-8';
const TEXT_LOREM = 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.';
const title = (h: number) => `that is a title h${h} of my portfolio.`;
const DEFAULT_TITLE_CLASSNAME = 'capitalize';

const Divider = () => {
    return <span className='h-px w-full bg-gray-600 dark:bg-gray-700' />
}
const Color = ({ className }: { className: string }) => {
    return <div className={twMerge('h-24 w-24', className)}></div>
}
const TitleOfSection = ({ children }: { children: React.ReactNode }) => {
    return <div className="flex flex-col gap-6">
        <Title h5 weight='bold' degree="3">{children}</Title>
        <Divider />
    </div>
}

const Section = ({ title, children }: { title: string, children: React.ReactNode }) => {
    return (
        <div className='flex flex-col md:flex-row gap-6'>
            <div className='w-32'>
                <Text p weight='bold' degree='3' size='md'>
                    {title}
                </Text>
            </div>
            {children}
        </div>
    )
}
export default function App() {
    return (
        <>
            <Head title={"Mohamed Amine SAYAGH - Full Stack Web Developer"}
                description={"Mohamed Amine SAYAGH - Full Stack Web Developer"}
                keywords="Mohamed Amine SAYAGH - Full Stack Web Developer"
                author="Mohamed Amine SAYAGH"
                logo='/favicon.svg'
            />
            <AnimationConf>
                <div data-scroll-container className='flex flex-col gap-12 py-40'>
                    {/* typography */}
                    <Container as='section' size='lg' className='flex flex-col gap-40 py-40'>
                        <div className='flex flex-col gap-12'>
                            <TitleOfSection >
                                TYPOGRAPHY DISPLAY BRAND
                            </TitleOfSection>
                            <div className='flex flex-col gap-24'>
                                <Section title="Display weight bold">
                                    <div className={`${listText}`}>
                                        <Display size='xl' weight='bold'>Display: 1</Display>
                                        <Display size='lg' weight='bold'>Display: 2</Display>
                                        <Display size='md' weight='bold'>Display: 3</Display>
                                    </div>
                                </Section>
                                <Section title="Display weight semibold">
                                    <div className={`${listText}`}>
                                        <Display size='xl' weight='semibold'>Display: 1</Display>
                                        <Display size='lg' weight='semibold'>Display: 2</Display>
                                        <Display size='md' weight='semibold'>Display: 3</Display>
                                    </div>
                                </Section>
                                <Section title='Display weight medium'>
                                    <div className={`${listText}`}>
                                        <Display size='xl' weight='medium'>Display: 1</Display>
                                        <Display size='lg' weight='medium'>Display: 2</Display>
                                        <Display size='md' weight='medium'>Display: 3</Display>
                                    </div>
                                </Section>
                            </div>
                        </div>
                        <div className='flex flex-col gap-12'>
                            <TitleOfSection >TYPOGRAPHY TITLE BRAND</TitleOfSection>
                            <div className="flex flex-col gap-24">
                                <Section title='Title weight bold'>
                                    <div className={`${listText}`}>
                                        <Title weight='bold' degree='1' h1 className={`${DEFAULT_TITLE_CLASSNAME}`}>{title(1)}</Title>
                                        <Title weight='bold' degree='1' h2 className={`${DEFAULT_TITLE_CLASSNAME}`}>{title(2)}</Title>
                                        <Title weight='bold' degree='1' h3 className={`${DEFAULT_TITLE_CLASSNAME}`}>{title(3)}</Title>
                                        <Title weight='bold' degree='1' h4 className={`${DEFAULT_TITLE_CLASSNAME}`}>{title(4)}</Title>
                                        <Title weight='bold' degree='1' h5 className={`${DEFAULT_TITLE_CLASSNAME}`}>{title(5)}</Title>
                                        <Title weight='bold' degree='1' h6 className={`${DEFAULT_TITLE_CLASSNAME}`}>{title(6)}</Title>
                                    </div>
                                </Section>
                                <Section title='Title weight semibold'>
                                    <div className={`${listText}`}>
                                        <Title weight='semibold' degree='1' h1 className={`${DEFAULT_TITLE_CLASSNAME}`}>{title(1)}</Title>
                                        <Title weight='semibold' degree='1' h2 className={`${DEFAULT_TITLE_CLASSNAME}`}>{title(2)}</Title>
                                        <Title weight='semibold' degree='1' h3 className={`${DEFAULT_TITLE_CLASSNAME}`}>{title(3)}</Title>
                                        <Title weight='semibold' degree='1' h4 className={`${DEFAULT_TITLE_CLASSNAME}`}>{title(4)}</Title>
                                        <Title weight='semibold' degree='1' h5 className={`${DEFAULT_TITLE_CLASSNAME}`}>{title(5)}</Title>
                                        <Title weight='semibold' degree='1' h6 className={`${DEFAULT_TITLE_CLASSNAME}`}>{title(6)}</Title>
                                    </div>
                                </Section>
                                <Section title='Title weight medium'>
                                    <div className={`${listText}`}>
                                        <Title weight='medium' degree='1' h1 className={`${DEFAULT_TITLE_CLASSNAME}`}>{title(1)}</Title>
                                        <Title weight='medium' degree='1' h2 className={`${DEFAULT_TITLE_CLASSNAME}`}>{title(2)}</Title>
                                        <Title weight='medium' degree='1' h3 className={`${DEFAULT_TITLE_CLASSNAME}`}>{title(3)}</Title>
                                        <Title weight='medium' degree='1' h4 className={`${DEFAULT_TITLE_CLASSNAME}`}>{title(4)}</Title>
                                        <Title weight='medium' degree='1' h5 className={`${DEFAULT_TITLE_CLASSNAME}`}>{title(5)}</Title>
                                        <Title weight='medium' degree='1' h6 className={`${DEFAULT_TITLE_CLASSNAME}`}>{title(6)}</Title>
                                    </div>
                                </Section>
                            </div>
                        </div>
                        <div className='flex flex-col gap-12'>
                            <TitleOfSection >TYPOGRAPHY TEXT BRAND</TitleOfSection>
                            <Section title='Text weight bold'>
                                <div className={`${listText} w-full md:w-1/2`}>
                                    <Text p weight='bold' degree='3' size='lg'>
                                        {TEXT_LOREM}
                                    </Text>
                                    <Text p weight='bold' degree='3' size='md'>
                                        {TEXT_LOREM}
                                    </Text>
                                    <Text p weight='bold' degree='3' size='sm'>
                                        {TEXT_LOREM}
                                    </Text>
                                    <Text p weight='bold' degree='3' size='xs'>
                                        {TEXT_LOREM}
                                    </Text>
                                </div>
                            </Section>
                            <Section title='Text weight semibold'>
                                <div className={`${listText} w-full md:w-1/2`}>
                                    <Text p weight='semibold' degree='3' size='lg'>
                                        {TEXT_LOREM}
                                    </Text>
                                    <Text p weight='semibold' degree='3' size='md'>
                                        {TEXT_LOREM}
                                    </Text>
                                    <Text p weight='semibold' degree='3' size='sm'>
                                        {TEXT_LOREM}
                                    </Text>
                                    <Text p weight='semibold' degree='3' size='xs'>
                                        {TEXT_LOREM}
                                    </Text>
                                </div>
                            </Section>
                            <Section title='Text weight medium'>
                                <div className={`${listText} w-full md:w-1/2`}>
                                    <Text p weight='medium' degree='3' size='lg'>
                                        {TEXT_LOREM}
                                    </Text>
                                    <Text p weight='medium' degree='3' size='md'>
                                        {TEXT_LOREM}
                                    </Text>
                                    <Text p weight='medium' degree='3' size='sm'>
                                        {TEXT_LOREM}
                                    </Text>
                                    <Text p weight='medium' degree='3' size='xs'>
                                        {TEXT_LOREM}
                                    </Text>
                                </div>
                            </Section>
                        </div>
                        <div className='flex flex-col gap-8'>
                            <div>
                                <TitleOfSection >TYPOGRAPHY COLOR BRAND</TitleOfSection>
                            </div>
                            <div className="flex flex-row flex-wrap gap-4 lg:gap-12 justify-between items-start">
                                <Title h4 weight='bold' degree="1" className='w-full md:w-1/2 xl:w-1/4'>TYPOGRAPHY TEXT BRAND</Title>
                                <Title h4 weight='bold' degree="2" className='w-full md:w-1/2 xl:w-1/4'>TYPOGRAPHY TEXT BRAND</Title>
                                <Title h4 weight='bold' degree="3" className='w-full md:w-1/2 xl:w-1/4'>TYPOGRAPHY TEXT BRAND</Title>
                                <Title h4 weight='bold' degree="4" className='w-full md:w-1/2 xl:w-1/4'>TYPOGRAPHY TEXT BRAND</Title>
                            </div>
                            <div className='flex flex-row flex-wrap gap-4 lg:gap-12 justify-between items-start'>
                                <Text p weight='medium' degree='1' size='md' className='w-full xl:w-1/2' >
                                    {TEXT_LOREM}
                                </Text>
                                <Text p weight='medium' degree='2' size='md' className='w-full xl:w-1/2' >
                                    {TEXT_LOREM}
                                </Text>
                                <Text p weight='medium' degree='3' size='md' className='w-full xl:w-1/2' >
                                    {TEXT_LOREM}
                                </Text>
                                <Text p weight='medium' degree='4' size='md' className='w-full xl:w-1/2' >
                                    {TEXT_LOREM}
                                </Text>
                            </div>
                        </div>
                    </Container>
                    {/* color palette */}
                    <Container as='section' size='lg' className='flex flex-col gap-12'>
                        <div className='flex flex-col gap-12'>
                            <TitleOfSection >COLOR PALETTE</TitleOfSection>
                            <div className='flex flex-col gap-12' >
                                <Section title='Color Primary'>
                                    <Color className='bg-primary-100' />
                                    <Color className='bg-primary-200' />
                                    <Color className='bg-primary-300' />
                                    <Color className='bg-primary-400' />
                                    <Color className='bg-primary-500' />
                                    <Color className='bg-primary-600' />
                                    <Color className='bg-primary-700' />
                                    <Color className='bg-primary-800' />
                                    <Color className='bg-primary-900' />
                                </Section>
                                <Section title='Color Secondary'>
                                    <Color className='bg-secondary-100' />
                                    <Color className='bg-secondary-200' />
                                    <Color className='bg-secondary-300' />
                                    <Color className='bg-secondary-400' />
                                    <Color className='bg-secondary-500' />
                                    <Color className='bg-secondary-600' />
                                    <Color className='bg-secondary-700' />
                                    <Color className='bg-secondary-800' />
                                    <Color className='bg-secondary-900' />
                                </Section>
                                <Section title='Color White'>
                                    <Color className='bg-white-100' />
                                    <Color className='bg-white-200' />
                                    <Color className='bg-white-300' />
                                    <Color className='bg-white-400' />
                                    <Color className='bg-white-500' />
                                    <Color className='bg-white-600' />
                                    <Color className='bg-white-700' />
                                    <Color className='bg-white-800' />
                                    <Color className='bg-white-900' />
                                </Section>
                                <Section title='Color Gray'>
                                    <Color className='bg-gray-100' />
                                    <Color className='bg-gray-200' />
                                    <Color className='bg-gray-300' />
                                    <Color className='bg-gray-400' />
                                    <Color className='bg-gray-500' />
                                    <Color className='bg-gray-600' />
                                    <Color className='bg-gray-700' />
                                    <Color className='bg-gray-800' />
                                    <Color className='bg-gray-900' />
                                </Section>
                                <Section title='Color Black'>
                                    <Color className='bg-black-100' />
                                    <Color className='bg-black-200' />
                                    <Color className='bg-black-300' />
                                    <Color className='bg-black-400' />
                                    <Color className='bg-black-500' />
                                    <Color className='bg-black-600' />
                                    <Color className='bg-black-700' />
                                    <Color className='bg-black-800' />
                                    <Color className='bg-black-900' />
                                </Section>
                                <Section title='Color Red'>
                                    <Color className='bg-red-100' />
                                    <Color className='bg-red-200' />
                                    <Color className='bg-red-300' />
                                    <Color className='bg-red-400' />
                                    <Color className='bg-red-500' />
                                    <Color className='bg-red-600' />
                                    <Color className='bg-red-700' />
                                    <Color className='bg-red-800' />
                                    <Color className='bg-red-900' />
                                </Section>
                            </div>
                        </div>
                    </Container>
                </div>
            </AnimationConf>
        </>
    )
}