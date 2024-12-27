import {Metadata} from "next";
import MapApp from "@/app/glinniki1846/MapApp";

export const metadata: Metadata = {
    title: "1846 год, им. Глинник. Масштаб 1/8400.",
    description: "Лесохозяйственный план государственного имения Глинник. Масштаб 1/8400. Могилевский уезд, Могилевская губерния",
};

export default function Glinniki1846() {
  return <MapApp />;
}
