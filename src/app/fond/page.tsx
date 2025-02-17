import './frame.css';
import {Metadata} from "next";

export const metadata: Metadata = {
    title: "Документы для просмотра в архивах.",
    description: "Документы для просмотра в архивах.",
};


export default function Home() {
  return (
      <iframe id="iframe" src="https://docs.google.com/spreadsheets/d/1uObZW3PrD67kaJi1NhOSV6v8PTQgOCu3Xt4iv6ixhtg"></iframe>
  );
}
