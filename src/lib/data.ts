import type { CampaignData, CampaignItem } from './types';
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

      const data = (await response.json()) as CampaignData;

      if (page === 1) {
        totalPages = Math.ceil(data.meta.total_count / data.meta.limit);
        totalCount = data.meta.total_count;
      }

      for (const item of data.items) {
        if (!seenIds.has(item.id)) {
          seenIds.add(item.id);
          allItems.push(item);
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
