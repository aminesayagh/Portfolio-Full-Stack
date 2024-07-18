import { useTranslation } from "next-i18next";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import "@/utils/gsap";

import Head from "@/components/common/head";
import Layer from "@/components/common/layer";
import Lenis from "@/components/Lenis";
import LandingPage from "@/components/pages/LandingPage";
import Noise from "@/components/ui/noise";

import nextI18NextConfig from "../next-i18next.config.js";

export default function Home() {
  const { t } = useTranslation("common");

  return (
    <>
      <Head
        title={t("head.home.title")}
        description={t("head.home.description")}
        keywords={t("head.home.keywords")}
        author={t("head.home.author")}
        logo="/favicon.svg"
      />
      <Lenis>
        <Layer>
          <LandingPage />
          <Noise />
        </Layer>
      </Lenis>
    </>
  );
}

export async function getStaticProps({ locale }: {
  locale: string
}) {
  return {
    props: {
      ...(await serverSideTranslations(locale, ["common"], nextI18NextConfig)),
    },
  };
}
