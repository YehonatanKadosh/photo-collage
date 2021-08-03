import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Photo } from 'src/Modules/Photo';

import { PhotoService } from '../../../../Services/photo-service.service';

@Component({
  selector: 'app-photos-bar',
  templateUrl: './photos-bar.component.html',
  styleUrls: ['./photos-bar.component.css'],
})
export class PhotosBarComponent implements OnInit {
  Photos: Photo[] = [];

  constructor(private photoService: PhotoService, private router: Router) {
    this.photoService.getNewPhoto.subscribe(async (photo: Photo) => {
      if (!(await this.PhotoExists(photo.url))) this.Photos.push(photo);
    });
    this.photoService.getNewUrl.subscribe(async (url: string) => {
      if (!(await this.PhotoExists(url))) {
        navigator.geolocation.getCurrentPosition((position) => {
          this.Photos.push(
            new Photo(url, position.coords.latitude, position.coords.longitude)
          );
        });
      }
    });
    this.photoService.getNewFiles.subscribe((Files: File[]) => {
      Array.from(Files).forEach(
        async (file) =>
          await this.getBase64(file).then(async (base64String) => {
            if (!(await this.PhotoExists(base64String))) {
              navigator.geolocation.getCurrentPosition((position) => {
                this.Photos.push(
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
    this.photoService.finishedUploading.subscribe(async () => {
      if (this.Photos.length == 0) this.router.navigateByUrl('/PhotoGallery');
      else {
        await this.photoService
          .saveNewPhotos(this.Photos)
          .then(() => this.router.navigateByUrl('/PhotoGallery'));
      }
    });
  }

  ngOnInit(): void {}

  setIsPrivae = ($event, image: Photo) => (image.isPrivate = $event as boolean);

  PhotoExists = async (photoUrl: string): Promise<boolean> => {
    return new Promise((res, rej) => {
      if (this.Photos.find((photo) => photo.url == photoUrl)) res(true);
      else res(false);
    });
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

  Remove = (image: Photo) => {
    let index: number = this.Photos.indexOf(image, 0);
    this.Photos.splice(index, 1);
  };
}
