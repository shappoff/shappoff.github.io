import './frame.css';
import {Metadata} from "next";

export const metadata: Metadata = {
    title: "Документы для просмотра.",
    description: "Документы для просмотра.",
};


export default function Home() {
  return (
      <iframe id="iframe" src="https://docs.google.com/spreadsheets/d/1uObZW3PrD67kaJi1NhOSV6v8PTQgOCu3Xt4iv6ixhtg"></iframe>
  );
}
