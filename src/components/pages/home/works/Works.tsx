import { useTranslations } from "next-intl";

import { text, title } from "@/components/ui/typography";
import { getProjectsByCategory } from "@/conf/projects";
import Work from "./Work";

function Works() {
    const t = useTranslations("works");
    return (
        <div className="container flex flex-col gap-xl">
            <div className="flex flex-row items-end justify-start gap-lg">
                <div className="w-4/12">
                    <h1 className={title({
                        size: "h3",
                        weight: "semibold",
                        degree: "2"
                    }, "text-black-100")}>{t("title")}</h1>
                </div>
                <div className="max-w-80 py-2 ml-xl w-8/12">
                    <p className={text({
                        size: "md",
                        weight: "semibold",
                        degree: "3"
                    }, "text-black-100")}>{t("description")}</p>
                </div>
            </div>
            <div className="h-xl"></div>
            <div className="flex flex-row items-stretch justify-end gap-lg">
                <div className="w-4/12 flex flex-col h-full justify-between">
                </div>
                <div className="w-8/12 pl-3 flex flex-col h-full justify-between">
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
                        return (<>
                            {index == 0 && (
                                <div className="w-full h-px bg-white-600/70"></div>
                            )}
                            <Work key={project.id} time={time} title={title} />
                            <div className="w-full h-px bg-white-600/70"></div>
                        </>
                        )
                    })}
                </div>
            </div>
        </div>
    )
}

export default Works;