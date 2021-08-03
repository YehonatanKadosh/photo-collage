import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Photo } from 'src/Modules/Photo';

@Component({
  selector: 'app-grid-view',
  templateUrl: './grid-view.component.html',
  styleUrls: ['./grid-view.component.css'],
})
export class GridViewComponent implements OnInit {
  @Input() images: any[];
  @Output() popPhotoContainer: EventEmitter<Photo> = new EventEmitter();
  @Output() deleteImage: EventEmitter<Photo> = new EventEmitter();
  @Output() AddImage: EventEmitter<any> = new EventEmitter();

  constructor() {
    console.log(this.popPhotoContainer);
  }

  ngOnInit(): void {}
}
