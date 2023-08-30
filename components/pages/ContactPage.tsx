import { Header, Footer } from '@/components/common';
import { Container, Display, Title, Text, Form, Link } from '@/components/ui';
import { useState, useMemo } from 'react';
import { twMerge } from 'tailwind-merge';
import { useTranslation } from 'next-i18next';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';

import { getProjectsByCategory } from '@/conf/projects';
import { getMenuItems } from '@/conf/router';

import { useTime } from '@/hook';
import AnimationConf from '@/context/AnimationConf';
import ScrollContextProvider from '@/context/ScrollContext';

const CONTACT_SUBJECTS = {
    "1": "Project Inquiry",
    "2": "Job Opportunity",
    "3": "Portfolio Feedback",
    "4": "Getting to know Each Other",
    "5": "Say Hello",
    "6": "Other"
} as const;

const ERROR_TRANSLATION_PATH = 'form.error';

type ContactSubject = typeof CONTACT_SUBJECTS[keyof typeof CONTACT_SUBJECTS];
const contactSubjectValues = Object.values(CONTACT_SUBJECTS);
const contactSubjectKeys = Object.keys(CONTACT_SUBJECTS);

const contactSubjectItems = [
    {
        key: "1",
        text: contactSubjectValues[0]
    },
    {
        key: '2',
        text: contactSubjectValues[1]
    },
    {
        key: '3',
        text: contactSubjectValues[2]
    },
    {
        key: '4',
        text: contactSubjectValues[3]
    },
    {
        key: '5',
        text: contactSubjectValues[4]
    },
    {
        key: '6',
        text: contactSubjectValues[5]
    },
]

type TypeFormContact = {
    firstName: string;
    lastName: string;
    email: string;
    objective: ContactSubject;
    message: string;
    consent: boolean;
}
const FormContact = () => {
    const { t } = useTranslation();
    
    const required = () => z.string(
        { required_error: t(`${ERROR_TRANSLATION_PATH}.required`) || 'required' }
    )
    const contactFormDataSchema = z.object({
        firstName: required().min(2, t(`${ERROR_TRANSLATION_PATH}.minLength`, { min: 2 })).max(50, t(`${ERROR_TRANSLATION_PATH}.maxLength`)).nonempty().regex(/^[a-zA-Z\s]+$/, t(`${ERROR_TRANSLATION_PATH}.pattern`)),
        lastName: required().min(2, t(`${ERROR_TRANSLATION_PATH}.minLength`, { min: 2 })).max(50, t(`${ERROR_TRANSLATION_PATH}.maxLength`)).nonempty().regex(/^[a-zA-Z\s]+$/, t(`${ERROR_TRANSLATION_PATH}.pattern`)),
        email: required().email(t(`${ERROR_TRANSLATION_PATH}.email`)),
        objective: required().refine(value => contactSubjectValues.includes(value as ContactSubject), { message: t(`${ERROR_TRANSLATION_PATH}.objective`) }),
        message: required().min(10, {
            message: t(`${ERROR_TRANSLATION_PATH}.minLength`, { min: 10 })
        }).max(500, {
            message: t(`${ERROR_TRANSLATION_PATH}.maxLength`, { max: 500 })
        }).nonempty()
    });

    const onSubmitForm = (data: TypeFormContact) => {

    }
    return (
        <Form<TypeFormContact> onSubmit={onSubmitForm} resolver={zodResolver(contactFormDataSchema)} >
            <Form.LayoutField width='col-span-12 md:col-span-6' name='firstName' label={t('form.field.firstName.label')} >
                <Form.Input placeholder={t('form.field.firstName.placeholder')} />
            </Form.LayoutField>
            <Form.LayoutField width='col-span-12 md:col-span-6' name='lastName' label={t('form.field.lastName.label')} >
                <Form.Input placeholder={t('form.field.lastName.placeholder')} />
            </Form.LayoutField>
            <Form.LayoutField name='email' inputMode='email' label={t('form.field.email.label')} >
                <Form.Input placeholder={t('form.field.email.placeholder')} />
            </Form.LayoutField>
            <Form.Select name='objective' label={t('form.field.objective.label')} placeholder={t('form.field.objective.placeholder')} items={contactSubjectItems}>
                {(item) => {
                    return <Form.Item key={item.key} >
                        {t(`form.field.objective.options.${item.key}`)}
                    </Form.Item>
                }}
            </Form.Select>
            <Form.LayoutField name='message' label={t('form.field.message.label')} >
                <textarea placeholder={t('form.field.message.placeholder')} />
            </Form.LayoutField>
            <Form.Button className={twMerge('px-10 py-4 w=full bg-white-100 font-semibold', 'rounded-sm', 'col-span-12 w-3/12 place-self-end')} >
                {t('form.field.submit.label')}
            </Form.Button>
        </Form>
    )
}

const AgencyList = () => {
    const { t } = useTranslation();

    const projects = useMemo(() => getProjectsByCategory('ongoing'), []);

    return (
        <>
            <ul className={twMerge('flex flex-col gap-0', 'border-b border-gray-800')}>
                {projects.map((project, index) => {
                    return (
                        <li key={project.id} className={twMerge('flex flex-row gap-4 py-10', 'border-t  border-gray-800')}>
                            <div className={twMerge('w-1/2')}>
                                <Title h6 weight='semibold' degree='2' className='uppercase tracking-wider' >
                                    {t(`projects.${project.id}.title`)}
                                </Title>
                            </div>
                            <div className={twMerge('w-1/2', 'flex flex-col gap-5 ')}>
                                <Text p size='sm' weight='bold' degree='1' className='tracking-wider'>
                                    {t(`country.${project.country}`)}
                                </Text>
                                <Text p size='sm' weight='medium' degree='2'>
                                    {t(`projects.${project.id}.description`)}
                                </Text>
                                <Text className='inline' p size='sm' weight='medium' degree='2' style={{
                                    display: '-webkit-box'
                                }}>
                                    {project.jobTitle.map((jobTitle, index) => {
                                        return <>
                                            <span key={index} className={twMerge('pr-2')}>
                                                {t(`jobTItle.${jobTitle}`)}{index < project.jobTitle.length - 1 ? ',' : ''}
                                            </span>
                                        </>
                                    })}
                                </Text>
                            </div>
                        </li>
                    )
                })}
            </ul>
        </>
    )
}

const ContactPage = () => {

    const { t } = useTranslation();
    const socialNetworkItems = useMemo(() => getMenuItems('socialNetworks'), []);

    const timer = useTime({
        city: 'Casablanca',
        country: 'Africa',
        format: 'HH:mm',
    })
    if (!timer) return null;
    return (
        <>
            <ScrollContextProvider >
                <AnimationConf>
                    <Header />
                    <div id='scroller'>
                        <Container as='section' size='lg' className={twMerge('flex flex-col gap-12', 'items-stretch')} >
                            <div className={twMerge('flex flex-col gap-14 xl:gap-20 py-40')}>
                                {/* title */}
                                <div className='grid grid-cols-12 gap-4'>
                                    <Display size='xl' weight='bold' className={twMerge('col-start-1 col-span-12','mdl:col-start-4 mdl:col-span-9', 'lg:col-start-3 lg:col-span-10')} >
                                        {t('contact.title')}
                                    </Display>
                                </div>
                                {/* form */}
                                <div className={twMerge('grid grid-cols-12 gap-8 mdl:gap-4 xl:gap-8', 'grid-rows-2')}>
                                    <div className={twMerge(
                                        'flex flex-col gap-3',
                                        'col-start-9 col-span-4',
                                        'md:col-start-10 md:col-span-3', 
                                        'mdl:col-start-1 mdl:col-span-2', 
                                        'row-start-1 row-span-1'
                                    )}>
                                        <Text p weight='medium' size='sm' degree='2' className='text-start uppercase' >
                                            {t('contact.subtitle')}
                                        </Text>
                                        <hr className='relative h-[2px] w-4 bg-gray-200'/>
                                    </div>
                                    <div className={twMerge(
                                        'col-start-1 col-span-8',
                                        'md:col-start-1 md:col-span-9',
                                        'mdl:col-start-4 mdl:col-span-9',
                                        'lg:col-start-3 lg:col-span-9',
                                        'xl:col-start-3 xl:col-span-8',
                                        'row-start-1 row-span-2'
                                    )}>
                                        <FormContact />
                                    </div>
                                    <div className={twMerge(
                                        'flex flex-col justify-end items-start xl:items-end',
                                        'col-start-9 col-span-4',
                                        'md:col-start-10 md:col-span-3',
                                        'mdl:col-start-1 mdl:col-span-3',
                                        'lg:col-start-1 lg:col-span-2',
                                        'xl:col-start-11 xl:col-span-2',
                                        'row-start-2 row-span-1'
                                    )} >
                                        <div className='flex flex-col gap-1'>
                                            <Text size='sm' degree='2' p weight='medium' >
                                                {t('contact.localTime')} {timer?.formattedTime}
                                            </Text>
                                            <Text size='sm' degree='2' p weight='medium' >
                                                {t('contact.gmtTime')}({timer?.gmtOffset})
                                            </Text>
                                        </div>
                                    </div>
                                </div>
                                <span className='h-10'></span>
                                {/* repped */}
                                <div className={twMerge('grid grid-cols-12 gap-8')}>
                                    <div className={twMerge('flex flex-col gap-3', 'col-start-1 col-span-2')}>
                                        <Text p weight='medium' size='sm' degree='2' className='text-start uppercase' >
                                            {t('contact.reppedBy')}
                                        </Text>
                                        <hr className='relative h-[2px] w-4 bg-gray-200'/>
                                    </div>
                                    <div className={twMerge('col-start-3 col-span-6')}>
                                        {/* <AgencyList /> */}
                                    </div>
                                    <div className={twMerge('flex flex-col gap-4 justify-end items-end', 'col-start-11 col-span-2')} >
                                        {socialNetworkItems.map((item, index) => {
                                            return (
                                                <Link key={index} weight='medium' href={item.link} size='sm' degree='2'>
                                                    {t(`socialNetwork.${item.id}.name`)}
                                                </Link>
                                            )
                                        })}
                                    </div>
                                </div>
                            </div>
                        </Container>
                        <Container as='section' size='lg' className='py-0' >
                            <Footer />
                        </Container>
                    </div>
                </AnimationConf>
            </ScrollContextProvider >
        </>
    )
}

export default ContactPage;