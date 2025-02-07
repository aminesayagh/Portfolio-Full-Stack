import { useTranslations } from "next-intl";

import { cn } from "@/lib/utils";
import Image from "@/components/ui/image";
import { text } from "@/components/ui/typography";

function ExperienceCard({ className, name, image }: { className?: string, name: string, image: string }) {
    return (
        <div className={cn("object-cover rounded-2xl overflow-hidden relative w-full h-full bg-primary-500", className)}>
            <div className="absolute bottom-0 left-0 flex flex-row gap-4 w-full p-6">
                <h4 className={text({
                    size: "md",
                    weight: "semibold",
                    degree: "2"
                }, "py-5 bg-white rounded-full !text-black-100 px-8")}>{name}</h4>
                <div className="aspect-square rounded-full overflow-hidden bg-white">
                    
                </div>
            </div>
            <Image src={image} alt={name} width={1000} height={1000} />
        </div>
    )
}

function Experiences() {
    const t = useTranslations("experiences");
    return (
        <div className="container w-full h-full flex flex-col justify-between items-center gap-24">
            <div className="w-full flex flex-row gap-24 justify-between items-end">
                <ExperienceCard name={t("list.french_dandy.title")} image="/images/experiences/experience-1.jpg" className="w-8/12" />
                <div className="w-4/12 flex flex-col gap-4">
                    <div>
                        <h1>{t("title")}</h1>
                    </div>
                    <ExperienceCard name={t("list.cyber_cohesion.title")} image="/images/experiences/experience-2.jpg" />
                </div>
            </div>
            <div className="w-9/12">
                <ExperienceCard name={t("list.happy_water.title")} image="/images/experiences/experience-3.jpg" />
            </div>
            <div className="w-full flex flex-row gap-24 justify-between items-end">
                <ExperienceCard name={t("list.code_wrangler.title")} image="/images/experiences/experience-4.jpg" className="w-8/12 -bottom-40" />
                <ExperienceCard name={t("list.lavish_trading.title")} image="/images/experiences/experience-5.jpg" />
            </div>
        </div>
    )
}

export default Experiences;