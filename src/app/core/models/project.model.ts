export class Project {
  id?: string;
  title?: string;
  image?: string;
  description?: string;

  constructor() {
    (this.id = ''),
      (this.title = ''),
      (this.image = ''),
      (this.description = '');
  }
}
