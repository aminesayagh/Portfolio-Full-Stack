import { useTranslations } from "next-intl";
import { useMemo } from "react";
import { TextReveal } from "@/components/ui/TextReveal";
import { ButtonCallToActionScroll } from "@/components/ui/button";

import CardHovered from "@/components/ui/CardHovered";

export default function About() {
  const t = useTranslations("about");

  const sellingPoints = useMemo<{
    number: string;
    description: string;
    suffix?: string;
  }[]>(() => t.raw("selling_point"), [t]);

  return (
    <div id="manifesto" className="flex flex-row gap-0 container items-start justify-end py-24">
      {/* head */}
      <div className="w-full lg:w-10/12 flex flex-col items-start justify-start gap-14 sm:gap-xl">
        {/* body */}
        <div className="w-full -ml-0 relative">
          <TextReveal text={t("content")} />
        </div>
        {/* call to action */}
        <ButtonCallToActionScroll>
          {t("action")}
        </ButtonCallToActionScroll>
        <span className="h-12 xs:h-24"></span>
        <div id="selling_points" className="w-full grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-lg">
          {sellingPoints.map((point, index) => (
            <CardHovered
              key={`${index}-${point.number}`}
              description={point.description}
              number={point.number}
              suffix={point.suffix}
              style={{
                zIndex: 10 + index
              }}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
 