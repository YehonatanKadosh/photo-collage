import { Category } from './Category';

export class Photo {
  id: number;
  caption: string;
  latitude: number;
  longitude: number;
  favorite: boolean;
  categories: Category[];
  isPrivate: boolean;
  url: string;
  lastModified: Date;
  fileType: string;
  linkDeprecated: boolean;

  constructor(starters: {
    latitude: number;
    longitude: number;
    url?: string;
    fileType?: string;
    fileName?: string;
  }) {
    this.url = starters.url;
    this.lastModified = new Date();
    this.longitude = starters.longitude;
    this.latitude = starters.latitude;
    this.isPrivate = false;
    this.caption = starters.fileName;
    this.id = this.lastModified.getTime();
  }
}
