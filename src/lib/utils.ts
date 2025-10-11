import type { CampaignItem } from './types';

export type ValueType = 'betaald' | 'totaal';

export const getValue = (item: CampaignItem, valueType: ValueType) => {
  return valueType === 'totaal'
    ? parseInt(item.totale_waarde_campagne_euro)
    : parseInt(item.betaalde_media_waarde_euro);
};

export const getDuration = (item: CampaignItem) => {
  const start = new Date(item.campagne_periode_startdatum).getTime();
  const end = new Date(item.campagne_periode_einddatum).getTime();
  return end - start;
};

export const currencyFormatter = new Intl.NumberFormat('nl-NL', {
  style: 'currency',
  currency: 'EUR',
  maximumFractionDigits: 0,
});

export const dateFormatter = new Intl.DateTimeFormat('nl-NL', {
  year: 'numeric',
  month: 'short',
  day: 'numeric',
});

export const lastUpdateFormatter = new Intl.DateTimeFormat('nl-NL', {
  year: 'numeric',
  month: 'long',
  day: 'numeric',
  hour: '2-digit',
  minute: '2-digit',
});
