
import Layer from "@/components/common/Layer";
import Lenis from "@/components/Lenis";
import Noise from "@/components/ui/noise";
import { ToastRegion } from "@/components/common/toast";
import ContactPage from "@/components/pages/Contact/Index";

async function Page() {
    return (
        <Lenis>
            <Layer>
                <ContactPage />
                <Noise />
                <ToastRegion />
            </Layer>
        </Lenis>
    )
}

export default Page;