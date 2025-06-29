import {Metadata} from "next";
import MapApp from "@/app/glinniki1870/MapApp";

export const metadata: Metadata = {
    title: "1870 г. Дер. Глинники. Генеральное межевание",
    description: "1870 г. Дер. Глинники. Генеральное межевание, Могилевский уезд, Могилевская губерния",
};

export default function Glinniki1846() {
  return <MapApp />;
}
