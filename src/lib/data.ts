import {
  CampaignItemSchema,
  LenientCampaignDataSchema,
  type CampaignItem,
} from './types';
import { LRUCache } from 'lru-cache';

const API_URL = 'https://politiekereclame.nl/api/public/statements/';

const CACHE_KEY = 'campaign-data';

const cache = new LRUCache<string, CampaignDataResult>({
  max: 1,
  ttl: 5 * 60 * 1000,
});

export async function getCampaignData(): Promise<CampaignDataResult> {
  const cached = cache.get(CACHE_KEY);

  if (cached) {
    console.log('Returning cached data');
    return cached;
  }

  console.log('Fetching fresh data from API');

  const allItems: CampaignItem[] = [];
  const seenIds = new Set<string>();
  let page = 1;
  let totalPages = 1;
  let totalCount = 0;

  while (page <= totalPages) {
    if (page > 1) {
      // courtesy delay for API
      await new Promise((resolve) => setTimeout(resolve, 100));
    }

    try {
      const response = await fetch(`${API_URL}?page=${page}&limit=100`);

      if (!response.ok) {
        console.warn(`Failed to fetch page ${page}: ${response.status}`);
        break;
      }

      const rawData = await response.json();

      const result = LenientCampaignDataSchema.safeParse(rawData);

      if (!result.success) {
        console.warn(`Invalid data structure on page ${page}:`, result.error);
        break;
      }

      if (page === 1) {
        const meta = result.data.meta;
        totalPages = Math.ceil(meta.total_count / meta.limit);
        totalCount = meta.total_count;
      }

      for (const rawItem of result.data.items) {
        const result = CampaignItemSchema.safeParse(rawItem);

        if (!result.success) {
          console.warn(
            `Filtered out invalid item on page ${page}:`,
            (rawItem as any)?.id || 'unknown',
            result.error
          );
          continue;
        }

        if (!seenIds.has(result.data.id)) {
          seenIds.add(result.data.id);
          allItems.push(result.data);
        }
      }

      page++;
    } catch (error) {
      console.error(`Error fetching page ${page}:`, error);
      break;
    }
  }

  const result = {
    items: allItems,
    meta: { filter_count: allItems.length, total_count: totalCount },
  };

  cache.set(CACHE_KEY, result);

  return result;
}

type CampaignDataResult = {
  items: CampaignItem[];
  meta: { filter_count: number; total_count: number };
};
