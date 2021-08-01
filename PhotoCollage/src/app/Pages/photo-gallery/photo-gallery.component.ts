import { Component, OnInit } from '@angular/core';
import { MatBottomSheet } from '@angular/material/bottom-sheet';
import { MatDialog } from '@angular/material/dialog';
import { NewCategoryComponent } from 'src/app/components/popUps/new-category/new-category.component';
import { PhotoService } from 'src/app/Services/photo-service.service';
import { UserService } from 'src/app/Services/user-service.service';
import { Category } from 'src/Modules/Category';
import { Photo } from 'src/Modules/Photo';

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

  constructor(
    private photoService: PhotoService,
    private userService: UserService,
    public dialog: MatDialog,
    private _bottomSheet: MatBottomSheet
  ) {
    this.getImages();
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
  getAllCategories = (): Category[] => this.userService.user?.categories;
  newCategoryClick = () => this._bottomSheet.open(NewCategoryComponent);
}
