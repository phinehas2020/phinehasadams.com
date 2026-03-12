import { HomePage } from "./components/home/HomePage";
import { sanityFetch } from "@/sanity/lib/live";
import { WEBSITES_QUERY, type SanityWebsite } from "@/sanity/lib/queries";

export default async function Home() {
  const { data: websites } = await sanityFetch<SanityWebsite[]>({
    query: WEBSITES_QUERY,
  });

  return (
    <HomePage websites={websites ?? []} />
  );
}
