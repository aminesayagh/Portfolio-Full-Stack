import { Header, Footer } from '@/components/common';
import { Container } from '@/components/ui';
import { Form } from '@/components/ui';
import { twMerge } from 'tailwind-merge';
import { useTranslation } from 'next-i18next';
import { z } from 'zod';

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

type FormContact = {
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


    const onSubmitForm = (data: FormContact) => {

    }
    return (
        <Form<FormContact> onSubmit={onSubmitForm}>

        </Form>
    )
}
const ContactPage = () => {
    return (
        <>
            <Header />
            <Container as='section' size='lg' >
                <div className={twMerge('')}>
                    <FormContact />
                </div>
            </Container>
            <Footer />
        </>
    )
}

export default ContactPage;