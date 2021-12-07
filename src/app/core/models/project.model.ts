export class Project {
  id?: string;
  titleSpanish?: string;
  titleEnglish?: string;
  entitySpanish?: string;
  entityEnglish?: string;
  descriptionSpanish?: string;
  descriptionEnglish?: string;
  hasInfo?: string;
  image?: string;

  constructor() {
    (this.id = ''),
      (this.titleSpanish = ''),
      (this.titleEnglish = ''),
      (this.entitySpanish = ''),
      (this.entityEnglish = ''),
      (this.descriptionSpanish = ''),
      (this.descriptionEnglish = ''),
      (this.hasInfo = ''),
      (this.image = '');
  }
}
