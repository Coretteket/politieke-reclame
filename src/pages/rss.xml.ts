import rss from '@astrojs/rss';
import type { APIContext } from 'astro';
import { getCampaignData } from '../lib/data';
import { sortCampaigns } from '../lib/sort';
import { currencyFormatter, dateFormatter, getValue } from '../lib/utils';

export async function GET(context: APIContext) {
  const data = await getCampaignData();
  const sortedData = sortCampaigns(data.items, 'laatst-gepubliceerd');

  return rss({
    title: 'Politieke Reclame Tracker',
    description:
      'Bekijk hoeveel geld er wordt uitgegeven aan politieke reclames in Nederland.',
    site: context.site!,
    stylesheet: '/rss-style.xsl',
    items: sortedData.map((item) => ({
      title: `${
        item.opdrachtgever_naam_organisatie
      } — ${currencyFormatter.format(getValue(item, 'totaal'))}`,
      description: `Nieuwe transparantieverklaring: ${
        item.opdrachtgever_naam_organisatie
      } geeft ${currencyFormatter.format(
        getValue(item, 'totaal')
      )} uit aan een politieke reclamecampagne met de titel "${
        item.name
      }" gedurende ${dateFormatter.formatRange(
        new Date(item.campagne_periode_startdatum),
        new Date(item.campagne_periode_einddatum)
      )}.`,
      pubDate: new Date(item.date_published),
      link: `https://politiekereclame.nl/transparantie-verklaringen/${item.public_id}`,
    })),
  });
}
