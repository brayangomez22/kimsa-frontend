export class Project {
  id?: string;
  title?: string;
  image?: string;
  entity?: string;
  hasInfo?: string;
  description?: string;

  constructor() {
    (this.id = ''),
      (this.title = ''),
      (this.image = ''),
      (this.entity = ''),
      (this.hasInfo = ''),
      (this.description = '');
  }
}
