import React from "react";
import "@/utils/gsap";

import Layer from "@/components/common/Layer";
import Lenis from "@/components/Lenis";
import LandingPage from "@/components/pages/home";
import Noise from "@/components/ui/noise";

export function generateMetadata() {
  return {
    title: "Mohamed Amine Sayagh - Software Developer - Portfolio",
    description: "Software developer with a proven record of delivered over 15 paid international projects, Recognized for aligning solutions with genuine client needs, and actively contributing to open source initiatives, now preparing to apply these experiences within a corporate environment.",
    openGraph: {
      title: "Mohamed Amine Sayagh - Software Developer - Portfolio",
      description: "Software developer with a proven record of delivered over 15 paid international projects, Recognized for aligning solutions with genuine client needs, and actively contributing to open source initiatives, now preparing to apply these experiences within a corporate environment.",
      images: [
        {
          url: "/mohamed_amine_sayagh.webp",
          width: 1200,
          height: 630,
          alt: "Mohamed Amine Sayagh - Software Developer - Portfolio"
        }
      ]
    },
    twitter: {
      card: "summary_large_image",
      title: "Mohamed Amine Sayagh - Software Developer - Portfolio",
      description: "Software developer with a proven record of delivered over 15 paid international projects, Recognized for aligning solutions with genuine client needs, and actively contributing to open source initiatives, now preparing to apply these experiences within a corporate environment.",
      images: [
        "/mohamed_amine_sayagh.webp"
      ]
    },
    icons: {
      icon: "/favicon.svg"
    },
    other: {
      "google-site-verification": "google-site-verification=1234567890"
    },
    robots: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-video-preview": 1000
    },
    keywords: [
      "Mohamed Amine Sayagh",
      "Software Developer",
      "Full Stack Developer",
      "Frontend Developer",
      "Backend Developer",
      "Portfolio",
      "Software Developer Portfolio",
      "Software Engineer",
      "Amine", 
      "Amine Sayagh",
      "Sayagh",
      "Portfolio Awards",
      "Portfolio Projects"
    ],
    authors: [
      {
        name: "Mohamed Amine Sayagh",
        url: "https://masayagh.com"
      }
    ],
    category: "Portfolio",
  }
}

function Page() {
  return (
    <Lenis>
      <Layer>
        <LandingPage />
        <Noise />
      </Layer>
    </Lenis>
  );
}

export default Page;
