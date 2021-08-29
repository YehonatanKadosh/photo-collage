import { HttpClient } from '@angular/common/http';
import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { UserService } from 'src/app/Services/user-service.service';
import { environment } from 'src/environments/environment';
import { Category } from 'src/Modules/Category';
import { SiteStateService } from '../../Services/site-state.service';

@Component({
  selector: 'app-categories-control',
  templateUrl: './categories-control.component.html',
  styleUrls: ['./categories-control.component.css'],
})
export class CategoriesControlComponent implements OnInit {
  allCategories: Category[];

  constructor(
    private siteState: SiteStateService,
    public dialogRef: MatDialogRef<CategoriesControlComponent>,
    private userService: UserService,
    private http: HttpClient
  ) {
    this.siteState.categoriesUpdate.subscribe(
      (categories: Category[]) => (this.allCategories = categories)
    );

    this.allCategories = this.userService.user.categories;
  }

  ngOnInit(): void {}

  deleteCategory = async (category: Category) => {
    return new Promise(async (res, rej) => {
      this.http
        .post(environment.SERVER_URL + '/User/remove-category', {
          name: category.name,
        })
        .subscribe(
          (categories: Category[]) => {
            this.siteState.categoriesUpdate.emit(categories);
          },
          (err) => {},
          () => {}
        );
    });
  };
}
