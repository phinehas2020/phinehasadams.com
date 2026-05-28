import { createClient } from 'next-sanity';
import { projectId, dataset, sanityConfigured } from '../env';

export const client = createClient({
  // createClient validates the format, so use a syntactically-valid
  // placeholder when Sanity is not configured (local dev without env).
  projectId: sanityConfigured ? projectId : 'placeholder',
  dataset,
  apiVersion: '2024-11-01',
  useCdn: true,
});
