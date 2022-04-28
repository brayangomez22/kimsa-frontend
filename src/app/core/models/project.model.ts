export interface Project {
  id?: string;
  titleSpanish?: string;
  titleEnglish?: string;
  descriptionSpanish?: string;
  descriptionEnglish?: string;
  entitySpanish?: string;
  entityEnglish?: string;
  image?: string;
  hasInfo?: boolean;
  additionalInformation: string;
  isActive: boolean;
  createdAt: Date;
}
