import { useTranslations } from "next-intl";

import { text, title } from "@/components/ui/typography";
import { getProjectsByCategory } from "@/conf/projects";
import Work from "./Work";
import ArrowFocus from "@/components/ui/ArrowFocus";
import TimeZone from "@/components/ui/TimeZone";
function Works() {
    const t = useTranslations("works");
    return (
        <div className="container flex flex-col gap-xl">
            <div className="flex flex-col lg:flex-row items-start lg:items-end justify-start gap-lg">
                <div className="w-full md:w-4/12">
                    <h1 className={title({
                        size: "h4",
                        weight: "semibold",
                        degree: "2"
                    }, "text-black-100 max-w-96")}>{t("title")}</h1>
                </div>
                <div className="flex flex-col xs:flex-row justify-between py-2 w-full gap-6 lg:w-8/12">
                    <p className={text({
                        size: "md",
                        weight: "semibold",
                        degree: "3"
                    }, "text-black-100 max-w-full xs:max-w-72")}>{t("description")}</p>
                    <TimeZone className="w-fit" />
                </div>
            </div>
            <div className="flex flex-row items-end justify-end gap-lg">
                <div className="hidden lg:flex w-2/12 lg:w-4/12 flex-col h-full items-start justify-end">
                    <ArrowFocus direction="UpRight" />
                </div>
                <div className="w-full sm:w-11/12 md:w-10/12 lg:w-8/12 pl-0 flex flex-col h-full justify-between">
                    {getProjectsByCategory("inMyWorksPipeline").map((project, index) => {
                        let time = "";
                        if (project?.date?.start && project?.date?.end) {
                            time = `${project?.date?.start} - ${project?.date?.end}`;
                        } else if (project?.date?.start) {
                            time = `${project?.date?.start} - ${t("time.present")}`;
                        }
                        if (project.date?.duration) {
                            time = `${time} (${project.date.duration})`;
                        }
                        const title = project.title;
                        return <Work index={index} key={project.id} time={time} title={title} />
                    })}
                </div>
            </div>
        </div>
    )
}

export default Works;