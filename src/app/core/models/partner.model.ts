interface SocialsNetworksModel {
  name: string;
  url: string;
}

export interface Partner {
  id?: string;
  firstName?: string;
  lastName?: string;
  rolSpanish?: string;
  rolEnglish?: string;
  descriptionSpanish?: string;
  descriptionEnglish?: string;
  socialsNetworks?: SocialsNetworksModel[];
  photo?: string;
}
