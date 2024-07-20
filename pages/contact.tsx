import dynamic from "next/dynamic.js";
import { useTranslation } from "next-i18next";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";

import Head from "@/components/common/Head";
import Layer from "@/components/common/Layer";
import { ToastRegion } from "@/components/common/toast";
import Lenis from "@/components/Lenis";
import Noise from "components/ui/noise";

import nextI18NextConfig from "../next-i18next.config.js";

import "@/utils/gsap";
const ContactPageDynamic = dynamic(
  () => import("@/components/pages/ContactPage"),
  {}
);

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

// eslint-disable-next-line react-refresh/only-export-components
export async function getStaticProps({ locale }: { locale: string }) {
  return {
    props: {
      ...(await serverSideTranslations(locale, ["common"], nextI18NextConfig))
    }
  };
}

export default Contact;
