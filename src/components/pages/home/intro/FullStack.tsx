import { useTranslations } from "next-intl";

import { cn } from "@/lib/utils";

import useFitText from "@/hook/useFitText";
import { DISPLAY_2_CLASS_NAME } from "./style";
  

const FullStack = ({ className }: { className: string }) => {
    const t = useTranslations();
  
    const { fontSize: fontSize, ref } = useFitText({
      factor: 4.8
    });
    return (
      <div
        ref={ref}
        className={cn(
          className,
          "flex flex-col items-start xs:items-end justify-center font-extrabold",
          "space-y-0 xs:-space-y-1 md:space-y-0 mdl:-space-y-1 lg:-space-y-[3%] xl:-space-y-[3%] 2xl:-space-y-[4%] 3xl:-space-y-1 4xl:space-y-0"
        )}
      >
        <span className="overflow-y-animate">
          <h1
            className={cn(
              DISPLAY_2_CLASS_NAME
            )}
            style={{ fontSize: fontSize }}
          >
            {t("intro.title.2_1")}
          </h1>
        </span>
        <span className="overflow-y-animate">
          <h1
            className={cn(
              DISPLAY_2_CLASS_NAME
            )}
            style={{ fontSize: fontSize }}
          >
            {t("intro.title.2_2")}
          </h1>
        </span>
      </div>
    );
  };

export default FullStack;