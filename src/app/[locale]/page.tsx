import React from "react";
import "@/utils/gsap";

import Layer from "@/components/common/Layer";
import Lenis from "@/components/Lenis";
import LandingPage from "@/components/pages/home/Index";
import Noise from "@/components/ui/noise";

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
