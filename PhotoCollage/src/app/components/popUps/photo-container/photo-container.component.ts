import {
  Component,
  Input,
  OnInit,
  Output,
  EventEmitter,
  Inject,
} from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import {
  MatDialog,
  MatDialogRef,
  MAT_DIALOG_DATA,
} from '@angular/material/dialog';
import { PhotoService } from 'src/app/Services/photo-service.service';
import { UserService } from 'src/app/Services/user-service.service';
import { Category } from 'src/Modules/Category';
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
  oldName: string;

  constructor(
    private photoService: PhotoService,
    public dialog: MatDialog,
    public dialogRef: MatDialogRef<PhotoContainerComponent>,
    @Inject(MAT_DIALOG_DATA) public image: Photo
  ) {}

  ngOnInit(): void {}

  close = () => this.dialogRef.close();

  favoriteChanged = async () => {
    this.image.favorite = !this.image.favorite;
    await this.photoService
      .setFavorite(this.image.id, this.image.favorite)
      .then(() => this.setSaving());
  };

  isPrivateChanged = async () => {
    this.image.isPrivate = !this.image.isPrivate;
    await this.photoService
      .setPrivate(this.image.id, this.image.isPrivate)
      .then(() => this.setSaving());
  };

  addCategoryClick = () => {
    this.dialog.open(CategoriesSelectionComponent, {
      maxWidth: '300px',
      maxHeight: '300px',
      data: this.image,
    });
  };

  nameChanged = async () => {
    if (this.newPhotoName.value) {
      this.oldName = this.image.caption;
      let fileType = /(?:\.([^.]+))?$/.exec(this.image.caption)[1];
      let newName = fileType
        ? this.newPhotoName.value + '.' + fileType
        : this.newPhotoName.value;
      await this.photoService
        .setName(this.image.id, newName)
        .then(() => this.setSaving());
      this.image.caption = newName;
    } else {
      this.image.caption = this.oldName;
      await this.photoService
        .setName(this.image.id, this.oldName)
        .then(() => this.setSaving());
    }
  };

  openMap = () => {
    this.dialog.open(MapsComponent, {
      maxWidth: 'calc(75vh + 48px)',
      maxHeight: 'calc(75vh + 48px)',
      data: { longitude: this.image.longitude, latitude: this.image.latitude },
    });
  };

  setSaving() {
    this.saving = true;
    setTimeout(() => (this.saving = false), 1000);
  }
}
