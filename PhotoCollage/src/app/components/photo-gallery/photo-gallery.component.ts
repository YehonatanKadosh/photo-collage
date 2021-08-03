import { Component, OnInit } from '@angular/core';
import { MatBottomSheet } from '@angular/material/bottom-sheet';
import { MatDialog } from '@angular/material/dialog';
import { NewCategoryComponent } from 'src/app/components/new-category/new-category.component';
import { PhotoService } from 'src/app/Services/photo-service.service';
import { SiteStateService } from 'src/app/Services/site-state.service';
import { Category } from 'src/Modules/Category';
import { Photo } from 'src/Modules/Photo';
import { PhotoContainerComponent } from '../photo-container/photo-container.component';

@Component({
  selector: 'app-photo-gallery',
  templateUrl: './photo-gallery.component.html',
  styleUrls: ['./photo-gallery.component.css'],
})
export class PhotoGalleryComponent implements OnInit {
  images: Photo[];
  searching: boolean;
  searchQuery: string;
  CategorySelection: string;
  categories: Category[];

  constructor(
    private photoService: PhotoService,
    public dialog: MatDialog,
    private _bottomSheet: MatBottomSheet,
    private siteState: SiteStateService
  ) {
    this.getImages();
    this.categories = this.siteState.user?.categories || []; // ? only in development

    this.siteState.userUpdated.subscribe((user) => {
      this.categories = user.categories;
    });
    this.siteState.privacyAuthenticated.subscribe((auth) => {
      this.getImages();
    });
    this.photoService.imageDeprecated.subscribe((id: number) => {
      this.images.find((i) => i.id == id).linkDeprecated = true;
    });
  }
  ngOnInit(): void {}

  getImages = async () => {
    this.searching = true;
    this.images = await this.photoService.getPhotosFromServer(
      this.searchQuery,
      this.CategorySelection
    );
    this.searching = false;
  };

  newCategoryClick = () => this._bottomSheet.open(NewCategoryComponent);

  popPhotoContainer = (image: Photo) => {
    this.dialog.open(PhotoContainerComponent, {
      maxWidth: '300px',
      maxHeight: '500px',
      data: image,
    });
  };

  deleteImage = (image: Photo) => {
    this.photoService.deletePhoto(image.id);
    let imageLocation = this.images.indexOf(image);
    this.images.splice(imageLocation, 1);
  };
}
