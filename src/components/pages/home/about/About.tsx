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
    <div className="flex flex-row gap-0 container items-start justify-end py-24 h-[200vh]">
      {/* head */}
      <div className="w-10/12 flex flex-col items-start justify-start gap-12">
        {/* <div className="flex flex-row items-center justify-start gap-6">
          <h2
            className={text({
              degree: "3",
              weight: "medium",
              size: "md"
            })}
          >
            {t("subtitle_1")}
          </h2>
          <div className="size-[0.4rem] rounded-full bg-gray-500 items-center justify-start" />
          <h3
            className={text({
              degree: "3",
              weight: "medium",
              size: "md"
            })}
          >
            {t("subtitle_2")}
          </h3>
        </div> */}
        {/* body */}
        <div className="w-full -ml-0 relative">
          <TextReveal text={t("content")} />
        </div>
        {/* call to action */}
        <ButtonCallToActionScroll>
          {t("action")}
        </ButtonCallToActionScroll>
        <span className="h-24"></span>
        <div className="w-full grid grid-cols-3 gap-8">
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
 