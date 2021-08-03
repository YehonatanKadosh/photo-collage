import { Component, Inject, OnInit } from '@angular/core';
import { MatBottomSheet } from '@angular/material/bottom-sheet';
import {
  MatDialog,
  MatDialogRef,
  MAT_DIALOG_DATA,
} from '@angular/material/dialog';
import { PhotoService } from 'src/app/Services/photo-service.service';
import { SiteStateService } from 'src/app/Services/site-state.service';
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
    public dialog: MatDialog,
    private _bottomSheet: MatBottomSheet,
    public dialogRef: MatDialogRef<CategoriesSelectionComponent>,
    @Inject(MAT_DIALOG_DATA) public image: Photo
  ) {
    this.selectedCategories = image.categories?.map((i) => i.name) || [];
    this.sortCategories(this.siteState.user.categories || []);

    this.siteState.userUpdated.subscribe((user) => {
      this.sortCategories(user.categories);
    });
  }
  ngOnInit(): void {}
  newCategoryClick = () => this._bottomSheet.open(NewCategoryComponent);
  categoriesSelectionChange = async (categoriesNames: string[]) => {
    //save the categories
    this.image.categories = categoriesNames.map((c) => new Category(c));
    await this.photoService.setCategories(this.image.id, this.image.categories);
    this.selectedCategories = categoriesNames;
    this.sortCategories(this.allCategories);
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
