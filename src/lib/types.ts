export type CampaignData = {
  items: CampaignItem[];
  meta: Meta;
}

export type CampaignItem = {
  id: string;
  name: string;
  public_id: string;
  theme: string;
  date_created: string;
  date_updated: string;
  versions_count: number;
  organization_created: OrganizationCreated;
  versions: number;
  date_published: string;
  opdrachtgever_naam_organisatie: string;
  opdrachtgever_straat_huisnummer: string;
  opdrachtgever_plaats: string;
  opdrachtgever_kvk_nummer: string;
  opdrachtgever_contactpersoon: string;
  opdrachtgever_mailadres: string;
  opdrachtgever_registratienummer_kiesraad: string;
  gezaghebbende_naam_organisatie: string;
  gezaghebbende_straat_huisnummer: string;
  gezaghebbende_plaats: string;
  gezaghebbende_kvk_nummer: string;
  gezaghebbende_mailadres: string;
  betalende_naam_organisatie: string;
  betalende_straat_huisnummer: string;
  betalende_plaats: string;
  betalende_kvk_nummer: string;
  betalende_contactpersoon: string;
  betalende_mailadres: string;
  campagne_periode_startdatum: string;
  campagne_periode_einddatum: string;
  betaalde_media_waarde_euro: string;
  totale_waarde_campagne_euro: string;
  relevante_links: string;
  gebruikte_targeting_techniek: string;
  oorsprong_ontvangen_bedragen: string;
  akkoord_labels_aanleveren: boolean;
  akkoord_gegevens_juist: boolean;
  akkoord_wijzigingen_doorgeven: boolean;
  akkoord_transparantieverklaring_toestemming: boolean;
  akkoord_identiteit_opdrachtgever: boolean;
  akkoord_politieke_reclamedienst: boolean;
  methode_waardebepaling_voordelen_natura: string;
}

export type OrganizationCreated = {
  id: string;
  name: string;
}

export type Meta = {
  filter_count: number;
  total_count: number;
  page: number;
  limit: number;
}