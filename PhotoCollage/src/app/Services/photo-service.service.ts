import { HttpClient, HttpParams } from '@angular/common/http';
import { Attribute, EventEmitter, Injectable, NgZone } from '@angular/core';
import { Photo } from 'src/Modules/Photo';
import { environment } from 'src/environments/environment';
import { Category } from 'src/Modules/Category';
import { SiteStateService } from './site-state.service';

@Injectable({
  providedIn: 'root',
})
export class PhotoService {
  finishedUploading: EventEmitter<any> = new EventEmitter<any>();

  constructor(private http: HttpClient, private siteState: SiteStateService) {
    this.imageDeprecated.subscribe((imageId) => {
      this.http
        .put(environment.Photos_API_URl + '/setDeprecated', {
          id: imageId,
        })
        .subscribe();
    });
  }

  saveNewPhotos = async (photos: Photo[]) => {
    return new Promise(async (res, rej) => {
      await this.http
        .post<any>(environment.Photos_API_URl + '/addPhotos', photos)
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
          environment.Photos_API_URl + '/getPhotos',
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
        .subscribe((data: Photo[]) => {
          resolve(data);
        });
    });
  };

  setFavorite = async (imageId: number, favorite: boolean) => {
    return new Promise(async (res, rej) => {
      await this.http
        .put(environment.Photos_API_URl + '/setFavorite', {
          id: imageId,
          favorite: favorite,
        })
        .subscribe(
          (next) => {},
          (error) => {},
          () => res(true)
        );
    });
  };

  setPrivate = async (imageId: number, isPrivate: boolean) => {
    return new Promise(async (res, rej) => {
      await this.http
        .put(environment.Photos_API_URl + '/setPrivate', {
          id: imageId,
          isPrivate: isPrivate,
        })
        .subscribe(
          (next) => {},
          (error) => {},
          () => res(true)
        );
    });
  };

  setCategory = async (imageId: number, category: Category) => {
    return new Promise(async (res, rej) => {
      await this.http
        .put(environment.Photos_API_URl + '/setCategory', {
          id: imageId,
          category: category,
        })
        .subscribe(
          (next) => {},
          (error) => {},
          () => res(true)
        );
    });
  };

  setCategories = async (imageId: number, categories: Category[]) => {
    return new Promise(async (res, rej) => {
      await this.http
        .put(environment.Photos_API_URl + '/setCategories', {
          id: imageId,
          categories: categories,
        })
        .subscribe(
          (next) => {},
          (error) => {},
          () => res(true)
        );
    });
  };

  setName = async (imageId: number, name: string) => {
    return new Promise(async (res, rej) => {
      await this.http
        .put(environment.Photos_API_URl + '/setName', {
          id: imageId,
          name: name,
        })
        .subscribe(
          (next) => {},
          (error) => {},
          () => res(true)
        );
    });
  };

  deletePhoto = (imageId: number) => {
    this.http
      .post(environment.Photos_API_URl + '/removeImage', {
        id: imageId,
      })
      .subscribe();
  };

  imageDeprecated: EventEmitter<number> = new EventEmitter<number>();
  getNewUrl: EventEmitter<string> = new EventEmitter<string>();
  getNewPhoto: EventEmitter<Photo> = new EventEmitter<Photo>();
  getNewFiles: EventEmitter<File[]> = new EventEmitter<File[]>();
}
