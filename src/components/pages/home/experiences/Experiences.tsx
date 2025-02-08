
import { useMemo } from "react";
import { useTranslations } from "next-intl";

import { cn } from "@/lib/utils";
import { text, title } from "@/components/ui/typography";
import ExperienceCard from "./Experience";
import { HoveredScrollUpInternal } from "@/components/ui/HoveredScrollUp";

const CLASSNAME_GAP = "gap-6 sm:gap-14 xl:gap-20 2xl:gap-24";

function Experiences() {
    const t = useTranslations("experiences");
    const archive = useMemo(() => t.raw("archive.list") as { id: string, title: string }[], [t]);
    return (
        <div className={cn("container w-full h-full flex flex-col justify-between items-center", CLASSNAME_GAP)}>
            <div className={cn("w-full flex flex-col-reverse mdl:flex-row justify-between items-start mdl:items-end", CLASSNAME_GAP)}>
                <ExperienceCard name={t("list.french_dandy.title")} image="/images/experiences/experience-1.jpg" className="top-0 mdl:-top-14 xl:top-0 w-full mdl:w-7/12 xl:w-8/12" />
                <div className={cn("w-10/12 mdl:w-5/12 xl:w-4/12 flex flex-col", CLASSNAME_GAP)}>
                    <div className="pl-0 mdl:pl-8 pr-0 xl:px-12">
                        <h1 className={title({
                            size: "h4",
                            weight: "semibold",
                            degree: "2"
                        }, "max-w-96")}>{t("title")}</h1>
                    </div>
                    <ExperienceCard name={t("list.cyber_cohesion.title")} image="/images/experiences/experience-2.jpg" />
                </div>
            </div>
            <div className="w-full sm:w-9/12">
                <ExperienceCard name={t("list.happy_water.title")} image="/images/experiences/experience-3.jpg" />
            </div>
            <div className={cn("w-full flex flex-col mdl:flex-row justify-between items-end", CLASSNAME_GAP)}>
                <ExperienceCard name={t("list.code_wrangler.title")} image="/images/experiences/experience-4.jpg" className="w-full sm:w-8/12 bottom-0 mdl:-bottom-40" />
                <ExperienceCard name={t("list.lavish_trading.title")} image="/images/experiences/experience-5.jpg" />
            </div>
            <div className="w-full flex items-end justify-end">
                <div className="w-5/12 sm:w-3/12 mdl:w-2/12 relative right-[10%] flex flex-col gap-6 py-12 sm:py-24">
                    <h5 className={text({
                        size: "sm",
                        weight: "semibold",
                        degree: "3"
                    }, "uppercase")}>
                        {t("archive.title")}
                    </h5>
                    <div className="flex flex-col gap-4">
                        {archive.map((item) => (
                            <div key={item.id} className="overflow-hidden w-fit border-b border-white/60">
                                <HoveredScrollUpInternal>
                                    <h6 className={text({
                                        size: "sm",
                                        weight: "semibold",
                                        degree: "1"
                                    }, "uppercase pr-2 pb-1")}>
                                        {item.title}
                                    </h6>
                                </HoveredScrollUpInternal>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Experiences;