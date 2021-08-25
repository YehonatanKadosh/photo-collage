import {
  AfterViewInit,
  Component,
  EventEmitter,
  HostListener,
  Input,
  Output,
  ViewChild,
} from '@angular/core';
import { MatGridList } from '@angular/material/grid-list';
import { Photo } from 'src/Modules/Photo';

@Component({
  selector: 'app-grid-view',
  templateUrl: './grid-view.component.html',
  styleUrls: ['./grid-view.component.css'],
})
export class GridViewComponent implements AfterViewInit {
  @Input() images: any[];
  @Output() popPhotoContainer: EventEmitter<any> = new EventEmitter();
  @Output() deleteImage: EventEmitter<Photo> = new EventEmitter();
  @Output() AddImage: EventEmitter<any> = new EventEmitter();

  @ViewChild(MatGridList, { static: false }) Grid;
  cols: number = 1;

  constructor() {}

  ngAfterViewInit() {
    this.cols =
      Math.floor(this.Grid._element.nativeElement.offsetWidth / 152) || 1;
    this.Grid.cols =
      this.cols > this.images.length ? this.images.length : this.cols;
  }

  @HostListener('window:resize', ['$event'])
  onResize(event) {
    this.ngAfterViewInit();
  }
}
