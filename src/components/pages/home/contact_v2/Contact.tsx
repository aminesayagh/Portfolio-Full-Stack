import { useTranslations } from "next-intl";
import  { title  } from "@/components/ui/typography";

function SloganMessage() {
    
    return (
        <div className="flex flex-col gap-1">

        </div>
    );
}

function ContactFollow() {
    const t = useTranslations("contactCall");
    return (
        <div className="flex flex-row w-4/12">
            <h5 className={title({
                size: "h5",
                weight: "bold",
                degree: "2"
            }, "w-1/2")}>{t("socialNetwork.header")}</h5>
            <h5 className={title({
                size: "h5",
                weight: "bold",
                degree: "2"
            }, "w-1/2")}>
                
            </h5>
        </div>
    )
}


export default function Contact() {
    return (<div className="container flex flex-col gap-12">
        <div className="flex flex-row items-center justify-end">
            <ContactFollow />
        </div>
        <div className="">
            <SloganMessage />
        </div>
    </div>);
}