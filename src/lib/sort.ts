import type { CampaignItem } from './types';
import { getValue } from './utils';

export type SortOption = 
  | 'grootste-waarde' 
  | 'kleinste-waarde' 
  | 'laatst-gepubliceerd' 
  | 'vroegst-gepubliceerd'
  | 'laatst-gestart'
  | 'vroegst-gestart';

export function sortCampaigns(
  items: CampaignItem[],
  sortBy: SortOption,
  valueType: 'betaald' | 'totaal'
): CampaignItem[] {
  const sorted = [...items];

  switch (sortBy) {
    case 'grootste-waarde':
      sorted.sort((a, b) => getValue(b, valueType) - getValue(a, valueType));
      break;
    case 'kleinste-waarde':
      sorted.sort((a, b) => getValue(a, valueType) - getValue(b, valueType));
      break;
    case 'laatst-gepubliceerd':
      sorted.sort(
        (a, b) =>
          new Date(b.date_published).getTime() -
          new Date(a.date_published).getTime()
      );
      break;
    case 'vroegst-gepubliceerd':
      sorted.sort(
        (a, b) =>
          new Date(a.date_published).getTime() -
          new Date(b.date_published).getTime()
      );
      break;
    case 'laatst-gestart':
      sorted.sort(
        (a, b) =>
          new Date(b.campagne_periode_startdatum).getTime() -
          new Date(a.campagne_periode_startdatum).getTime()
      );
      break;
    case 'vroegst-gestart':
      sorted.sort(
        (a, b) =>
          new Date(a.campagne_periode_startdatum).getTime() -
          new Date(b.campagne_periode_startdatum).getTime()
      );
      break;
  }

  return sorted;
}
