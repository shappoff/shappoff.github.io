import {Metadata} from "next";
import DynamicMapApp from "@/components/featured/DynamicMapApp";

export const metadata: Metadata = {
    title: "1640 г. им. Усаи.",
    description: "имение Усай 1640г. Витебская губерния, Лепельский уезд, Усайская волость",
};

export default function Usaya1640Page() {
  return <DynamicMapApp mapKey="Usaya1640" />;
}
