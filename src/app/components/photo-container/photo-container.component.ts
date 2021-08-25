import { Component, OnInit, Inject } from '@angular/core';
import { FormControl } from '@angular/forms';
import {
  MatDialog,
  MatDialogRef,
  MAT_DIALOG_DATA,
} from '@angular/material/dialog';
import { PhotoService } from 'src/app/Services/photo-service.service';
import { Photo } from 'src/Modules/Photo';
import { CategoriesSelectionComponent } from '../categories-selection/categories-selection.component';
import { MapsComponent } from '../maps/maps.component';

@Component({
  selector: 'app-photo-container',
  templateUrl: './photo-container.component.html',
  styleUrls: ['./photo-container.component.css'],
})
export class PhotoContainerComponent implements OnInit {
  saving: boolean;
  newPhotoName = new FormControl('');

  constructor(
    private photoService: PhotoService,
    public dialog: MatDialog,
    public dialogRef: MatDialogRef<PhotoContainerComponent>,
    @Inject(MAT_DIALOG_DATA) public image: Photo
  ) {}

  ngOnInit(): void {}

  close = () => this.dialogRef.close();

  favoriteChanged = async () => {
    await this.photoService
      .setFavorite(this.image.id, !this.image.favorite)
      .then((photo: Photo) => {
        this.image.favorite = photo.favorite;
        this.setSaving();
      });
  };

  isPrivateChanged = async () => {
    await this.photoService
      .setPrivate(this.image.id, !this.image.isPrivate)
      .then((photo: Photo) => {
        this.image.isPrivate = photo.isPrivate;
        this.setSaving();
      });
  };

  addCategoryClick = () => {
    this.dialog.open(CategoriesSelectionComponent, {
      maxWidth: '300px',
      maxHeight: '300px',
      data: this.image,
    });
  };

  nameChanged = async () => {
    let oldName = this.image.caption;
    if (this.newPhotoName.value) {
      let fileType = /(?:\.([^.]+))?$/.exec(this.image.caption)[1];
      let newName = fileType
        ? this.newPhotoName.value + '.' + fileType
        : this.newPhotoName.value;
      await this.photoService
        .setName(this.image.id, newName)
        .then((photo: Photo) => {
          this.image.caption = photo.caption;
          this.setSaving();
        });
    } else {
      await this.photoService
        .setName(this.image.id, oldName)
        .then((photo: Photo) => {
          this.image.caption = photo.caption;
          this.setSaving();
        });
    }
  };

  openMap = () => {
    this.dialog.open(MapsComponent, {
      maxWidth: 'calc(75% + 48px)',
      maxHeight: 'calc(75% + 48px)',
      width: '100%',
      height: '100%',
      data: { longitude: this.image.longitude, latitude: this.image.latitude },
    });
  };

  setSaving() {
    this.saving = true;
    setTimeout(() => (this.saving = false), 1000);
  }
}
