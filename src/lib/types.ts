import { z } from 'zod';

export const CampaignItemSchema = z.object({
  id: z.string(),
  public_id: z.string(),
  date_published: z.string(),
  name: z.string(),
  opdrachtgever_naam_organisatie: z.string(),
  campagne_periode_startdatum: z.string(),
  campagne_periode_einddatum: z.string(),
  betaalde_media_waarde_euro: z.string(),
  totale_waarde_campagne_euro: z.string(),
});

export const MetaSchema = z.object({
  total_count: z.number(),
  limit: z.number(),
});

export const LenientCampaignDataSchema = z.object({
  items: z.array(z.unknown()), // Will validate items individually
  meta: MetaSchema,
});

export type CampaignItem = z.infer<typeof CampaignItemSchema>;
export type Meta = z.infer<typeof MetaSchema>;
