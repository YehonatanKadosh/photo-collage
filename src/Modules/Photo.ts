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
  isBase64: boolean;
  lastModified: Date;
  fileType: string;
  hasName: boolean;
  linkDeprecated: boolean;

  constructor(
    url: string,
    latitude: number,
    longitude: number,
    fileType?: string,
    fileName?: string
  ) {
    this.url = url;
    this.lastModified = new Date();
    this.longitude = longitude;
    this.latitude = latitude;
    this.isPrivate = false;
    this.isBase64 = !url.startsWith('https') ? true : false;
    this.caption = fileName ? fileName : 'Photo_' + this.lastModified.getTime();
    this.hasName = fileName ? true : false;
    if (fileType) {
      if (fileName) {
        let type = /(?:\.([^.]+))?$/.exec(fileName)[0].replace('.', 'image/');
        this.fileType = type ? type : fileType;
      } else {
        this.fileType = fileType;
        this.caption = this.caption + fileType.replace('image/', '.');
      }
    }
    this.id = this.lastModified.getTime();
  }
}
