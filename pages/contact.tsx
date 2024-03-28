import React from "react";

import { useTranslation } from "next-i18next";
import dynamic from "next/dynamic.js";

import nextI18NextConfig from "../next-i18next.config.js";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";

import Head from "@/components/common/head";
import Noise from "components/ui/noise";
import Layer from "@/components/common/layer";
import Lenis from "@/components/Lenis";

import "@/utils/gsap";
const ContactPageDynamic = dynamic(
  () => import("@/components/pages/ContactPage"),
  {}
);
import { ToastRegion } from "@/components/common/toast";

const Contact = () => {
  const { t } = useTranslation("common");

  return (
    <>
      <Head
        title={t("head.contact.title")}
        description={t("head.contact.description")}
        keywords={t("head.contact.keywords")}
        author={t("head.contact.author")}
        logo="/favicon.svg"
      />
      <Lenis>
        <Layer>
          <ContactPageDynamic />
          <Noise />
          <ToastRegion />
        </Layer>
      </Lenis>
    </>
  );
};

export async function getStaticProps({ locale }: any) {
  return {
    props: {
      ...(await serverSideTranslations(locale, ["common"], nextI18NextConfig)),
    },
  };
}

export default Contact;
