import './frame.css';
import {Metadata} from "next";

export const metadata: Metadata = {
    title: "Копии документов",
    description: "Копии документов, что есть у меня на руках из НИАБ",
};


export default function Home() {
  return (
      <iframe id="iframe" src="https://docs.google.com/spreadsheets/d/1kME-rXLIM9DmOb_e0Z5wJiPKAH5u-5FIfKfgxTYzfjU"></iframe>
  );
}
