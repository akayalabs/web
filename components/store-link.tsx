import { storeLink, type Product } from "@/lib/products";

// Ürünün App Store / Mac App Store sayfası; mağaza bağlantısı yoksa ya da müşteri işiyse hiçbir şey çizmez.
export function StoreLink({ product, className }: { product: Product; className: string }) {
  const store = product.status === "client" ? null : storeLink(product);
  if (!store) return null;
  return (
    <a href={store.href} target="_blank" rel="noreferrer" className={className}>
      {store.label} ↗
    </a>
  );
}
