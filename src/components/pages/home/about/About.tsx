
import { useTranslations } from "next-intl"

import { text } from "@/components/ui/typography";
import { TextReveal } from "@/components/ui/TextReveal";
import Button from "@/components/ui/button";


export default function About() {
  const t = useTranslations("about");

  return <div className="flex flex-row gap-0 container items-start justify-end py-24 h-[200vh]">
    {/* head */}
    <div className="w-9/12 flex flex-col items-start justify-start gap-12">
        <div className="flex flex-row items-center justify-start gap-6">
            <h2 className={text({
                degree: "3",
                weight: "medium",
                size: "md"
            })}>
                {t("subtitle_1")}
            </h2>
            <div className="size-[0.4rem] rounded-full bg-gray-500 items-center justify-start" />
            <h3 className={text({
                degree: "3",
                weight: "medium",
                size: "md"
            })}>
                {t("subtitle_2")}
            </h3>
        </div>
        {/* body */}
        <div className="w-full -ml-3 relative">
            <TextReveal text={t("content")} />
        </div>
    {/* call to action */}
        <div>
            <Button className={text({
                weight: "medium",
                size: "md"
            }, "w-fit")}>
                {t("action")}
            </Button>
        </div>
        
    </div>
  </div>;
}

