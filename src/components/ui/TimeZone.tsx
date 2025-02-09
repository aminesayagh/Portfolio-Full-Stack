"use client";
import { useTranslations } from "next-intl";
import { useTime } from "@/hook";
import { cn } from "@/lib/utils";
import { text } from "@/components/ui/typography";

const TimeZone = ({ className }: { className?: string }) => {
    const t = useTranslations();
    const timer = useTime({
        city: "Casablanca",
        country: "Africa",
        format: "HH:mm"
    });
    return (
        <div className={cn(className, "flex flex-col gap-1")}>
            <p
                className={text({
                    size: "sm",
                    degree: "2",
                    weight: "medium"
                })}
                suppressHydrationWarning
            >
                {t("contact.localTime")} {timer?.formattedTime}
            </p>
            <p
                className={text({
                    size: "sm",
                    degree: "2",
                    weight: "medium"
                })}
                suppressHydrationWarning
            >
                {t("contact.gmtTime")}({timer?.gmtOffset})
            </p>
        </div>
    )
}

export default TimeZone;