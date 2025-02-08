import { useTranslations } from "next-intl";
import { text, title } from "@/components/ui/typography";

function Works() {
    const t = useTranslations("works");
    return (
        <div className="container flex flex-col gap-12">
            <div className="flex flex-row items-end justify-start gap-12">
                <div className="w-4/12">
                    <h1 className={title({
                        size: "h3",
                        weight: "semibold",
                        degree: "2"
                    }, "text-black-100")}>{t("title")}</h1>
                </div>
                <div className="w-4/12 py-2">
                    <p className={text({
                        size: "md",
                        weight: "semibold",
                        degree: "2"
                    }, "text-black-100")}>{t("description")}</p>
                </div>
            </div>
            <div className="flex flex-row items-stretch justify-end gap-12">
                <div className="w-4/12 flex flex-col h-full justify-between">
                </div>
                <div className="w-8/12 flex flex-col h-full justify-between">

                </div>
            </div>
        </div>
    )
}

export default Works;