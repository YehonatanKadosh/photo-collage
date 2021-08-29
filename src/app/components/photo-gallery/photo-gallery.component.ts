import { Component, OnInit } from '@angular/core';
import { MatBottomSheet } from '@angular/material/bottom-sheet';
import { MatDialog } from '@angular/material/dialog';
import { NewCategoryComponent } from 'src/app/components/new-category/new-category.component';
import { PhotoService } from 'src/app/Services/photo-service.service';
import { SiteStateService } from 'src/app/Services/site-state.service';
import { UserService } from 'src/app/Services/user-service.service';
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
  template: string;

  constructor(
    private photoService: PhotoService,
    public dialog: MatDialog,
    private _bottomSheet: MatBottomSheet,
    private siteState: SiteStateService,
    private userService: UserService
  ) {
    this.getImages();
    this.categories = this.userService.user.categories || []; // ? only in development
    this.template = this.userService.user.template;

    this.siteState.categoriesUpdate.subscribe((categories: Category[]) => {
      this.categories = categories;
    });
    this.siteState.privacyAuthenticated.subscribe((auth) => {
      this.getImages();
    });
    this.siteState.newTemplate.subscribe((templateEvent) => {
      this.template = templateEvent.template;
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

  deleteImage = async (image: Photo) => {
    await this.photoService.deletePhoto(image.id).then((done) => {
      let imageLocation = this.images.indexOf(image);
      this.images.splice(imageLocation, 1);
    });
  };
}
