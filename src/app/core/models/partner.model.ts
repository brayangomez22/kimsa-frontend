interface SocialsNetworksModel {
  name: string;
  url: string;
}

export class Partner {
  id?: string;
  firstName?: string;
  lastName?: string;
  rolSpanish?: string;
  rolEnglish?: string;
  descriptionSpanish?: string;
  descriptionEnglish?: string;
  socialsNetworks?: SocialsNetworksModel[];
  photo?: string;

  constructor() {
    (this.id = ''),
      (this.firstName = ''),
      (this.lastName = ''),
      (this.rolSpanish = ''),
      (this.rolEnglish = ''),
      (this.descriptionSpanish = ''),
      (this.descriptionEnglish = ''),
      (this.socialsNetworks = []),
      (this.photo = '');
  }
}
