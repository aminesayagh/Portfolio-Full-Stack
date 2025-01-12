import { useTranslations } from "next-intl";

import { twMerge } from "tailwind-merge";
import { display } from "@/components/ui/typography";

import { DISPLAY_2_CLASS_NAME } from "./style";
  

const FullStack = ({ className }: { className: string }) => {
    const t = useTranslations();
  
    return (
      <div
        className={twMerge(
          className,
          "flex flex-col items-start xs:items-end justify-center",
          "space-y-0 xs:-space-y-1 md:space-y-0 mdl:-space-y-1 lg:-space-y-[3%] xl:-space-y-[3%] 2xl:-space-y-[4%] 3xl:-space-y-1 4xl:space-y-0"
        )}
      >
        <span className="overflow-y-animate">
          <h1
            className={display(
              {
                size: "md",
                weight: "bold"
              },
              DISPLAY_2_CLASS_NAME
            )}
          >
            {t("intro.title.2_1")}
          </h1>
        </span>
        <span className="overflow-y-animate">
          <h1
            className={display(
              {
                size: "md",
                weight: "bold"
              },
              DISPLAY_2_CLASS_NAME
            )}
          >
            {t("intro.title.2_2")}
          </h1>
        </span>
      </div>
    );
  };

export default FullStack;