import { zodResolver } from "@hookform/resolvers/zod";
import { useTranslation } from "next-i18next";
import { useCallback, useMemo } from "react";
import { Input, Button } from "react-aria-components";
import { SubmitHandler, useForm } from "react-hook-form";
import { twMerge } from "tailwind-merge";
import { z } from "zod";

import { addToast } from "@/components/common/toast";
import { Form, Field, Item, Select } from "@/components/ui/form";

const CONTACT_SUBJECTS = {
  "1": "Project Inquiry",
  "2": "Job Opportunity",
  "3": "Portfolio Feedback",
  "4": "Getting to know Each Other",
  "5": "Say Hello",
  "6": "Other"
} as const;

const ERROR_TRANSLATION_PATH = "form.error";

type ContactSubject = (typeof CONTACT_SUBJECTS)[keyof typeof CONTACT_SUBJECTS];
const contactSubjectValues = Object.values(CONTACT_SUBJECTS);

const contactSubjectItems: {
  key: string;
  text: ContactSubject;
}[] = [
  {
    key: "1",
    text: contactSubjectValues[0] as ContactSubject
  },
  {
    key: "2",
    text: contactSubjectValues[1] as ContactSubject
  },
  {
    key: "3",
    text: contactSubjectValues[2] as ContactSubject
  },
  {
    key: "4",
    text: contactSubjectValues[3] as ContactSubject
  },
  {
    key: "5",
    text: contactSubjectValues[4] as ContactSubject
  },
  {
    key: "6",
    text: contactSubjectValues[5] as ContactSubject
  }
];

const ContactForm = () => {
  const { t, i18n } = useTranslation();

  const required = useCallback(
    () =>
      z
        .string({ required_error: t(`${ERROR_TRANSLATION_PATH}.required`) })
        .nonempty(t(`${ERROR_TRANSLATION_PATH}.required`)),
    [t]
  );

  const createZodString = useCallback(
    (min: number, max: number) =>
      z
        .string({ required_error: t(`${ERROR_TRANSLATION_PATH}.required`) })
        .nonempty(t(`${ERROR_TRANSLATION_PATH}.required`))
        .min(min, t(`${ERROR_TRANSLATION_PATH}.minLength`, { min }))
        .max(max, t(`${ERROR_TRANSLATION_PATH}.maxLength`, { max }))
        .regex(/^[a-zA-Z\s]+$/, t(`${ERROR_TRANSLATION_PATH}.pattern`)),
    [t]
  );

  const contactFormDataSchema = useMemo(
    () =>
      z.object({
        firstName: createZodString(2, 50),
        lastName: createZodString(2, 50),
        email: required().email(t(`${ERROR_TRANSLATION_PATH}.email`)),
        objective: z.string().nonempty(t(`${ERROR_TRANSLATION_PATH}.required`)),
        message: required()
          .min(10, {
            message: t(`${ERROR_TRANSLATION_PATH}.minLength`, { min: 10 })
          })
          .max(500, {
            message: t(`${ERROR_TRANSLATION_PATH}.maxLength`, { max: 500 })
          })
          .nonempty()
      }),
    [required, t, createZodString]
  );
  type FormContact = z.infer<typeof contactFormDataSchema>;
  const successMessage = useMemo(() => t("form.notification.success"), [t]);
  const errorMessage = useMemo(() => t("form.notification.error"), [t]);
  const methods = useForm<FormContact>({
    resolver: zodResolver(contactFormDataSchema)
  });

  const onSubmitForm: SubmitHandler<FormContact> = async data => {
    try {
      await fetch("/api/contact", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({ ...data, locale: i18n.language })
      });
      addToast(
        {
          variant: "positive",
          description: successMessage
        },
        {
          timeout: 10000
        }
      );
    } catch (err) {
      addToast(
        {
          variant: "negative",
          description: errorMessage
        },
        {
          timeout: 10000
        }
      );
    }
  };
  return (
    <Form<FormContact>
      className="grid grid-cols-12 gap-4"
      methods={methods}
      onSubmit={methods.handleSubmit(onSubmitForm)}
    >
      <Field
        width="col-span-12 mdl:col-span-6"
        name="firstName"
        label={t("form.field.firstName.label")}
      >
        <Input placeholder={t("form.field.firstName.placeholder")} />
      </Field>
      <Field
        width="col-span-12 mdl:col-span-6"
        name="lastName"
        label={t("form.field.lastName.label")}
      >
        <Input placeholder={t("form.field.lastName.placeholder")} />
      </Field>
      <Field name="email" inputMode="email" label={t("form.field.email.label")}>
        <Input placeholder={t("form.field.email.placeholder")} />
      </Field>
      <Select
        name="objective"
        label={t("form.field.objective.label")}
        placeholder={t("form.field.objective.placeholder")}
        items={contactSubjectItems}
        defaultSelectedKey={"1"}
      >
        {(item: { key: string; text: string }) => {
          return (
            <Item key={item.key} id={item.text}>
              {t(`form.field.objective.options.${item.key}`)}
            </Item>
          );
        }}
      </Select>
      <Field name="message" label={t("form.field.message.label")}>
        <textarea placeholder={t("form.field.message.placeholder")} />
      </Field>
      <Button
        className={twMerge(
          "text-xs md:text-sm",
          "px-10 py-4 w=full bg-white-100 font-semibold",
          "rounded-sm",
          "col-span-12 w-1/2 xxs:w-5/12 sm:w-4/12 md:w-3/12 place-self-end"
        )}
        isDisabled={methods.formState.isSubmitting ? true : false}
        type="submit"
      >
        {t("form.field.submit.label")}
      </Button>
    </Form>
  );
};

export default ContactForm;
