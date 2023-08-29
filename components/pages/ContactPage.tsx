import { Header, Footer } from '@/components/common';
import { Container, Display, Title, Text, Form } from '@/components/ui';
import { useState, useEffect } from 'react';
import { twMerge } from 'tailwind-merge';
import { useTranslation } from 'next-i18next';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { useTime } from '@/hook';

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
    name: string;
    email: string;
    objective: ContactSubject;
    message: string;
    phoneNumber?: string;
    consent: boolean;
}
const contactSubjectEnum = z.union([
    z.literal(contactSubjectKeys[0]),
    z.literal(contactSubjectKeys[1]),
    z.literal(contactSubjectKeys[2]),
    z.literal(contactSubjectKeys[3]),
    z.literal(contactSubjectKeys[4]),
    z.literal(contactSubjectKeys[5]),
]);
const FormContact = () => {
    const { t } = useTranslation();

    const contactFormDataSchema = z.object({
        name: z.string().min(2, t(`${ERROR_TRANSLATION_PATH}.minLength`, { min: 2 })).max(50, t(`${ERROR_TRANSLATION_PATH}.maxLength`)).nonempty().regex(/^[a-zA-Z\s]+$/, t(`${ERROR_TRANSLATION_PATH}.pattern`)),
        email: z.string().email(t(`${ERROR_TRANSLATION_PATH}.email`)),
        objective: contactSubjectEnum,
        message: z.string().min(10).max(500).nonempty(),
        phoneNumber: z.string().min(10).max(15).regex(/^[0-9]+$/).optional(),
        consent: z.boolean().refine(value => value === true, { message: t(`${ERROR_TRANSLATION_PATH}.consent`) })
    });

    const onSubmitForm = (data: TypeFormContact) => {

    }
    return (
        <Form<TypeFormContact> onSubmit={onSubmitForm} resolver={zodResolver(contactFormDataSchema)} >
            <Form.LayoutField name='firstName' label={t('form.field.firstName.label')} >
                <Form.Input placeholder={t('form.field.firstName.placeholder')} />
            </Form.LayoutField>
            <Form.LayoutField name='lastName' label={t('form.field.lastName.label')} >
                <Form.Input name='lastName' label={t('form.field.lastName.label')} placeholder={t('form.field.lastName.placeholder')} />
            </Form.LayoutField>
            <Form.Input name='email' label={t('form.field.email.label')} placeholder={t('form.field.email.placeholder')} />
            <Form.Select name='objective' label={t('form.field.objective.label')} placeholder={t('form.field.objective.placeholder')} items={contactSubjectItems}>
                {(item) => {
                    return <Form.Item key={item.key} >
                        {t(`form.field.objective.options.${item.key}`)}
                    </Form.Item>
                }}
            </Form.Select>
            <Form.Input name='phoneNumber' label={t('form.field.phoneNumber.label')} placeholder={t('form.field.phoneNumber.placeholder')} />
            <Form.Input name='message' label={t('form.field.message.label')} placeholder={t('form.field.message.placeholder')} />
            <Form.Button >
                {t('form.submit.label')}
            </Form.Button>
        </Form>
    )
}

const ContactPage = () => {
    
    const { t } = useTranslation();
    const timer = useTime({
        city: 'Casablanca',
        country: 'Africa',
        format: 'HH:mm',
    })
    console.log(timer)
    if(!timer) return null;
    return (
        <>
            <Header />
            <Container as='section' size='lg' className={twMerge('grid grid-cols-12 gap-4', 'items-stretch')} >
                <div className={twMerge('flex flex-col gap-12 py-40', 'col-start-1 col-span-10')}>
                    <div className='grid grid-cols-12 gap-4'>
                        <Display size='xl' weight='bold' className={twMerge('col-start-2 col-span-11')}  >
                            {t('contact.title')}
                        </Display>
                    </div>
                    <div className={twMerge('flex flex-col', 'grid grid-cols-12 gap-8')}>
                        <div className={twMerge('col-start-1 col-span-1')}>
                            <Text p weight='medium' size='sm' degree='2' className='text-start capitalize' >
                                {t('contact.subtitle')}
                            </Text>
                        </div>
                        <div className={twMerge('col-start-2 col-span-11')}>
                            <FormContact />
                        </div>
                    </div>
                </div>
                <div className={twMerge('flex flex-col gap-1 justify-end items-start', 'h-[90vh]', 'col-start-11 col-span-2')} >
                    <Text size='sm' degree='2' p weight='medium' >
                        {t('contact.localTime')} {timer?.formattedTime}
                    </Text>
                    <Text size='sm' degree='2' p weight='medium' >
                        {t('contact.gmtTime')}({timer?.gmtOffset})
                    </Text>
                </div>
            </Container>
            <Container as='section' size='lg' className='py-0' >
                <Footer />
            </Container>
        </>
    )
}

export default ContactPage;