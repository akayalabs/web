import { products, PLATFORM_LABEL } from "@/lib/products";
import en from "@/messages/en.json";

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL ?? "https://akayalabs.com";

// Ürün listesi lib/products.ts'ten üretilir; liste değişince dosya da değişir.
export const dynamic = "force-static";

function productLine(slug: (typeof products)[number]["slug"], url: string, platforms: string) {
  const copy = en.products[slug];
  return `- [${copy.name}](${url}) (${platforms}): ${copy.blurb}`;
}

export function GET() {
  const listed = products.filter((p) => p.url && p.status !== "client");
  const lines = listed.map((p) =>
    productLine(p.slug, p.url as string, p.platforms.map((pl) => PLATFORM_LABEL[pl]).join(", ")),
  );
  const body = [
    "# Akaya Labs",
    "",
    `> ${en.about.intro}`,
    "",
    "## Products",
    "",
    ...lines,
    "",
    "## Pages",
    "",
    `- [Products](${SITE_URL}/en/products)`,
    `- [About](${SITE_URL}/en/about)`,
    `- [Contact](${SITE_URL}/en/contact)`,
    "",
  ].join("\n");
  return new Response(body, { headers: { "Content-Type": "text/plain; charset=utf-8" } });
}
