import { notFound } from "next/navigation";

// Dil önekli ama tanımsız her adres, menü ve altbilgiyle birlikte dile göre 404 sayfasına düşer.
export default function CatchAll() {
  notFound();
}
