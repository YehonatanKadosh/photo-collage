import { Component, OnInit } from '@angular/core';
import { Photo } from 'src/Modules/Photo';

import { PhotoService } from '../../../../Services/photo-service.service';

@Component({
  selector: 'app-photos-bar',
  templateUrl: './photos-bar.component.html',
  styleUrls: ['./photos-bar.component.css'],
})
export class PhotosBarComponent implements OnInit {
  Photos: Photo[] = [];

  constructor(private photoService: PhotoService) {}

  ngOnInit(): void {
    this.Photos = this.photoService.getAllPhotos();
  }

  setIsPrivae = ($event, image: Photo) => (image.isPrivate = $event as boolean);

  Remove = (image: Photo) => {
    let index: number = this.Photos.indexOf(image, 0);
    this.Photos.splice(index, 1);
  };
}
