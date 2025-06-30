import {Metadata} from "next";
import DynamicMapApp from "@/components/DynamicMapApp";
import MarkersList from "@/app/glinniki1846/MarkersList";

export const metadata: Metadata = {
    title: "1846 год, им. Глинник. Масштаб 1/8400.",
    description: "Лесохозяйственный план государственного имения Глинник. Масштаб 1/8400. Могилевский уезд, Могилевская губерния",
};

export default function Glinniki1846Page() {
    return <DynamicMapApp mapKey="glinniki1846">
        <MarkersList />
    </DynamicMapApp>;
}
