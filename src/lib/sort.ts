import type { CampaignItem } from './types';
import { getValue, getDuration } from './utils';

export type SortOption =
  | 'grootste'
  | 'kleinste'
  | 'nieuwste'
  | 'oudste'
  | 'langste'
  | 'kortste';

export function sortCampaigns(
  items: CampaignItem[],
  sortBy: SortOption,
  valueType: 'betaald' | 'totaal'
): CampaignItem[] {
  const sorted = [...items];

  switch (sortBy) {
    case 'grootste':
      sorted.sort((a, b) => getValue(b, valueType) - getValue(a, valueType));
      break;
    case 'kleinste':
      sorted.sort((a, b) => getValue(a, valueType) - getValue(b, valueType));
      break;
    case 'nieuwste':
      sorted.sort(
        (a, b) =>
          new Date(b.campagne_periode_startdatum).getTime() -
          new Date(a.campagne_periode_startdatum).getTime()
      );
      break;
    case 'oudste':
      sorted.sort(
        (a, b) =>
          new Date(a.campagne_periode_startdatum).getTime() -
          new Date(b.campagne_periode_startdatum).getTime()
      );
      break;
    case 'langste':
      sorted.sort((a, b) => getDuration(b) - getDuration(a));
      break;
    case 'kortste':
      sorted.sort((a, b) => getDuration(a) - getDuration(b));
      break;
  }

  return sorted;
}
