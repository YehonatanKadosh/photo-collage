import { Component, Input, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { PhotoService } from 'src/app/Services/photo-service.service';
import { Photo } from 'src/Modules/Photo';
import { PhotoContainerComponent } from '../popUps/photo-container/photo-container.component';

@Component({
  selector: 'app-grid-view',
  templateUrl: './grid-view.component.html',
  styleUrls: ['./grid-view.component.css'],
})
export class GridViewComponent implements OnInit {
  @Input()
  images: Photo[];

  constructor(private photoService: PhotoService, public dialog: MatDialog) {
    this.photoService.imageDeprecated.subscribe((id: number) => {
      this.images.find((i) => i.id == id).linkDeprecated = true;
    });
  }

  ngOnInit(): void {}

  popPhotoContainer(image: Photo) {
    this.dialog.open(PhotoContainerComponent, {
      maxWidth: '300px',
      maxHeight: '500px',
      data: image,
    });
  }

  deleteImage = (image: Photo) => {
    this.photoService.deletePhoto(image.id);
    let imageLocation = this.images.indexOf(image);
    this.images.splice(imageLocation, 1);
  };
}
