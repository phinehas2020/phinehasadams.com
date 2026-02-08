import { groq } from 'next-sanity';

export const WEBSITES_QUERY = groq`*[_type == "website"] | order(_createdAt desc)`;

export const WEBSITE_BY_ID_QUERY = groq`*[_type == "website" && _id == $id][0]`;

export interface SanityWebsite {
  _id: string;
  _createdAt: string;
  title: string;
  url: string;
  description?: string;
  previewImage?: {
    asset: {
      _ref: string;
      _type: string;
    };
  };
  sold?: boolean;
  purchasePrice?: number;
  monthlyPrice?: number;
  stripeLink?: string;
}
