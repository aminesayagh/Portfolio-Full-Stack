import Head from "@/components/common/head";
import Noise from "@/components/ui/noise";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import "@/utils/gsap";
import Lenis from "@/components/Lenis";

import dynamic from "next/dynamic";

import nextI18NextConfig from "../next-i18next.config.js";
import { useTranslation } from "next-i18next";

const DynamicLandingPage = dynamic(
  () => import("@/components/pages/LandingPage"),
  {}
);
import Layer from "@/components/common/layer";

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
          <DynamicLandingPage />
          <Noise />
        </Layer>
      </Lenis>
    </>
  );
}

export async function getStaticProps({ locale }: any) {
  return {
    props: {
      ...(await serverSideTranslations(locale, ["common"], nextI18NextConfig)),
    },
  };
}
