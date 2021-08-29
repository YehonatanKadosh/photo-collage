import { HttpClient, HttpParams } from '@angular/common/http';
import { EventEmitter, Injectable } from '@angular/core';
import { Photo } from 'src/Modules/Photo';
import { environment } from 'src/environments/environment';
import { Category } from 'src/Modules/Category';
import { SiteStateService } from './site-state.service';
@Injectable({
  providedIn: 'root',
})
export class PhotoService {
  finishedUploading: EventEmitter<any> = new EventEmitter<any>();

  constructor(private http: HttpClient, private siteState: SiteStateService) {}

  saveNewPhotos = async (photos: Photo[]) => {
    return new Promise(async (res, rej) => {
      this.http
        .post<any>(environment.SERVER_URL + '/Photos/addPhotos', photos)
        .subscribe(
          (next) => {},
          (err) => {},
          () => res(true)
        );
    });
  };
  // For the Gallery
  getPhotosFromServer = async (
    searchQuery?: string,
    searchCategory?: string
  ): Promise<Photo[]> => {
    return new Promise<Photo[]>((resolve) => {
      this.http
        .get<any>(
          environment.SERVER_URL + '/Photos/getPhotos',
          searchQuery || searchCategory
            ? {
                params: new HttpParams()
                  .set(
                    searchQuery ? 'query' : '',
                    searchQuery ? searchQuery : ''
                  )
                  .set(
                    searchCategory ? 'category' : '',
                    searchCategory ? searchCategory : ''
                  )
                  .set('isPrivate', this.siteState.isPrivate),
              }
            : {
                params: new HttpParams().set(
                  'isPrivate',
                  this.siteState.isPrivate
                ),
              }
        )
        .subscribe(
          (data: Photo[]) => {
            resolve(data);
          },
          (err) => {},
          () => {}
        );
    });
  };

  setFavorite = async (imageId: number, favorite: boolean): Promise<Photo> => {
    return new Promise(async (res, rej) => {
      this.http
        .post(environment.SERVER_URL + '/Photos/setFavorite', {
          id: imageId,
          favorite: favorite,
        })
        .subscribe(
          (photo: Photo) => {
            res(photo);
          },
          (err) => {},
          () => {}
        );
    });
  };

  setPrivate = async (imageId: number, isPrivate: boolean): Promise<Photo> => {
    return new Promise(async (res, rej) => {
      this.http
        .post(environment.SERVER_URL + '/Photos/setPrivate', {
          id: imageId,
          isPrivate: isPrivate,
        })
        .subscribe(
          (photo: Photo) => {
            res(photo);
          },
          (err) => {},
          () => {}
        );
    });
  };

  setCategories = async (
    imageId: number,
    categories: Category[]
  ): Promise<Photo> => {
    return new Promise(async (res, rej) => {
      this.http
        .post(environment.SERVER_URL + '/Photos/setCategories', {
          id: imageId,
          categories: categories,
        })
        .subscribe(
          (photo: Photo) => {
            res(photo);
          },
          (err) => {},
          () => {}
        );
    });
  };

  setName = async (imageId: number, name: string): Promise<Photo> => {
    return new Promise(async (res, rej) => {
      this.http
        .post(environment.SERVER_URL + '/Photos/setName', {
          id: imageId,
          name: name,
        })
        .subscribe(
          (photo: Photo) => {
            res(photo);
          },
          (err) => {},
          () => {}
        );
    });
  };

  deletePhoto = async (imageId: number): Promise<boolean> => {
    return new Promise((res) => {
      this.http
        .post(environment.SERVER_URL + '/Photos/removeImage', {
          id: imageId,
        })
        .subscribe(
          (next) => {},
          (err) => {},
          () => {
            res(true);
          } // Deleted
        );
    });
  };

  Deprecated = async (imageId: number): Promise<Photo> => {
    return new Promise((res) => {
      this.http
        .post(environment.SERVER_URL + '/Photos/setDeprecated', {
          id: imageId,
        })
        .subscribe(
          (photo: Photo) => {
            res(photo);
          },
          (err) => {},
          () => {}
        );
    });
  };

  getImagesFromWeb = async (query, amountOfResults = 20): Promise<[]> =>
    new Promise((res, rej) => {
      this.http
        .get(environment.SERVER_URL + '/Photos/photos-from-web', {
          params: new HttpParams()
            .set('query', query)
            .set('amountOfResults', amountOfResults),
        })
        .subscribe(
          (photosFromWeb: []) => {
            res(photosFromWeb);
          },
          (err) => {
            rej(err);
          },
          () => {}
        );
    });
  // upload
  getNewUrl: EventEmitter<string> = new EventEmitter<string>();
  getNewPhoto: EventEmitter<Photo> = new EventEmitter<Photo>();
  getNewFiles: EventEmitter<File[]> = new EventEmitter<File[]>();
}
