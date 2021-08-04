import { Component, Inject, OnInit } from '@angular/core';
import { MatBottomSheet } from '@angular/material/bottom-sheet';
import {
  MatDialog,
  MatDialogRef,
  MAT_DIALOG_DATA,
} from '@angular/material/dialog';
import { PhotoService } from 'src/app/Services/photo-service.service';
import { SiteStateService } from 'src/app/Services/site-state.service';
import { UserService } from 'src/app/Services/user-service.service';
import { Category } from 'src/Modules/Category';
import { Photo } from 'src/Modules/Photo';
import { NewCategoryComponent } from '../new-category/new-category.component';

@Component({
  selector: 'app-categories-selection',
  templateUrl: './categories-selection.component.html',
  styleUrls: ['./categories-selection.component.css'],
})
export class CategoriesSelectionComponent implements OnInit {
  selectedCategories: string[];
  allCategories: Category[];

  constructor(
    private photoService: PhotoService,
    private siteState: SiteStateService,
    private userService: UserService,
    public dialog: MatDialog,
    private _bottomSheet: MatBottomSheet,
    public dialogRef: MatDialogRef<CategoriesSelectionComponent>,
    @Inject(MAT_DIALOG_DATA) public image: Photo
  ) {
    this.selectedCategories = image.categories?.map((i) => i.name) || [];
    this.sortCategories(this.userService.user.categories || []);

    this.siteState.categoriesUpdate.subscribe((categories: Category[]) => {
      this.sortCategories(categories);
    });
  }
  ngOnInit(): void {}
  newCategoryClick = () => this._bottomSheet.open(NewCategoryComponent);
  categoriesSelectionChange = async (categoriesNames: string[]) => {
    await this.photoService
      .setCategories(
        this.image.id,
        categoriesNames.map((c) => new Category(c))
      )
      .then((photo: Photo) => {
        this.selectedCategories = categoriesNames;
        this.image.categories = photo.categories;
        this.sortCategories(photo.categories);
      });
  };
  sortCategories = (categories: Category[]) => {
    this.allCategories = categories.sort((c1, c2) => {
      let c1Includes = this.image.categories?.find((c) => c.name == c1.name)
        ? true
        : false;
      let c2Includes = this.image.categories?.find((c) => c.name == c2.name)
        ? true
        : false;
      return c1Includes === c2Includes ? 0 : c1Includes ? -1 : 1;
    });
  };
}
