import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Attribute, EventEmitter, Injectable, NgZone } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { Photo } from 'src/Modules/Photo';
import { environment } from 'src/environments/environment';
import { Category } from 'src/Modules/Category';

@Injectable({
  providedIn: 'root',
})
export class PhotoService {
  private photos: Photo[] = [];

  constructor(private sanitizer: DomSanitizer, private http: HttpClient) {
    this.getNewPhoto.subscribe(async (photo: Photo) => {
      if (!(await this.PhotoExists(photo.url))) this.photos.push(photo);
    });
    this.getNewUrl.subscribe(async (url: string) => {
      if (!(await this.PhotoExists(url))) {
        navigator.geolocation.getCurrentPosition((position) => {
          this.photos.push(
            new Photo(url, position.coords.latitude, position.coords.longitude)
          );
        });
      }
    });
    this.getNewFiles.subscribe((Files: File[]) => {
      Array.from(Files).forEach(
        async (file) =>
          await this.getBase64(file).then(async (base64String) => {
            if (!(await this.PhotoExists(base64String))) {
              navigator.geolocation.getCurrentPosition((position) => {
                this.photos.push(
                  new Photo(
                    base64String,
                    position.coords.latitude,
                    position.coords.longitude,
                    file.type,
                    file.name
                  )
                );
              });
            }
          })
      );
    });
    this.imageDeprecated.subscribe((imageId) => {
      this.http
        .put(environment.Photos_API_URl + '/setDeprecated', {
          id: imageId,
        })
        .subscribe();
    });
  }

  PhotoExists = async (photoUrl: string): Promise<boolean> => {
    return new Promise((res, rej) => {
      if (this.photos.find((photo) => photo.url == photoUrl)) res(true);
      else res(false);
    });
  };

  saveNewPhotos = async () => {
    return new Promise(async (res, rej) => {
      await this.http
        .post<any>(environment.Photos_API_URl + '/addPhotos', this.photos)
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
                  ),
              }
            : {}
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

  getBase64(file: File): Promise<string> {
    return new Promise((res, rej) => {
      let reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = function () {
        res(reader.result.toString());
      };
      reader.onerror = function (error) {
        rej('');
      };
    });
  }
  getAllPhotos = (): Photo[] => this.photos;
  imageDeprecated: EventEmitter<number> = new EventEmitter<number>();
  getNewUrl: EventEmitter<string> = new EventEmitter<string>();
  getNewPhoto: EventEmitter<Photo> = new EventEmitter<Photo>();
  getNewFiles: EventEmitter<File[]> = new EventEmitter<File[]>();
}
