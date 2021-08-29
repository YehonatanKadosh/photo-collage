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
  Files: File[] = [];

  constructor(private photoService: PhotoService, private router: Router) {
    this.photoService.getNewPhoto.subscribe(async (file: File) => {
      await this.addNewFile(file);
    });

    this.photoService.getNewUrl.subscribe(async (url: string) => {
      if (!(await this.PhotoExists(url, null))) {
        navigator.geolocation.getCurrentPosition((position) => {
          this.Photos.push(
            new Photo({
              latitude: position.coords.latitude,
              longitude: position.coords.longitude,
              url,
            })
          );
        });
      }
    });

    this.photoService.getNewFiles.subscribe((Files: File[]) => {
      Array.from(Files).forEach(async (file) => await this.addNewFile(file));
    });

    this.photoService.finishedUploading.subscribe(async () => {
      if (this.Photos.length == 0) this.router.navigateByUrl('/PhotoGallery');
      else {
        await this.photoService
          .saveNewPhotos(this.Photos, this.Files)
          .then(() => this.router.navigateByUrl('/PhotoGallery'));
        this.Files = [];
        this.Photos = [];
      }
    });
  }

  ngOnInit(): void {}

  setIsPrivae = ($event, image: Photo) => (image.isPrivate = $event as boolean);

  PhotoExists = (url?: string, file?: File): Promise<boolean> => {
    return new Promise((res, rej) => {
      if (file) {
        res(
          this.Files.includes(
            this.Files.find((Ffile) => Ffile.name === file.name)
          )
        );
      } else if (url)
        res(
          this.Photos.includes(this.Photos.find((photo) => photo.url === url))
        );
      else res(false);
    });
  };

  addNewFile = async (file: File) => {
    if (!(await this.PhotoExists(null, file))) {
      navigator.geolocation.getCurrentPosition((position) => {
        this.Photos.push(
          new Photo({
            latitude: position.coords.latitude,
            longitude: position.coords.longitude,
            fileType: file.type,
            fileName: file.name,
          })
        );
        this.Files.push(file);
      });
    }
  };

  Remove = (image: Photo) => {
    let index: number = this.Photos.indexOf(image, 0);
    this.Photos.splice(index, 1);
  };
}
