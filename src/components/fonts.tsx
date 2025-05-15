import localFont from "next/font/local"
import MonomakhUnicode from "../../public/MonomakhUnicode.otf";

export const monomakhUnicode = localFont({
  src: [
    {
      path: "../../public/MonomakhUnicode.otf",
      weight: "400",
      style: "normal",
    },
  ],
  variable: "--font-monomakh",
  display: "swap",
})
