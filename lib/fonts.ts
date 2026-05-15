import localFont from "next/font/local";

export const inter = localFont({
  src: "../public/fonts/Inter-Variable.ttf",
  variable: "--font-body-loaded",
  display: "swap",
  weight: "100 900",
});

export const playfair = localFont({
  src: "../public/fonts/PlayfairDisplay-Variable.ttf",
  variable: "--font-display-loaded",
  display: "swap",
  weight: "400 900",
});

export const mincho = localFont({
  src: "../public/fonts/ShipporiMincho-Regular.ttf",
  variable: "--font-mincho-loaded",
  display: "swap",
  weight: "400",
});
