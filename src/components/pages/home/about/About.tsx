import { useTranslations } from "next-intl";

import { title} from "@/components/ui/typography";
import { TextReveal } from "@/components/ui/TextReveal";
export default function About() {
  const t = useTranslations("about");
  return <div className="flex flex-col gap-4">
    {/* head */}
    <div className="flex flex-row items-start justify-center gap-2">
        <h2 className={title({
            degree: "4",
            weight: "medium",
            size: "h6"
        })}>
            {t("subtitle_1")}
        </h2>
        <div className="size-[0.3rem] rounded-full bg-gray-500 items-center justify-start" />
        <h3 className={title({
            degree: "4",
            weight: "medium",
            size: "h6"
        })}>
            {t("subtitle_2")}
        </h3>
    </div>
    {/* body */}
    <div>
        <TextReveal text={t("content")} />
    </div>
    {/* call to action */}
  </div>;
}

