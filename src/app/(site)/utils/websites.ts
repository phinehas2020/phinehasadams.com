import type { SanityWebsite } from "@/sanity/lib/queries";
import { urlFor } from "@/sanity/lib/image";

export function normalizeWebsiteUrl(url: string) {
  if (/^https?:\/\//i.test(url)) {
    return url;
  }

  return `https://${url}`;
}

export function getWebsiteDomain(url: string) {
  try {
    return new URL(url).hostname.replace(/^www\./, "");
  } catch {
    return url.replace(/^https?:\/\//, "").split("/")[0] || "website";
  }
}

export function getWebsitePreview(site: SanityWebsite, width = 1600, height = 1080) {
  if (site.previewImage) {
    return urlFor(site.previewImage).width(width).height(height).fit("crop").auto("format").url();
  }

  return `https://image.thum.io/get/width/${width}/noanimate/${normalizeWebsiteUrl(site.url)}`;
}
