export const dataset = process.env.NEXT_PUBLIC_SANITY_DATASET ?? "production";

export const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID ?? "";

/** Sanity is only usable when a project id is configured. */
export const sanityConfigured = projectId.length > 0;
