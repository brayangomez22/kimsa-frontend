interface SocialsNetworksModel {
  name: string;
  url: string;
}

export class Partner {
  id?: string;
  firstName?: string;
  lastName?: string;
  photo?: string;
  rol?: string;
  description?: string;
  socialsNetworks?: SocialsNetworksModel[];

  constructor() {
    (this.id = ''),
      (this.firstName = ''),
      (this.lastName = ''),
      (this.photo = ''),
      (this.rol = ''),
      (this.description = ''),
      (this.socialsNetworks = []);
  }
}
