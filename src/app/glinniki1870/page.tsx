import {Metadata} from "next";
import DynamicMapApp from "@/components/featured/DynamicMapApp";

export const metadata: Metadata = {
    title: "1870 г. Дер. Глинники. Генеральное межевание",
    description: "1870 г. Дер. Глинники. Генеральное межевание, Могилевский уезд, Могилевская губерния",
};

export default function Glinniki1870Page() {
  return <DynamicMapApp mapKey="glinniki1870" />;
}
