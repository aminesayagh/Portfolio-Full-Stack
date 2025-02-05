import dynamic from "next/dynamic.js";

import Layer from "@/components/common/Layer";
import Lenis from "@/components/Lenis";
import Noise from "@/components/ui/noise";
import { ToastRegion } from "@/components/common/toast";


const ContactPageDynamic = dynamic(
    () => import("@/components/pages/Contact/Index"),
    {}
  );

function Page() {
    return (
        <Lenis>
            <Layer>
                <ContactPageDynamic />
                <Noise />
                <ToastRegion />
            </Layer>
        </Lenis>
    )
}

export default Page;