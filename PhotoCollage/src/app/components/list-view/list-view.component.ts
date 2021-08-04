import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Photo } from 'src/Modules/Photo';
import { CategoriesSelectionComponent } from '../categories-selection/categories-selection.component';

@Component({
  selector: 'app-list-view',
  templateUrl: './list-view.component.html',
  styleUrls: ['./list-view.component.css'],
})
export class ListViewComponent implements OnInit {
  @Input() images: any[];
  @Output() popPhotoContainer: EventEmitter<any> = new EventEmitter();
  @Output() deleteImage: EventEmitter<Photo> = new EventEmitter();
  @Output() AddImage: EventEmitter<any> = new EventEmitter();

  constructor(public dialog: MatDialog) {}

  ngOnInit(): void {}

  addCategoryClick = (image: Photo) => {
    this.dialog.open(CategoriesSelectionComponent, {
      maxWidth: '300px',
      maxHeight: '300px',
      data: image,
    });
  };
}
