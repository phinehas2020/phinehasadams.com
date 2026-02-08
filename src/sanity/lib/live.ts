import { type QueryParams } from 'next-sanity';
import { client } from './client';

export async function sanityFetch<T>({
  query,
  params = {},
  tags = [],
}: {
  query: string;
  params?: QueryParams;
  tags?: string[];
}): Promise<{ data: T }> {
  try {
    const data = await client.fetch<T>(query, params, {
      next: {
        revalidate: process.env.NODE_ENV === 'development' ? 30 : 3600,
        tags,
      },
    });
    return { data };
  } catch (err) {
    console.error('Sanity fetch error:', err);
    return { data: [] as unknown as T };
  }
}
