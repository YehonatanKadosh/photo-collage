import { Component, OnInit } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { MatBottomSheetRef } from '@angular/material/bottom-sheet';
import { UserService } from 'src/app/Services/user-service.service';
import { Category } from 'src/Modules/Category';

@Component({
  selector: 'app-new-category',
  templateUrl: './new-category.component.html',
  styleUrls: ['./new-category.component.css'],
})
export class NewCategoryComponent implements OnInit {
  newCategoryName = new FormControl('', [Validators.required]);

  constructor(
    private _bottomSheetRef: MatBottomSheetRef<NewCategoryComponent>,
    private userService: UserService
  ) {}
  ngOnInit(): void {}

  setNewCategory = async () => {
    if (this.newCategoryName.valid) {
      let newCategory = new Category(this.newCategoryName.value);
      await this.userService.setNewCategory(newCategory);
      this._bottomSheetRef.dismiss();
    }
  };
}
