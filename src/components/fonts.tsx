import localFont from "next/font/local"

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
