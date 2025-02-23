import { useTranslations } from "next-intl";

import ArrowFocus from "@/components/ui/ArrowFocus";
import Image from "@/components/ui/image";
import { text, title, Link } from "@/components/ui/typography";
import TimeZone from "@/components/ui/TimeZone";
import { getMenuItems } from "@/i18n/routing";
import { HoveredScrollUpInternal } from "@/components/ui/HoveredScrollUp";
import { SocialNetworkKeys } from "@/i18n/routing";
const socialNetworkItems = getMenuItems("socialNetwork");

function ContactInfo({
    header,
    email,
    phone,
    address
}: {
    header: string;
    email: string;
    phone: string;
    address: string;
}) {
    return (
        <div className="flex flex-col gap-4 flex-1">
            <p className={text({
                size: "sm",
                weight: "medium",
                degree: "4"
            })}>
                {header}
            </p>
            <p className={text({
                size: "sm",
                weight: "medium",
                degree: "2"
            })}>
                {email}
            </p>
            <p className={text({
                size: "sm",
                weight: "medium",
                degree: "2"
            })}>
                {phone}
            </p>
            <p className={text({
                size: "sm",
                weight: "medium",
                degree: "2"
            })}>
                {address}
            </p>
        </div>
    );
}

function ContactSocialNetwork({ header }: { header: string }) {
    const t = useTranslations();
    return (
        <div className="flex flex-col gap-4">
            <p className={text({
                size: "sm",
                weight: "medium",
                degree: "4"
            })}>
                {header}
            </p>
            {socialNetworkItems.map((item, index) => (
                <Link
                  key={item.path + "_" + index}
                  weight="medium"
                  href={item.path}
                  size="sm"
                  degree="2"
                  className="flex overflow-hidden"
                >
                  <HoveredScrollUpInternal secondaryClassName="text-primary-200">
                    {t(`socialNetwork.${item.id as SocialNetworkKeys}.name`)}
                  </HoveredScrollUpInternal>
                </Link>
              ))}
        </div>
    );
}

function Contact() {
    const t = useTranslations("contactCall");
    return (
        <div className="flex flex-col gap-xl">
            <div className="flex flex-row items-end justify-between container">
                {/* title */}
                <div className="flex flex-col gap-2">
                    <div className="flex flex-row items-center justify-center gap-6">
                        <div className="w-24 h-20">
                            <Image src="/mohamed_amine_sayagh.webp" className="rounded-xl object-cover aspect-square size-full" alt="Mohamed Amine SAYAGH" width={40} height={40} />
                        </div>
                        <div>
                            <h1 className={title({
                                size: "h1",
                                weight: "bold",
                                degree: "2"
                            }, "")}>{t("title")}</h1>
                        </div>
                    </div>
                    <h1 className={title({
                        size: "h1",
                        weight: "bold",
                        degree: "2"
                    }, "")}>{t("subtitle")}</h1>
                </div>
                {/* Arrow icon */}
                <div className="">
                    <ArrowFocus direction="DownLeft" />
                </div>
            </div>
            {/* <div className="w-full h-px bg-white-600/50"></div> */}
            <div className="container flex flex-row gap-lg">
                <div className="flex flex-col gap-2 flex-1">
                    <ContactInfo header={t("info.header")} email={t("info.email")} phone={t("info.phone")} address={t("info.address")} />
                </div>
                <div className="flex flex-col gap-2 flex-1">
                    <ContactSocialNetwork header={t("socialNetwork.header")} />
                </div>
                <div className="flex-1">
                    <div className="rounded-full flex items-center justify-center bg-primary-500 size-44">
                        <p className={text({
                            size: "sm",
                            weight: "semibold",
                            degree: "2"
                        }, "uppercase")}>
                            {t("action")}
                        </p>
                    </div>
                </div>
                <div className="flex flex-col gap-2 w-fit">
                    <TimeZone />
                </div>
            </div>
        </div>
    )
}

export default Contact;