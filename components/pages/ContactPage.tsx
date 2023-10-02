import { Header, Footer } from '@/components/common';
import { Container, Display, Title, Text, Form, Link, OptionOnSubmit } from '@/components/ui';
import { useState, useMemo, useEffect, useContext } from 'react';
import { twMerge } from 'tailwind-merge';
import { useTranslation } from 'next-i18next';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { gsap } from '@/utils/gsap';
import { getProjectsByCategory } from '@/conf/projects';
import { getMenuItems } from '@/conf/router';
import { ToastRegion, addToast } from '@/components/common/toast';

import { useTime } from '@/hook';
import AnimationConf, { ScrollProvider } from '@/context/AnimationConf';

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
}
import { Input } from 'react-aria-components'
const FormContact = () => {
    const { t, i18n } = useTranslation();
    const [isSubmitted, setIsSubmitted] = useState(false);
    const [isError, setIsError] = useState(false);
    const required = () => z.string(
        { required_error: t(`${ERROR_TRANSLATION_PATH}.required`) }
    ).nonempty(t(`${ERROR_TRANSLATION_PATH}.required`))
    const contactFormDataSchema = z.object({
        firstName: required().min(2, t(`${ERROR_TRANSLATION_PATH}.minLength`, { min: 2 })).max(50, t(`${ERROR_TRANSLATION_PATH}.maxLength`)).regex(/^[a-zA-Z\s]+$/, t(`${ERROR_TRANSLATION_PATH}.pattern`)),
        lastName: required().min(2, t(`${ERROR_TRANSLATION_PATH}.minLength`, { min: 2 })).max(50, t(`${ERROR_TRANSLATION_PATH}.maxLength`)).regex(/^[a-zA-Z\s]+$/, t(`${ERROR_TRANSLATION_PATH}.pattern`)),
        email: required().email(t(`${ERROR_TRANSLATION_PATH}.email`)),
        objective: z.string().nonempty(t(`${ERROR_TRANSLATION_PATH}.required`)),
        message: required().min(10, {
            message: t(`${ERROR_TRANSLATION_PATH}.minLength`, { min: 10 })
        }).max(500, {
            message: t(`${ERROR_TRANSLATION_PATH}.maxLength`, { max: 500 })
        }).nonempty()
    });
    const successMessage = useMemo(() => t('form.notification.success'), [t]);
    const errorMessage = useMemo(() => t('form.notification.error'), [t]);

    const onSubmitForm = async (data: TypeFormContact, options: OptionOnSubmit<TypeFormContact>) => {
        try {
            const response = await fetch('/api/contact', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ ...data, locale: i18n.language })
            });
            const responseData = await response.json();
            addToast({
                variant: 'positive',
                description: successMessage,
            }, {
                timeout: 10000
            });
            options.reset();

        } catch (err) {
            addToast({
                variant: 'negative',
                description: errorMessage
            }, {
                timeout: 10000
            });

            options.reset();
        }
    }
    return (
        <Form<TypeFormContact> onSubmit={onSubmitForm} resolver={zodResolver(contactFormDataSchema)} >
            <Form.LayoutField width='col-span-12 mdl:col-span-6' name='firstName' label={t('form.field.firstName.label')} >
                <Input placeholder={t('form.field.firstName.placeholder')} />
            </Form.LayoutField>
            <Form.LayoutField width='col-span-12 mdl:col-span-6' name='lastName' label={t('form.field.lastName.label')} >
                <Input placeholder={t('form.field.lastName.placeholder')} />
            </Form.LayoutField>
            <Form.LayoutField name='email' inputMode='email' label={t('form.field.email.label')} >
                <Input placeholder={t('form.field.email.placeholder')} />
            </Form.LayoutField>
            <Form.Select name='objective' label={t('form.field.objective.label')} placeholder={t('form.field.objective.placeholder')} items={contactSubjectItems} defaultSelectedKey={'1'}>
                {(item) => {
                    return <Form.Item key={item.key} id={item.text} >
                        {t(`form.field.objective.options.${item.key}`)}
                    </Form.Item>
                }}
            </Form.Select>
            <Form.LayoutField name='message' label={t('form.field.message.label')} >
                <textarea placeholder={t('form.field.message.placeholder')} />
            </Form.LayoutField>
            <Form.Button className={twMerge(
                'text-xs md:text-sm',
                'px-10 py-4 w=full bg-white-100 font-semibold',
                'rounded-sm',
                'col-span-12 w-1/2 xxs:w-5/12 sm:w-4/12 md:w-3/12 place-self-end'
            )} >
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
            <ul className={twMerge('flex flex-col gap-0', 'border-b border-gray-800/60')}>
                {projects.map((project, index) => {
                    return (
                        <li key={index} className={twMerge('flex flex-col md:flex-row gap-8 md:gap-4 py-10', 'items-start', 'border-t border-gray-800/60')}>
                            <div className={twMerge('flex flex-row gap-12 items-start justify-between w-full md:w-5/12 2xl:w-1/2')}>
                                <Title h6 weight='semibold' degree='1' className='uppercase tracking-wider opacity-80' >
                                    {t(`projects.${project.id}.title`)}
                                </Title>
                                <Text p size='sm' weight='bold' degree='1' className='block md:hidden tracking-wider opacity-80'>
                                    {t(`country.${project.country}`)}
                                </Text>
                            </div>
                            <div className={twMerge('w-full xxs:w-10/12 md:w-7/12 2xl:w-1/2', 'flex flex-col gap-5')}>
                                <Text p size='sm' weight='bold' degree='1' className='hidden md:block tracking-wider opacity-80'>
                                    {t(`country.${project.country}`)}
                                </Text>
                                <Text p size='sm' weight='medium' degree='2'>
                                    {t(`projects.${project.id}.description`)}
                                </Text>
                                <div className='inline' style={{
                                    display: '-webkit-box'
                                }}>
                                    {project.jobTitle.map((jobTitle, index) => {
                                        return <Text key={index} p size='sm' weight='medium' degree='2' className={twMerge('pr-2')}>
                                            {t(`jobTItle.${jobTitle}`)}{index < project.jobTitle.length - 1 ? ',' : ''}
                                        </Text>
                                    })}
                                </div>
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
    const { scrollbar } = useContext(ScrollProvider);
    const timer = useTime({
        city: 'Casablanca',
        country: 'Africa',
        format: 'HH:mm',
    })
    useEffect(() => {
        let ctx = gsap.context(() => {
            gsap.timeline({
                scrollTrigger: {
                    trigger: '#contact',
                    start: 'top 60%',
                    toggleActions: 'play play restart play',
                    markers: false,
                }
            }).from('.splitText_gsap', {
                yPercent: 220,
                skewY: 7,
                duration: 1.2,
                ease: 'Power4.easeOut',
                delay: 0.2,
            });
        });
        return () => ctx.revert();
    }, [scrollbar]);
    // if (!timer) return null;
    return (
        <>
            <Container as='section' size='lg' data-scroll-section id='contact' className={twMerge('flex flex-col gap-12', 'items-stretch')} >
                <section className={twMerge('flex flex-col gap-14 xl:gap-20 py-40')}>
                    {/* title */}
                    <div className='grid grid-cols-12 gap-4 overflow-hidden'>
                        <Display size='xl' weight='bold' className={twMerge('col-start-1 col-span-12', 'mdl:col-start-4 mdl:col-span-9', 'lg:col-start-3 lg:col-span-10', 'splitText_gsap')} >
                            {t('contact.title')}
                        </Display>
                    </div>
                    {/* form */}
                    <div className={twMerge(
                        'grid grid-cols-12 gap-y-10 gap-x-0 xxs:gap-8 sm:gap-3 md:gap-8 mdl:gap-4 xl:gap-8',
                        'grid-rows-[repeat(3,_minmax(0,_auto))] xxs:grid-rows-[repeat(2,_minmax(0,_auto))] sm:grid-rows-2'
                    )}>
                        <div className={twMerge(
                            'flex flex-col gap-3',
                            'col-start-1 col-span-12',
                            'xxs:col-start-1 xxs:col-span-4',
                            'sm:col-start-10 sm:col-span-3',
                            'mdl:col-start-1 mdl:col-span-2',
                            'row-start-1 row-span-1'
                        )}>
                            <Text p weight='medium' size='sm' degree='2' className='text-start uppercase' >
                                {t('contact.subtitle')}
                            </Text>
                            <hr className='relative h-[2px] w-4 bg-gray-200' />
                        </div>
                        <div className={twMerge(
                            'col-start-1 col-span-12',
                            'xxs:col-start-1 xxs:col-span-12',
                            'xs:col-start-1 xs:col-span-11',
                            'sm:col-start-1 sm:col-span-9',
                            'mdl:col-start-4 mdl:col-span-9',
                            'lg:col-start-3 lg:col-span-9',
                            'xl:col-start-3 xl:col-span-8',
                            'row-start-3 row-span-1',
                            'xxs:row-start-2 xxs:row-span-1',
                            'sm:row-start-1 sm:row-span-2'
                        )}>
                            <FormContact />
                        </div>
                        <div className={twMerge(
                            'flex flex-col sm:justify-end items-start xl:items-end',
                            'col-start-1 col-span-12',
                            'xxs:col-start-8 xxs:col-span-4',
                            'sm:col-start-10 sm:col-span-3',
                            'mdl:col-start-1 mdl:col-span-3',
                            'lg:col-start-1 lg:col-span-2',
                            'xl:col-start-11 xl:col-span-2',
                            'row-start-2 row-span-1',
                            'xxs:row-start-1 xxs:row-span-1',
                            'sm:row-start-2 sm:row-span-1'
                        )} >
                            <div className='flex flex-col gap-1'>
                                <Text size='sm' degree='2' p weight='medium' suppressHydrationWarning className='whitespace-nowrap-important'>
                                    {t('contact.localTime')} {timer?.formattedTime}
                                </Text>
                                <Text size='sm' degree='2' p weight='medium' suppressHydrationWarning >
                                    {t('contact.gmtTime')}({timer?.gmtOffset})
                                </Text>
                            </div>
                        </div>
                    </div>
                    <span className='h-6 md:h-10'></span>
                    {/* repped */}
                    <div className={twMerge(
                        'grid grid-cols-12 gap-x-0 gap-y-8 xs:gap-8'
                    )}>
                        <div className={twMerge(
                            'flex flex-col',
                            'gap-3',
                            'col-start-1 col-span-12',
                            'sm:col-start-1 sm:col-span-2'
                        )}>
                            <Text p weight='medium' size='sm' degree='2' className='text-start uppercase' >
                                {t('contact.reppedBy')}
                            </Text>
                            <hr className='relative h-[2px] w-4 bg-gray-200' />
                        </div>
                        <div className={twMerge(
                            'col-start-1 col-span-12',
                            'xs:col-start-1 xs:col-span-11',
                            'sn:col-start-1 sm:col-span-9',
                            'mdl:col-start-3 mdl:col-span-8',
                            'lg:col-start-3 lg:col-span-7',
                            'xl:col-start-3 xl:col-span-6'
                        )}>
                            <AgencyList />
                        </div>
                        <div className={twMerge(
                            'flex flex-row flex-wrap sm:flex-col gap-x-10 xs:gap-x-12 gap-y-4 sm:gap-4 justify-start xs:justify-end items-end',
                            'col-start-1 col-span-12',
                            'xs:col-start-1 xs:col-span-11',
                            'sm:col-start-11 sm:col-span-2'
                        )} >
                            {socialNetworkItems.map((item, index) => {
                                return (
                                    <Link key={index} weight='medium' href={item.link} size='sm' degree='2'>
                                        {t(`socialNetwork.${item.id}.name`)}
                                    </Link>
                                )
                            })}
                        </div>
                    </div>
                </section>
            </Container>
            <Container as='section' size='lg' className='py-0'  data-scroll-section id='footer' >
                <Footer />
            </Container>
        </>
    )
}

export default ContactPage;