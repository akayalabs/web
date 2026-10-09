import localFont from "next/font/local";

export const inter = localFont({
  src: "../app/fonts/Inter-Variable.woff2",
  variable: "--font-body-loaded",
  display: "swap",
  weight: "100 900",
});

export const playfair = localFont({
  src: "../app/fonts/PlayfairDisplay-Variable.woff2",
  variable: "--font-display-loaded",
  display: "swap",
  weight: "400 900",
});

export const mincho = localFont({
  src: "../app/fonts/ShipporiMincho-Regular.woff2",
  variable: "--font-mincho-loaded",
  display: "swap",
  weight: "400",
});
