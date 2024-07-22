import React, { memo, useMemo } from "react";
import { useTranslation } from "react-i18next";
import { twMerge } from "tailwind-merge";

import { text, title } from "@/components/ui/typography";
import { getProjectsByCategory } from "@/conf/projects";

const AgencyList = () => {
  const { t } = useTranslation();

  const projects = useMemo(() => getProjectsByCategory("ongoing"), []);

  return (
    <ul
      className={twMerge("flex flex-col gap-0", "border-b border-gray-800/60")}
    >
      {projects.map((project, index) => (
        <li
          key={index}
          className={twMerge(
            "flex flex-col md:flex-row gap-8 md:gap-4 py-10",
            "items-start",
            "border-t border-gray-800/60"
          )}
        >
          <div
            className={twMerge(
              "flex flex-row gap-12 items-start justify-between w-full md:w-5/12 2xl:w-1/2"
            )}
          >
            <h6
              className={title(
                {
                  weight: "semibold",
                  degree: "1"
                },
                "tracking-wider uppercase opacity-80"
              )}
            >
              {t(`projects.${project.id}.title`)}
            </h6>
          </div>
          <div
            className={twMerge(
              "w-full xxs:w-10/12 md:w-7/12 2xl:w-1/2",
              "flex flex-col gap-5"
            )}
          >
            <p
              className={text(
                {
                  size: "sm",
                  weight: "bold",
                  degree: "1"
                },
                "hidden tracking-wider md:block opacity-80"
              )}
            >
              {t(`country.${project.country}`)}
            </p>
            <p
              className={text({
                size: "sm",
                weight: "medium",
                degree: "2"
              })}
            >
              {t(`projects.${project.id}.description`)}
            </p>
            <div
              className="inline"
              style={{
                display: "-webkit-box"
              }}
            >
              {project.jobTitle.map((jobTitle, index) => {
                return (
                  <p
                    key={index}
                    className={text(
                      {
                        size: "sm",
                        weight: "medium",
                        degree: "2"
                      },
                      "pr-2"
                    )}
                  >
                    {t(`jobTItle.${jobTitle}`)}
                    {index < project.jobTitle.length - 1 ? "," : ""}
                  </p>
                );
              })}
            </div>
          </div>
        </li>
      ))}
    </ul>
  );
};

const AgencyListMemo = memo(AgencyList);

export default AgencyListMemo;
